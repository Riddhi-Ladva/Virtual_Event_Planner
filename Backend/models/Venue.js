// models/Venue.js
const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  capacity: Number,
  img: String,
  price: Number
});

module.exports = mongoose.model('Venue', VenueSchema);
