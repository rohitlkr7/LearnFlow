const Course = require("../models/Course");

// Create Course
const createCourse = async (req, res) => {
  try {
    const { title, description, category, level, price, thumbnail } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description and category are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      category,
      level: level || "beginner",
      price: price || 0,
      thumbnail: thumbnail || "",
      teacher: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Create course error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get All Courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      teacher: req.user.userId,
    })
      .populate("teacher", "name email")
      .populate("students", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("Get courses error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get Single Course
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("teacher", "name email")
      .populate("students", "name email");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Get course error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Enroll Student
const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.students.includes(req.user.userId)) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled in this course",
      });
    }

    course.students.push(req.user.userId);

    await course.save();

    res.status(200).json({
      success: true,
      message: "Enrolled successfully",
    });
  } catch (error) {
    console.error("Enroll course error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get Teacher's Courses
const getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      teacher: req.user.userId,
    })
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("Get teacher courses error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Only course owner can delete it
    if (
      course.teacher.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this course",
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update Course

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Only course owner can update it
    if (
      course.teacher.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this course",
      });
    }

    const {
      title,
      description,
      category,
      level,
      price,
      thumbnail,
      isPublished,
    } = req.body;

    course.title = title ?? course.title;
    course.description = description ?? course.description;
    course.category = category ?? course.category;
    course.level = level ?? course.level;
    course.price = price ?? course.price;
    course.thumbnail = thumbnail ?? course.thumbnail;

    if (typeof isPublished === "boolean") {
      course.isPublished = isPublished;
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error("Update course error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  enrollCourse,
  getTeacherCourses,
  deleteCourse,
  updateCourse,
};
