
const BASE_URL = 'http://localhost:5000/api/auth';
const EMAIL = 'test_otp_user_' + Date.now() + '@example.com';
let USER_ID = '';

async function run() {
    console.log('--- Starting OTP Flow Verification ---');

    // 1. Signup
    console.log(`\n1. Signing up user: ${EMAIL}`);
    try {
        const signupRes = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: EMAIL,
                password: 'password123',
                role: 'Student'
            })
        });
        const signupData = await signupRes.json();
        console.log('Signup Response:', signupRes.status, signupData);

        if (signupRes.status === 200) {
            USER_ID = signupData.userId;
        } else {
            console.error('Signup failed. Aborting.');
            return;
        }
    } catch (e) {
        console.error('Signup Request Failed:', e);
        return;
    }

    // 2. Verify with Invalid OTP
    console.log('\n2. Verifying with INVALID OTP (123456)');
    try {
        const verifyRes = await fetch(`${BASE_URL}/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: USER_ID, otp: '123456' })
        });
        const verifyData = await verifyRes.json();
        console.log('Verify (Invalid) Response:', verifyRes.status, verifyData);
    } catch (e) {
        console.error('Verify Request Failed:', e);
    }

    // 3. Resend OTP
    console.log('\n3. Resending OTP');
    try {
        const resendRes = await fetch(`${BASE_URL}/resend-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: USER_ID })
        });
        const resendData = await resendRes.json();
        console.log('Resend Response:', resendRes.status, resendData);
    } catch (e) {
        console.error('Resend Request Failed:', e);
    }

    // 4. Verify with VALID OTP (Requires knowing it)
    console.log('\n--- Test Script Finished ---');
    console.log('Check Server Console for OTP and try verifying manually.');
}

run();
