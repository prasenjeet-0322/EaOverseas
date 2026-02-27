const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, getNotifications } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// @route   GET /api/users/me/settings
// @desc    Get user settings
// @access  Private
router.get('/me/settings', auth, getSettings);

// @route   PATCH /api/users/me/settings
// @desc    Update user settings
// @access  Private
router.patch('/me/settings', auth, updateSettings);

// @route   GET /api/users/me/notifications
// @desc    Get user notifications
// @access  Private
router.get('/me/notifications', auth, getNotifications);

module.exports = router;
