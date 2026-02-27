const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    university: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'rejected', 'accepted', 'withdrawn'],
        default: 'applied'
    },
    dateApplied: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
