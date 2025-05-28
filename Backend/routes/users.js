const express = require('express');
const router = express.Router();
const User = require('../models/Users'); // Adjust path if needed

// GET user by ID
// routes/users.js or equivalent

//const User = require('../models/User');
const Booking = require('../models/History');

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).send("User not found");

    const bookings = await Booking.find({ userId: req.params.id }).sort({ eventDate: -1 }).lean();

    res.json({ ...user, pastEvents: bookings });
  } catch (err) {
    res.status(500).send("Server error");
  }
});
// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password, // hash in production
        },
      }
    );

    const updatedUser = await User.findById(req.params.id).lean();
    if (!updatedUser) return res.status(404).send("User not found");

    const bookings = await Booking.find({ userId: req.params.id }).sort({ eventDate: -1 }).lean();

    res.status(200).json({ ...updatedUser, pastEvents: bookings });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err });
  }
});



module.exports = router;
