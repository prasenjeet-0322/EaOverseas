const mongoose = require('mongoose');

const OTPSessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    otp_code: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'Verification'
    },
    attempts: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 900 // 15 minutes in seconds
    }
});

module.exports = mongoose.model('OTP_Session', OTPSessionSchema);
