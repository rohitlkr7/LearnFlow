const express = require("express");

const {
  createCourse,
  getCourses,
  getCourseById,
  enrollCourse,
  getTeacherCourses,
  deleteCourse,
  updateCourse,
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all courses
router.get("/", authMiddleware, getCourses);

router.get(
  "/teacher",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  getTeacherCourses
);

// Get single course
router.get("/:id", authMiddleware, getCourseById);

// Create course
router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  createCourse
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  updateCourse
);
// Enroll student
router.post("/:id/enroll", authMiddleware, enrollCourse);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  deleteCourse
);



module.exports = router;