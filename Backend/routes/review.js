const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required.' });
    }

    const review = new Review({
      user: userId, // optional: send user ID from frontend if logged in
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: 'Review submitted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // newest first
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
