const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

// Create Lesson
const createLesson = async (req, res) => {
  try {
    const {
      course,
      title,
      description,
      videoUrl,
      duration,
      order,
      isPublished,
    } = req.body;

    if (!course || !title) {
      return res.status(400).json({
        success: false,
        message: "Course and lesson title are required",
      });
    }

    const courseExists = await Course.findById(course);

    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (
      courseExists.teacher.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to add a lesson",
      });
    }

    const lesson = await Lesson.create({
      course,
      title,
      description: description || "",
      videoUrl: videoUrl || "",
      duration: Number(duration) || 0,
      order: Number(order) || 0,
      isPublished: Boolean(isPublished),
    });

    res.status(201).json({
      success: true,
      message: "Lesson created successfully",
      lesson,
    });
  } catch (error) {
    console.error("Create lesson error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get Lessons of a Course
const getCourseLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({
      course: req.params.courseId,
    }).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      lessons,
    });
  } catch (error) {
    console.error("Get lessons error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createLesson,
  getCourseLessons,
};