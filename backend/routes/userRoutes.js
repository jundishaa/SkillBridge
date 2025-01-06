const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Sample route
router.get('/', (req, res) => {
  res.send('User routes are working...');
});

// Protected route to get user profile
router.get('/profile', protect, (req, res) => {
  res.json({
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
});

module.exports = router;

