const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getDashboardStats } = require('../controllers/dashboardController');

// @route   GET /api/dashboard/stat
// @desc    Get dashboard real-time statistics (application counts, profile strength)
// @access  Private
router.get('/stat', auth, getDashboardStats);

module.exports = router;
