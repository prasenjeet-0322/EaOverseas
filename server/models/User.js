const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Student'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    settings: {
        theme: {
            type: String,
            default: 'light',
            enum: ['light', 'dark']
        },
        notifications: {
            email: {
                type: Boolean,
                default: true
            },
            push: {
                type: Boolean,
                default: true
            }
        },
        language: {
            type: String,
            default: 'en'
        },
        mutedGroups: [{
            type: String
        }],
        mutedUsers: [{
            type: String
        }]
    }
});

module.exports = mongoose.model('User', UserSchema);
