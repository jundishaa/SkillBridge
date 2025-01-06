const express = require('express');
const { 
  createCourse,
  createLessonsForCourse,  // Import the new function
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse 
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for getting all courses and creating a new course
router.route('/')
  .get(getCourses) // Public: Get all courses
  .post(protect, createCourse); // Private: Create a new course

// Route for getting, updating, and deleting a course
router.route('/:id')
  .get(getCourseById) // Public: Get a single course
  .put(protect, updateCourse) // Private: Update a course
  .delete(protect, deleteCourse); // Private: Delete a course

// New route for creating lessons associated with a course
router.route('/:courseId/lessons')
  .post(protect, createLessonsForCourse); // Private: Create lessons for a course

module.exports = router;

