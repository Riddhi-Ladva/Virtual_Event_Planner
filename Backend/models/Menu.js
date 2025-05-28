const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name: String,
  description: String, // optional
  image: String,       // optional
  pricePerPerson: Number,
  
  category: String     // new field
});

module.exports = mongoose.model('Menu', MenuSchema);
