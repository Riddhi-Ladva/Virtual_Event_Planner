// models/Decoration.js
const mongoose = require('mongoose');

const DecorationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  price: Number,
  image:String,
  description: String
});

module.exports = mongoose.model('Decoration', DecorationSchema);
