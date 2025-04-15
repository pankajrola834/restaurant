// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/auth");

// // A protected route (Only accessible if logged in)
// router.get("/dashboard", authMiddleware, (req, res) => {
//   res.json({ success: true, message: "Welcome to your dashboard!", user: req.user });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.get("/user", authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get("/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});
