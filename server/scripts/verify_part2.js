const API_URL = 'http://localhost:5001/api';

const email = 'testuser_1771476442281@example.com';
const otp = '798391';

const test = async () => {
    try {
        console.log('2. Verifying OTP...');
        const verifyRes = await fetch(`${API_URL}/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });

        const verifyData = await verifyRes.json();
        if (!verifyRes.ok) throw new Error(verifyData.msg || 'Verification failed');

        console.log('   Verification success. Token received.');
        const token = verifyData.token;

        // 3. Test Update Settings
        console.log('3. Testing PATCH /settings...');
        const settingsRes = await fetch(`${API_URL}/users/me/settings`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({
                theme: 'dark',
                notifications: { email: false, push: true },
                mutedGroups: ['group1', 'group2']
            })
        });

        const settingsData = await settingsRes.json();
        if (!settingsRes.ok) throw new Error(settingsData.msg || 'Update settings failed');
        console.log('   Settings updated:', settingsData);

        // 4. Test Get Notifications
        console.log('4. Testing GET /notifications...');
        const notifRes = await fetch(`${API_URL}/users/me/notifications`, {
            method: 'GET',
            headers: { 'x-auth-token': token }
        });

        const notifData = await notifRes.json();
        if (!notifRes.ok) throw new Error(notifData.msg || 'Get notifications failed');
        console.log('   Notifications received:', notifData);

        console.log('ALL TESTS PASSED');

    } catch (err) {
        console.error('Test failed:', err.message);
    }
};

test();
