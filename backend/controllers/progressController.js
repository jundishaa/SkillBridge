const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

// @desc    Mark a lesson as completed
// @route   POST /api/progress/:courseId/:lessonId
// @access  Private
const markLessonComplete = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;

  // Check if the course and lesson exist
  const course = await Course.findById(courseId);
  const lesson = await Lesson.findById(lessonId);

  if (!course || !lesson) {
    res.status(404);
    throw new Error('Course or Lesson not found');
  }

  // Check if the user is enrolled in the course
  const user = await User.findById(req.user._id);
  if (!user.enrolledCourses.includes(courseId)) {
    res.status(403);
    throw new Error('You are not enrolled in this course');
  }

  // Update progress
  let courseProgress = user.progress.find(
    (p) => p.courseId.toString() === courseId
  );

  if (!courseProgress) {
    // Initialize progress if it doesn't exist
    courseProgress = { courseId, completedLessons: [] };
    user.progress.push(courseProgress);
  }

  // Add the lesson to completedLessons if not already added
  if (!courseProgress.completedLessons.includes(lessonId)) {
    courseProgress.completedLessons.push(lessonId);
  }

  await user.save(); 
  res.status(200).json({ message: 'Lesson marked as completed' });
});

// @desc    Get progress for a course
// @route   GET /api/progress/:courseId
// @access  Private
const getCourseProgress = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  // Find the user and populate course progress
  const user = await User.findById(req.user._id).populate({
    path: 'progress.courseId',
    select: 'title',
  });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Find progress for the given course
  const courseProgress = user.progress.find(
    (p) => p.courseId.toString() === courseId
  );

  if (!courseProgress) {
    return res.status(200).json({
      message: 'No progress found for this course. Start learning to track progress.',
      progress: null,
    });
  }

  res.status(200).json(courseProgress);
});

// @desc    Get all lessons for a course
// @route   GET /api/courses/:courseId/lessons
// @access  Public or Private (depending on your app's needs)
const getLessonsForCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  // Find lessons for the specified course
  const lessons = await Lesson.find({ courseId });

  if (!lessons || lessons.length === 0) {
    res.status(404);
    throw new Error('No lessons found for this course');
  }

  res.status(200).json(lessons);
});

module.exports = {
  markLessonComplete,
  getCourseProgress,
  getLessonsForCourse,
};

