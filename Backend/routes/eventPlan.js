const express = require('express');
const router = express.Router();
const EventPlan = require('../models/Eventplan');

router.get('/', async (req, res) => {
  try {
    const plans = await EventPlan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event plans' });
  }
});
module.exports = router;
