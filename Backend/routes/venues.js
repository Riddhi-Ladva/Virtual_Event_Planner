const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');

// your code here...

router.get('/:cityId', async (req, res) => {
  try {
    const venues = await Venue.find({ city: req.params.cityId });
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
