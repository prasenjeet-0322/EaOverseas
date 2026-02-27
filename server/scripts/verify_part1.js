const API_URL = 'http://localhost:5001/api';

const test = async () => {
    try {
        console.log('1. Authenticating...');
        const email = `testuser_${Date.now()}@example.com`;
        const password = 'password123';

        console.log('   Registering user:', email);

        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Test User',
                email,
                password,
                role: 'Student'
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || 'Signup failed');
        }

        console.log('   Signup response:', data); // Should contain msg: 'OTP sent'
        console.log('   EMAIL:', email); // Log email so we can use it in part 2

    } catch (err) {
        console.error('Test failed:', err.message);
    }
};

test();
