// models/EventPlan.js
const mongoose = require('mongoose');

const EventPlanSchema = new mongoose.Schema({
  eventType: String,
  date: Date,
  
});

module.exports = mongoose.model('EventPlan', EventPlanSchema);
