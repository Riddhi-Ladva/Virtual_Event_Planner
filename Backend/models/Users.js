// models/Users.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: String,
  //role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

module.exports = mongoose.model('Users', UserSchema);
