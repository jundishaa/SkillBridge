const express = require('express');
const {
  enrollInCourse,
  getEnrolledCourses,
  unenrollFromCourse,
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:courseId', protect, enrollInCourse); // Enroll in a course
router.get('/', protect, getEnrolledCourses); // Get all enrolled courses
router.delete('/:courseId', protect, unenrollFromCourse); // Unenroll from a course

module.exports = router;

