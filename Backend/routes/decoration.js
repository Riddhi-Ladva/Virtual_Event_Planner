const express = require('express');
const router = express.Router();
const Decoration = require('../models/Decoration');

// GET all decorations
router.get('/', async (req, res) => {
  try {
    const decorations = await Decoration.find();
    res.json(decorations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch decorations' });
  }
});

module.exports = router;
