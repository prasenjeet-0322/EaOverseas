const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const OTPSession = require('../models/OTP_Session');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const TEST_EMAIL = 'verify_test@example.com';
const TEST_OTP = '123456';

async function testVerification() {
    console.log('--- Testing OTP Verification Logic ---');

    // 1. Connect DB
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected.');
    } catch (err) {
        console.error('MongoDB Connection Failed:', err.message);
        return;
    }

    // 2. Setup User
    await User.deleteOne({ email: TEST_EMAIL });
    const user = new User({
        name: 'Verify Test',
        email: TEST_EMAIL,
        password: 'password123',
        role: 'Student',
        isVerified: false
    });
    await user.save();
    console.log(`User created: ${user.id}`);

    // 3. Setup OTP Session
    await OTPSession.deleteMany({ user_id: user.id });
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(TEST_OTP, salt);

    await new OTPSession({
        user_id: user.id,
        otp_code: otpHash,
        type: 'Verification'
    }).save();
    console.log('OTP Session created with code 123456');

    // 4. Call API (mocking fetch since we are in node script, or use actual fetch)
    // We'll use fetch to hit the RUNNING server
    console.log('Calling API to verify...');
    try {
        const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: TEST_EMAIL, otp: TEST_OTP })
        });
        const data = await res.json();
        console.log('Response Status:', res.status);
        console.log('Response Data:', data);

        if (res.status === 200) {
            console.log('SUCCESS: OTP Verified!');
        } else {
            console.log('FAILURE: Verification failed.');
        }
    } catch (e) {
        console.error('API Call Failed:', e.cause || e.message);
        console.log('Ensure server is running on port 5000.');
    }

    // Cleanup
    await User.deleteOne({ email: TEST_EMAIL });
    await OTPSession.deleteMany({ user_id: user.id });
    mongoose.disconnect();
}

testVerification();
