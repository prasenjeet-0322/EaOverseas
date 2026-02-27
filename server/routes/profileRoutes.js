const express = require('express');
const router = express.Router();
const { getUserActivity } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// @route   GET /api/profile/activity
// @desc    Get user activity
// @access  Private
router.get('/activity', auth, getUserActivity);

module.exports = router;
