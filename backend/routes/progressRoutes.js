const express = require('express');
const { 
  markLessonComplete,
  getCourseProgress,
  getLessonsForCourse, // Import the new function
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:courseId/:lessonId', protect, markLessonComplete); // Mark lesson complete
router.get('/:courseId', protect, getCourseProgress); // Get course progress
router.get('/:courseId/lessons', protect, getLessonsForCourse); // Get all lessons for a course

module.exports = router;

