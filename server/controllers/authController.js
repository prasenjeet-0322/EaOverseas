const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTPSession = require('../models/OTP_Session');
const sendEmail = require('../utils/emailService');

// @desc    Register user & Send OTP
// @route   POST /api/auth/signup
// @access  Public
// @desc    Register user & Send OTP
// @route   POST /api/auth/signup
// @access  Public
// @desc    Register user & Send OTP
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user && user.isVerified) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        if (!user) {
            user = new User({
                name,
                email,
                password,
                role
            });

            // Hash password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash OTP with bcrypt
        const salt = await bcrypt.genSalt(10);
        const otpHash = await bcrypt.hash(otp, salt);

        // Delete existing OTP sessions for this user
        // Using deleteMany to be safe, though there should be at most one useful one
        await OTPSession.deleteMany({ user_id: user.id });

        // Save new OTP session
        await new OTPSession({
            user_id: user.id,
            otp_code: otpHash,
            type: 'Verification'
        }).save();

        // Send Email
        await sendEmail({
            to: email,
            subject: 'EAOverseas - Verify your email',
            html: `<p>Your verification code is: <strong>${otp}</strong></p><p>This code expires in 15 minutes.</p>`
        });

        res.json({ msg: 'OTP sent', email: user.email });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body; // Changed from userId to email

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const session = await OTPSession.findOne({ user_id: user.id, type: 'Verification' });

        if (!session) {
            return res.status(400).json({ msg: 'Invalid or expired OTP. Please request a new one.' });
        }

        // Check attempts
        if (session.attempts >= 5) {
            await OTPSession.findByIdAndDelete(session.id);
            return res.status(400).json({ msg: 'Too many failed attempts. Please request a new OTP.' });
        }

        // Verify Hash using bcrypt
        const isMatch = await bcrypt.compare(otp, session.otp_code);

        if (!isMatch) {
            // Increment attempts
            session.attempts += 1;
            await session.save();
            const remaining = 5 - session.attempts;
            return res.status(400).json({ msg: `Invalid OTP. ${remaining} attempts remaining.` });
        }

        // OTP Valid - Mark user as verified
        user.isVerified = true;
        await user.save();

        // Delete session
        await OTPSession.findByIdAndDelete(session.id);

        // Return JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
exports.resendOTP = async (req, res) => {
    const { email } = req.body; // Changed to accept email only

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ msg: 'User already verified' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash OTP with bcrypt
        const salt = await bcrypt.genSalt(10);
        const otpHash = await bcrypt.hash(otp, salt);

        // Delete existing OTP sessions
        await OTPSession.deleteMany({ user_id: user.id });

        // Save new OTP session
        await new OTPSession({
            user_id: user.id,
            otp_code: otpHash,
            type: 'Verification'
        }).save();

        // Send Email
        await sendEmail({
            to: user.email,
            subject: 'EAOverseas - New Verification Code',
            html: `<p>Your new verification code is: <strong>${otp}</strong></p><p>This code expires in 15 minutes.</p>`
        });

        res.json({ msg: 'OTP Resent' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        if (!user.isVerified) {
            return res.status(400).json({ msg: 'Please verify your email first' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Forgot Password - Send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash OTP with bcrypt
        const salt = await bcrypt.genSalt(10);
        const otpHash = await bcrypt.hash(otp, salt);

        // Delete existing PasswordReset sessions
        await OTPSession.deleteMany({ user_id: user.id, type: 'PasswordReset' });

        // Save new OTP session
        await new OTPSession({
            user_id: user.id,
            otp_code: otpHash,
            type: 'PasswordReset'
        }).save();

        // Send Email
        await sendEmail({
            to: user.email,
            subject: 'EAOverseas - Reset Password',
            html: `<p>You requested a password reset. Your verification code is: <strong>${otp}</strong></p><p>This code expires in 15 minutes.</p>`
        });

        res.json({ msg: 'Password reset OTP sent' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Reset Password - Verify OTP & Update Password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const session = await OTPSession.findOne({ user_id: user.id, type: 'PasswordReset' });

        if (!session) {
            return res.status(400).json({ msg: 'Invalid or expired OTP. Please request a new one.' });
        }

        // Check attempts
        if (session.attempts >= 5) {
            await OTPSession.findByIdAndDelete(session.id);
            return res.status(400).json({ msg: 'Too many failed attempts. Please request a new OTP.' });
        }

        // Verify Hash using bcrypt
        const isMatch = await bcrypt.compare(otp, session.otp_code);

        if (!isMatch) {
            // Increment attempts
            session.attempts += 1;
            await session.save();
            const remaining = 5 - session.attempts;
            return res.status(400).json({ msg: `Invalid OTP. ${remaining} attempts remaining.` });
        }

        // OTP Valid - Update Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        // Delete session
        await OTPSession.findByIdAndDelete(session.id);

        res.json({ msg: 'Password reset successfully. Please login with new password.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
