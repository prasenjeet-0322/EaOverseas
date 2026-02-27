const Application = require('../models/Application');
const User = require('../models/User');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stat
// @access  Private
exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id; // From authMiddleware

        // 1. Fetch user data for Profile Strength calculation
        const user = await User.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Calculate profile strength (basic logic based on existing fields)
        let strength = 0;
        const totalWeight = 100;
        let earnedWeight = 0;

        if (user.name) earnedWeight += 25;
        if (user.email) earnedWeight += 25;
        if (user.isVerified) earnedWeight += 25;
        if (user.role) earnedWeight += 10;
        if (user.settings && user.settings.language) earnedWeight += 15;

        // Ensure strength doesn't exceed 100
        const profileStrength = Math.min(earnedWeight, totalWeight);

        // 2. Fetch and aggregate Application statuses
        // Using MongoDB aggregation to group by status and count efficiently
        const applications = await Application.aggregate([
            { $match: { user: user._id } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        // Transform aggregation result to desired object map format
        // e.g. { applied: 12, shortlisted: 4, rejected: 2 }
        const applicationStats = {
            applied: 0,
            shortlisted: 0,
            rejected: 0,
            accepted: 0,
            withdrawn: 0
        };

        applications.forEach(group => {
            const status = group._id.toLowerCase();
            if (applicationStats.hasOwnProperty(status)) {
                applicationStats[status] = group.count;
            } else {
                applicationStats[status] = group.count;
            }
        });

        // 3. Construct the response payload
        res.json({
            applicationStats,
            profileStrength
        });

    } catch (err) {
        console.error('Error fetching dashboard stats:', err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};
