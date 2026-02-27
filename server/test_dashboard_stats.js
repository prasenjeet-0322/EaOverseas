const axios = require('axios');
const jwt = require('jsonwebtoken');

const testEndpoint = async () => {
    try {
        // 1. Generate a mock token just like the frontend
        // 1. Use a real valid database token
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MWJjMDcxMDliMDg4ZWQ2OTYwNWExIn0sImlhdCI6MTcwODQwNjM1MX0.XgI-GgXGfW5Kttv2BxtzGWxNgKgHCdTALWUtu-Y8cKw";

        console.log('--- Sending Request with token ---');
        console.log(token);

        // 2. Make the request
        const response = await axios.get('http://localhost:5001/api/dashboard/stat', {
            headers: {
                'x-auth-token': token
            }
        });

        console.log('--- Success Response ---');
        console.log(response.data);
    } catch (error) {
        console.log('--- Error Response ---');
        if (error.response) {
            console.error(error.response.status, error.response.data);
        } else {
            console.error(error.message);
        }
    }
};

testEndpoint();
