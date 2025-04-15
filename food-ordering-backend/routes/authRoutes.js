const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register API
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

// Login API
// router.post("/login", async (req, res) => {
//   try {
//       const user = await User.findOne({ email: req.body.email });
//       if (!user) return res.status(400).json({ msg: "User not found" });

//       const isMatch = await bcrypt.compare(req.body.password, user.password);
//       if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//       const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
//       res.json({ token, user });
//   } catch (error) {
//       console.error("Login Error:", error);
//       res.status(500).json({ msg: "Server Error" });
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Make sure email and password are provided
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  // Check if the user exists (assuming you have a User model)
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  // Check if the password matches
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ success: false, message: "Invalid password" });
  }

  // Generate JWT token (assuming you're using JWT for authentication)
  const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });

  // Respond with token and user data
  return res.status(200).json({
    success: true,
    token,
    user: { id: user._id, email: user.email, name: user.name }
  });
});




module.exports = router;
