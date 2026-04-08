const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.log(err));

async function encryptPassword() {
  try {
    const user = await User.findOne({});
    if (!user || !user.admin) {
      console.log('Usuario no encontrado');
      return;
    }

    user.admin.password = await bcrypt.hash('admin123', 10);
    await user.save();
    console.log('✅ Contraseña encriptada');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
}

encryptPassword();