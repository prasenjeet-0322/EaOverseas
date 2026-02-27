const mongoose = require('mongoose');
const User = require('../models/User');
const Activity = require('../models/Activity');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config({ path: '../.env' });

const testEndpoint = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Find a valid user
        const user = await User.findOne();
        if (!user) {
            console.log("No user found.");
            process.exit(1);
        }

        // Seed some activities for this user
        await Activity.deleteMany({ user: user._id }); // cleanup past tests
        await Activity.create([
            { user: user._id, type: 'account_created', message: 'You created an account', createdAt: new Date(Date.now() - 100000) },
            { user: user._id, type: 'profile_updated', message: 'Your profile strength increased to 25%', createdAt: new Date(Date.now() - 80000) },
            { user: user._id, type: 'application_submitted', message: 'You applied to MS in USA - Fall 2026', createdAt: new Date(Date.now() - 50000) },
        ]);

        const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET || 'secret');

        console.log('--- Requesting first page (limit=2) ---');
        let response = await axios.get('http://localhost:5001/api/profile/activity?limit=2', {
            headers: { 'x-auth-token': token }
        });

        console.log(JSON.stringify(response.data, null, 2));

        if (response.data.pagination.hasMore && response.data.pagination.nextCursor) {
            console.log('\n--- Requesting second page (limit=2) using cursor ---');
            response = await axios.get(`http://localhost:5001/api/profile/activity?limit=2&cursor=${response.data.pagination.nextCursor}`, {
                headers: { 'x-auth-token': token }
            });
            console.log(JSON.stringify(response.data, null, 2));
        }

        process.exit(0);
    } catch (e) {
        console.error(e.response ? e.response.data : e.message);
        process.exit(1);
    }
};

testEndpoint();
