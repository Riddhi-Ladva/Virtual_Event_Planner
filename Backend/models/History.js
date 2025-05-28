// backend/models/EventPlan.js
const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },

  city: {
    name: String,
    image: String,
  },
  eventType: String,
  eventDate: Date,
  personCount: Number,

  venue: {
    name: String,
    image: String,
    capacity: Number,
    price: Number,
  },
  menu: [
  {
    name: String,
    image: String,
    pricePerPerson: Number,
  }
],

  decoration: {
    name: String,
    image: String,
    price: Number,
  },

  finalCost: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('History', HistorySchema);
