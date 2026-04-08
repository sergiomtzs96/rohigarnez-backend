const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({}).lean();
    if (!user || !user.admin) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    if (user.admin.email !== email) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const valid = await bcrypt.compare(password, user.admin.password);
    if (!valid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    //Añadimos el rol de "admin"
    const role = 'admin';

    // Generar token JWT (caduca en 1h)
    const token = jwt.sign(
      { email: user.admin.email, role: 'admin' },
      process.env.JWT_SECRET || 'miClaveSecreta',
      { expiresIn: '1h' }
    );

    res.json({ email: user.admin.email, token, role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;