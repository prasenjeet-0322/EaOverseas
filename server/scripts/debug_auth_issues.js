const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const sendEmail = require('../utils/emailService');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function debugAuth() {
    console.log('--- Debugging Auth & OTP Issues ---');

    // 1. Check Env Vars
    console.log('\n1. Checking Environment Variables:');
    console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'MISSING');
    console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Set' : 'MISSING');
    console.log('NODEMAILER_USER:', process.env.NODEMAILER_USER ? 'Set' : 'MISSING');
    console.log('NODEMAILER_PASS:', process.env.NODEMAILER_PASS ? 'Set' : 'MISSING');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'MISSING');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'MISSING');
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'MISSING');

    // 2. Connect to DB
    console.log('\n2. Connecting to Database...');
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected.');
    } catch (err) {
        console.error('MongoDB Connection Failed:', err.message);
        return;
    }

    // 3. Check Demo User
    console.log('\n3. Checking Demo User...');
    const demoEmail = 'demo@eaoverseas.com'; // Adjust if you know the specific demo email
    const demoUser = await User.findOne({ email: demoEmail });
    if (demoUser) {
        console.log(`Demo User Found: ${demoUser.email}`);
        console.log(`Verified: ${demoUser.isVerified}`);
        console.log(`Role: ${demoUser.role}`);
    } else {
        console.log(`Demo User (${demoEmail}) NOT FOUND.`);
        // List all users to see if there's a different demo user
        const users = await User.find().select('email role isVerified').limit(5);
        console.log('First 5 users in DB:', users);
    }

    // 4. Test Email Sending
    console.log('\n4. Testing Email Sending...');
    const testEmail = 'siddharth@example.com'; // Replace with a safe test email or a real one if user provided
    // For safety, maybe just try to send to a dummy address which might fail at the provider level if invalid, 
    // but at least we test the function call. 
    // Or we can skip actual sending if we just want to verify config is loaded.
    // Let's try sending to a likely internal email or just log intent.
    try {
        console.log(`Attempting to send test email to ${testEmail}...`);
        const result = await sendEmail({
            to: testEmail,
            subject: 'Debug Test Email',
            html: '<p>This is a test email from the debug script.</p>'
        });
        console.log('Email Send Result:', result);
    } catch (err) {
        console.error('Email Send Failed:', err.message);
    }

    console.log('\n--- Debugging Completed ---');
    mongoose.disconnect();
}

debugAuth();
