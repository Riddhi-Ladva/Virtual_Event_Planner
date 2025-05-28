// models/Payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  amount: Number,
  date: Date,
  method: String,
  status: String
});

module.exports = mongoose.model('Payment', PaymentSchema);
