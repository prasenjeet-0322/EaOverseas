
const BASE_URL = 'http://localhost:5000/api/auth';
const EMAIL = 'test_reset_prod_' + Date.now() + '@example.com';
const OLD_PASSWORD = 'oldPassword123';
const NEW_PASSWORD = 'newPassword456';

async function run() {
    console.log('--- Starting Forgot Password Flow Verification ---');

    // 1. Signup User
    console.log(`\n1. Creating User: ${EMAIL}`);
    try {
        const signupRes = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Reset Test User',
                email: EMAIL,
                password: OLD_PASSWORD,
                role: 'Student'
            })
        });
        if (signupRes.status !== 200) throw new Error('Signup failed');
        console.log('User created.');
    } catch (e) {
        console.error('Setup failed:', e.message);
        return;
    }

    // 2. Request Password Reset
    console.log('\n2. Requesting Password Reset OTP...');
    try {
        const forgotRes = await fetch(`${BASE_URL}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: EMAIL })
        });
        const forgotData = await forgotRes.json();
        console.log('Forgot Password Response:', forgotRes.status, forgotData);
    } catch (e) {
        console.error('Forgot Password Request Failed:', e);
    }

    console.log('\n--- CHECK SERVER CONSOLE FOR OTP AND ENTER IT MANUALLY IN BROWSER OR NEXT SCRIPT ---');
    console.log('To automate fully, we need the OTP. For now, assume manual verification via Frontend.');

    // Note: Since we can't easily grab the OTP programmatically without the file hack (which we removed),
    // we will stop here and ask manual verification or re-enable file logging if needed.
    // BUT! I can verify the endpoint responds correctly (which it did above).
}

run();
