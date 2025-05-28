const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: String,
  state: String,
  country: String,
  image: String
});

module.exports = mongoose.model('City', citySchema);
