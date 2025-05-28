// models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
