const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.post('/', async (req, res) => {
  const { user, rating, comment } = req.body;
  try {
    const newReview = new Review({
      user,
      rating,
      comment
    });
    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit review.' });
  }
});

module.exports = router;
