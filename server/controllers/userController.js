const User = require('../models/User');
const Notification = require('../models/Notification');
const Activity = require('../models/Activity');

// @desc    Get user settings
// @route   GET /api/users/me/settings
// @access  Private
exports.getSettings = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('settings');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user.settings || {});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Update user settings
// @route   PATCH /api/users/me/settings
// @access  Private
exports.updateSettings = async (req, res) => {
    const { theme, notifications, language, mutedGroups, mutedUsers } = req.body;

    // Build settings object
    const settingsFields = {};
    if (theme) settingsFields.theme = theme;
    if (notifications) settingsFields.notifications = notifications;
    if (language) settingsFields.language = language;
    if (mutedGroups) settingsFields.mutedGroups = mutedGroups;
    if (mutedUsers) settingsFields.mutedUsers = mutedUsers;

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Initialize settings if it doesn't exist
        if (!user.settings) {
            user.settings = {};
        }

        // Merge new settings with existing ones
        // Using direct assignment for first level properties to trigger Mongoose change tracking if needed, 
        // though findByIdAndUpdate is often easier, let's stick to save() for hooks if any.
        // Actually, let's use a deep merge or just update fields.

        if (theme) user.settings.theme = theme;
        if (notifications) user.settings.notifications = { ...user.settings.notifications, ...notifications };
        if (language) user.settings.language = language;
        if (mutedGroups) user.settings.mutedGroups = mutedGroups;
        if (mutedUsers) user.settings.mutedUsers = mutedUsers;

        await user.save();

        res.json(user.settings);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get user notifications
// @route   GET /api/users/me/notifications
// @access  Private
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get user activity
// @route   GET /api/profile/activity
// @access  Private
exports.getUserActivity = async (req, res) => {
    try {
        const userId = req.user.id;
        let { limit, cursor } = req.query;
        limit = parseInt(limit, 10) || 10;

        let query = { user: userId };
        if (cursor) {
            query._id = { $lt: cursor };
        }

        // Fetch limit + 1 to determine if there are more items
        const rawActivities = await Activity.find(query)
            .sort({ _id: -1 })
            .limit(limit + 1)
            .lean();

        const hasMore = rawActivities.length > limit;
        if (hasMore) {
            rawActivities.pop(); // Remove the extra item
        }

        const nextCursor = hasMore ? rawActivities[rawActivities.length - 1]._id : null;

        // Format the output to match the expected response example exactly
        res.json({
            activities: rawActivities.map(act => ({
                id: act._id,
                type: act.type,
                message: act.message,
                createdAt: act.createdAt
            })),
            pagination: {
                hasMore,
                nextCursor
            }
        });
    } catch (err) {
        console.error('Error fetching activity:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
