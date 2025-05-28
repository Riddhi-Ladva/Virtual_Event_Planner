// models/OtherService.js
const mongoose = require('mongoose');

const OtherServiceSchema = new mongoose.Schema({
  serviceName: String,
  description: String,
  price: Number,
  image: String
});

module.exports = mongoose.model('OtherService', OtherServiceSchema);
