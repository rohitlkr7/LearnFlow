const express = require("express");

const {
  createLesson,
  getCourseLessons,
} = require("../controllers/lessonController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Create lesson
router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  createLesson
);

// Get lessons of a course
router.get(
  "/course/:courseId",
  authMiddleware,
  getCourseLessons
);

module.exports = router;