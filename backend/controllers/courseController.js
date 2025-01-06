const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private
const createCourse = asyncHandler(async (req, res) => {
  const { title, description, content } = req.body;

  if (!title || !description || !content) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const course = await Course.create({
    title,
    description,
    content,
    createdBy: req.user._id,
  });

  res.status(201).json(course);
});

// @desc    Create lessons for a course
// @route   POST /api/courses/:courseId/lessons
// @access  Private (Admin or Instructor)
const createLessonsForCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { lessons } = req.body; // Expecting lessons array in request body

  // Check if lessons are provided
  if (!lessons || !Array.isArray(lessons)) {
    res.status(400);
    throw new Error('Lessons array is required');
  }

  // Find the course by ID
  const course = await Course.findById(courseId);

  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  // Create and associate lessons with the course
  const lessonsToCreate = lessons.map((lesson) => ({
    title: lesson.title,
    content: lesson.content,
    courseId,
  }));

  const createdLessons = await Lesson.insertMany(lessonsToCreate);

  res.status(201).json({
    message: 'Lessons created successfully',
    lessons: createdLessons,
  });
});

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// @desc    Get a single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  res.json(course);
});

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  // Ensure only the creator can update the course
  if (course.createdBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this course');
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedCourse);
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  // Ensure only the creator can delete the course
  if (course.createdBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this course');
  }

  await course.remove();
  res.json({ message: 'Course removed' });
});

module.exports = {
  createCourse,
  createLessonsForCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};

