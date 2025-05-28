const express = require('express');
const router = express.Router();
const History = require('../models/History');

//console.log('Booking create request body:', req.body);

router.post('/create', async (req, res) => {
  try {
    const {
      userId,
      city,
      venue,
      menu,
      decoration,
      eventType,
      eventDate,
      personCount,
      menuTotal,
      finalCost
    } = req.body;

    const newPlan = new History({
      userId,
      city,
      venue,
      menu,
      decoration,
      eventType,
      eventDate,
      personCount,
      menuTotal,
      finalCost
    });

    await newPlan.save();
    res.status(201).json({ message: 'Event plan saved', plan: newPlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving plan' });
  }
});

module.exports = router;
