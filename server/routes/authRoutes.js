const express = require("express");

const {
  registerUser,
  loginUser,
  getMe,
  logoutUser,

} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", authMiddleware, getMe);

router.post("/logout", logoutUser);

module.exports = router;