const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let token = '';

const test = async () => {
    try {
        // 1. Signup/Login to get token
        console.log('1. Authenticating...');
        const email = `testuser_${Date.now()}@example.com`;
        const password = 'password123';

        // Register
        try {
            await axios.post(`${API_URL}/auth/signup`, {
                name: 'Test User',
                email,
                password,
                role: 'Student'
            });
        } catch (e) {
            // If user exists, login
            console.log('Signup failed (user might exist), trying login...');
        }

        // Login (we need this to get the token, signup in this app returns 'OTP sent', not token usually? 
        // Checking authController: signup returns { msg: 'OTP sent' }. verifyOTP returns token.
        // So I need to mock the verification flow or use an existing user? 
        // Wait, for verification I can just insert a user directly into DB if I had access, but here I am external.

        // Let's try to simulate the flow: Signup -> Get OTP (mocked/logged?) -> Verify -> Token.
        // Or simpler: The backend logs the OTP? Or I can temporarily hack the verify endpoint?

        // Actually, looking at authController.js:
        // signup -> generates OTP -> sends email -> saves to OTPSession.
        // I can't easily get the OTP unless I see the server logs.

        console.log('Authentication is tricky without OTP. Checking if I can use a simpler approach.');
        console.log('The user mentioned "login" returns token? No, verifyOTP returns token.');

        // Check if there is a way to bypass or if I should just ask the user to verify manually?
        // Wait, I can see server logs!
        // The server logs console.error(err.message).
        // Does it log the OTP?
        // authController.js:64: html: ... ${otp} ...
        // It sends email. It doesn't log it to console.

        // Maybe I can temporarily modify the authController to log the OTP?
        // Or I can add a temporary route to generate a token for testing?

    } catch (err) {
        console.error('Setup failed:', err.message);
    }
};

// test();
