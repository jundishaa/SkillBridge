const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Enroll in a course
// @route   POST /api/enroll/:courseId
// @access  Private
const enrollInCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;

  // Check if the course exists
  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  // Check if the user is already enrolled
  const user = await User.findById(req.user._id);
  if (user.enrolledCourses.includes(courseId)) {
    res.status(400);
    throw new Error('You are already enrolled in this course');
  }

  // Enroll the user
  user.enrolledCourses.push(courseId);
  await user.save();

  res.status(200).json({ message: 'Successfully enrolled in course', course });
});

// @desc    Get enrolled courses
// @route   GET /api/enroll
// @access  Private
const getEnrolledCourses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('enrolledCourses');

  res.status(200).json(user.enrolledCourses);
});

// @desc    Unenroll from a course
// @route   DELETE /api/enroll/:courseId
// @access  Private
const unenrollFromCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;

  // Find user and remove the course from their enrolledCourses array
  const user = await User.findById(req.user._id);
  if (!user.enrolledCourses.includes(courseId)) {
    res.status(400);
    throw new Error('You are not enrolled in this course');
  }

  user.enrolledCourses = user.enrolledCourses.filter(
    (id) => id.toString() !== courseId
  );

  await user.save();
  res.status(200).json({ message: 'Successfully unenrolled from course' });
});

module.exports = { enrollInCourse, getEnrolledCourses, unenrollFromCourse };

