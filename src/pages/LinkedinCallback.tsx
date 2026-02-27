import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LinkedinCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    useEffect(() => {
        if (code) {
            console.log("LinkedIn Auth Code:", code);
            // Here you would typically send the code to your backend to exchange for a token
            // For now, we'll store a mock token and redirect
            localStorage.setItem('linkedin_code', code);

            // Mock user session for demo (until backend logic is ready)
            const user = {
                id: 'linkedin_user_' + Date.now(),
                name: 'LinkedIn User',
                email: 'user@linkedin.com',
                picture: '',
                role: 'Student',
                isDemo: false,
                isVerified: true
            };

            // Set token and user to match what AuthContext expects
            localStorage.setItem('token', 'mock_linkedin_token');
            localStorage.setItem('eaoverseas_user', JSON.stringify(user));

            alert("LinkedIn Login Successful (Mock)!");
            navigate('/dashboard');
            window.location.reload();
        } else if (error) {
            console.error("LinkedIn Auth Error:", error);
            alert("LinkedIn Login Failed");
            navigate('/login');
        }
    }, [code, error, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-xl font-bold mb-4">Processing LinkedIn Login...</h2>
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
        </div>
    );
};

export default LinkedinCallback;
