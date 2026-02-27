import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { useGoogleLogin } from '@react-oauth/google';

const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const loginGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });
                const payload = await res.json();

                // Check if user exists in our mock DB
                const registeredUsers = JSON.parse(localStorage.getItem('eaoverseas_registered_users') || '[]');
                const existingUser = registeredUsers.find((u: any) => u.email === payload.email);

                if (!existingUser) {
                    // User not found, redirect to signup with pre-filled data
                    onClose();
                    navigate('/signup', {
                        state: {
                            googleUser: {
                                name: payload.name,
                                email: payload.email,
                                picture: payload.picture
                            }
                        }
                    });
                    return;
                }

                // Store the token (access token in this case)
                localStorage.setItem('google_token', tokenResponse.access_token);

                // Create user object for session
                const user = {
                    ...existingUser,
                    picture: payload.picture,
                    isDemo: false
                };

                // Store user session
                localStorage.setItem('eaoverseas_user', JSON.stringify(user));

                // Close modal and reload/redirect
                onClose();
                window.location.reload();
            } catch (error) {
                console.error("Error fetching Google User Info:", error);
                alert("Failed to fetch user info from Google.");
            }
        },
        onError: () => {
            console.log("Login Failed");
            alert("Google Login Failed");
        }
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            onClose(); // Close modal on success
            // Optional: Reload or just let state update reflect logged in status
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    const handleCreateAccount = () => {
        onClose();
        navigate('/signup');
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-[360px] lg:max-w-[480px] p-6 lg:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200 scale-100 transition-all">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 lg:top-4 lg:right-4 p-1.5 lg:p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <span className="material-symbols-outlined text-xl lg:text-2xl">close</span>
                </button>

                <div className="text-center mb-5 lg:mb-8">
                    <div className="inline-flex items-center justify-center size-10 lg:size-14 rounded-xl bg-blue-50 text-blue-600 mb-3 lg:mb-4 transition-all">
                        <span className="material-symbols-outlined text-xl lg:text-3xl">lock</span>
                    </div>
                    <h2 className="text-xl lg:text-3xl font-bold font-display text-slate-900 mb-1 lg:mb-2">Welcome back</h2>
                    <p className="text-slate-500 text-xs lg:text-base text-center px-4">Sign in to continue to EAOverseas.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                            placeholder="name@example.com"
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                            placeholder="Enter password"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs lg:text-sm font-medium text-center">{error}</p>}

                    <button type="submit" className="w-full h-10 lg:h-12 bg-[#0d6cf2] hover:bg-blue-700 text-white text-sm lg:text-base font-bold rounded-lg transition-all shadow-md shadow-blue-500/20 mt-1 lg:mt-2">
                        Sign In
                    </button>

                    <div className="relative flex py-1 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-3 text-gray-400 text-[10px] uppercase font-bold tracking-wider">Or</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <button type="button" onClick={() => loginGoogle()} className="flex items-center justify-center gap-2 h-9 lg:h-11 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-slate-700 text-xs lg:text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                            </svg>
                            <span className="hidden lg:inline">Google</span>
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 h-9 lg:h-11 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-slate-700 text-xs lg:text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.418 1.44-1.13 3.536-1.13 3.536s2.157.485 3.558-1.07c1.198-1.372 1.053-3.265 1.053-3.265s-1.036-.075-1.156-.373zm-3.633 4.673c-.09-.036-1.319-1.636-2.583-1.636-1.065 0-2.31 1.042-3.033 1.943-2.618 3.327-2.336 8.356 1.147 11.59 1.157 1.078 2.22 1.066 3.018.665.798-.401 2.019-.401 2.951 0 .932.401 2.169.293 3.197-.736 1.706-1.706 2.373-4.008 2.384-4.053-.011-.059-1.972-.516-2.39-2.09-.43-1.603 1.196-2.67 1.196-2.67s-1.688-2.607-3.64-2.835c-.443-.052-1.928-.215-2.246-.078z" />
                            </svg>
                            <span className="hidden lg:inline">Apple</span>
                        </button>
                        <button type="button" onClick={() => {
                            const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
                            const redirectUri = `${window.location.origin}/linkedin`;
                            const scope = 'openid profile email';
                            const state = 'eaoverseas_linkedin_state'; // Should be random in prod

                            if (!clientId) {
                                alert('LinkedIn Client ID is missing in .env');
                                return;
                            }

                            window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`;
                        }} className="flex items-center justify-center gap-2 h-9 lg:h-11 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-slate-700 text-xs lg:text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0077b5" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                            </svg>
                            <span className="hidden lg:inline">LinkedIn</span>
                        </button>
                    </div>
                </form>

                <div className="mt-4 lg:mt-6 p-2.5 lg:p-4 bg-blue-50/50 rounded-lg border border-blue-100 text-center transition-all">
                    <p className="text-[10px] lg:text-xs text-blue-600 font-bold uppercase tracking-wider mb-1 lg:mb-2">Demo Access</p>
                    <div className="flex justify-center gap-3 text-[11px] lg:text-xs text-slate-600">
                        <span className="font-mono bg-white px-2 py-0.5 rounded border border-blue-100">alex.j@example.com</span>
                        <span className="font-mono bg-white px-2 py-0.5 rounded border border-blue-100">5678</span>
                    </div>
                </div>

                <div className="mt-4 lg:mt-6 text-center">
                    <p className="text-slate-500 text-xs lg:text-sm">
                        New to EAOverseas?{' '}
                        <button onClick={handleCreateAccount} className="text-[#0d6cf2] font-bold hover:underline">
                            Create Account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
