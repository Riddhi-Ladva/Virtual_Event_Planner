const express = require("express");
const router = express.Router();
const User = require("../models/Users");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(409).json({ message: "User already exists" });

    const user = new User({ name, email, password, phone, role });
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});


// GET /api/users/:id
// router.get("/user/:id", async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) return res.status(404).json({ message: "User not found" });
//       res.json(user);
//     } catch (err) {
//       res.status(500).json({ message: "Server error" });
//     }
//   });
  
router.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

  

module.exports = router;
