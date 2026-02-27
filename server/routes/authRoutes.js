const express = require('express');
const router = express.Router();
// @desc    Register user & Send OTP
const { signup, verifyOTP, resendOTP, login, forgotPassword, resetPassword } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
