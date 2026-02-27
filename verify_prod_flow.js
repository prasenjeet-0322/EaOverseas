
const BASE_URL = 'http://localhost:5000/api/auth';
const EMAIL = 'test_prod_refactor_' + Date.now() + '@example.com';

async function run() {
    console.log('--- Starting PROD Auth Flow Verification ---');

    // 1. Signup
    console.log(`\n1. Signing up user: ${EMAIL}`);
    try {
        const signupRes = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Prod Test User',
                email: EMAIL,
                password: 'password123',
                role: 'Student'
            })
        });
        const signupData = await signupRes.json();
        console.log('Signup Response:', signupRes.status, signupData);

        if (signupRes.status !== 200) {
            console.error('Signup failed. Aborting.');
            return;
        }
    } catch (e) {
        console.error('Signup Request Failed:', e);
        return;
    }

    // 2. Verify with Invalid OTP
    console.log('\n2. Verifying with INVALID OTP (123456) using EMAIL');
    try {
        const verifyRes = await fetch(`${BASE_URL}/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: EMAIL, otp: '123456' })
        });
        const verifyData = await verifyRes.json();
        console.log('Verify (Invalid) Response:', verifyRes.status, verifyData);
    } catch (e) {
        console.error('Verify Request Failed:', e);
    }

    // 3. Resend OTP
    console.log('\n3. Resending OTP using EMAIL');
    try {
        const resendRes = await fetch(`${BASE_URL}/resend-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: EMAIL })
        });
        const resendData = await resendRes.json();
        console.log('Resend Response:', resendRes.status, resendData);
    } catch (e) {
        console.error('Resend Request Failed:', e);
    }

    // 4. Verify with VALID OTP (Requires knowing it - check console log)
    console.log('\n--- Test Script Finished ---');
    console.log('Check Server Console for OTP (if email failed) and try verifying manually via Frontend or Postman.');
}

run();
