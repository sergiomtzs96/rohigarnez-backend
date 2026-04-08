const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
}, { _id: false });

const userSchema = new mongoose.Schema({
  admin: { type: adminSchema, required: true }
}, { timestamps: true }); // opcional

module.exports = mongoose.model('User', userSchema);