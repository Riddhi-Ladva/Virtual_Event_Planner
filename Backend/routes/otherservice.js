const express = require('express');
const router = express.Router();
const OtherService = require('../models/Otherservice');

// GET all other services
router.get('/', async (req, res) => {
  try {
    const services = await OtherService.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching services' });
  }
});

// POST add a new other service
router.post('/', async (req, res) => {
  const { serviceName, description, price, image } = req.body;

  if (!serviceName || !description || !price || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newService = new OtherService({
      serviceName,
      description,
      price,
      image
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(500).json({ error: 'Server error while saving the service' });
  }
});

module.exports = router;
