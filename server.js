const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/miBaseDeDatos')
  .then(() => {
    console.log('✅ MongoDB conectado');

    // Iniciar servidor solo después de conectar a DB
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch(err => console.error('Error MongoDB:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});