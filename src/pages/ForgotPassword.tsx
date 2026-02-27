import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { forgotPassword, resetPassword } = useAuth();
    const [step, setStep] = useState(1); // 1: Email, 2: Code & New Password
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await forgotPassword(email);
            setStep(2);
            setSuccess('Verification code sent to your email.');
        } catch (err: any) {
            setError(err.message || 'Failed to send verification code.');
        } finally {
            setLoading(false);
        }
    };

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) return; // Prevent multiple chars

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerifyAndReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const enteredCode = code.join('');
        if (enteredCode.length !== 6) {
            setError('Please enter the complete 6-digit code.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);

        try {
            await resetPassword(email, enteredCode, newPassword);
            setSuccess('Password reset successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to reset password. Invalid code or expired session.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-display overflow-hidden">
            {/* Left Side - Image (Same as Login for consistency) */}
            <div className="hidden lg:block w-[50%] bg-[#0d6cf20a] relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop")', filter: 'grayscale(20%)' }}></div>
                <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-16 text-white z-10">
                    <div className="max-w-lg">
                        <h2 className="text-4xl font-bold mb-6">Secure Account Recovery</h2>
                        <p className="text-lg text-blue-100 leading-relaxed">Don't worry, it happens to the best of us. We'll get you back into your account in no time.</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-20 lg:px-24 py-12 overflow-y-auto">
                <div className="max-w-[440px] w-full mx-auto">
                    {/* Header */}
                    <div className="mb-10">
                        <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 font-medium text-sm">
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                            Back to Login
                        </Link>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="size-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[24px]">
                                    {step === 1 ? 'lock_reset' : 'mark_email_read'}
                                </span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 mb-3 text-left">
                            {step === 1 ? 'Forgot Password?' : 'Reset Password'}
                        </h1>
                        <p className="text-slate-500">
                            {step === 1
                                ? "Enter your email address and we'll send you a verification code to get back into your account."
                                : `We've sent a 6-digit verification code to ${email}. Enter it below along with your new password.`
                            }
                        </p>
                    </div>

                    {/* Error/Success Message */}
                    {error && (
                        <div className="mb-6 bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center gap-2 animate-shake">
                            <span className="material-symbols-outlined text-[18px]">error</span>
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-6 bg-green-50 text-green-600 text-sm p-3 rounded-lg border border-green-100 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            {success}
                        </div>
                    )}

                    {/* Step 1: Email Form */}
                    {step === 1 && (
                        <form onSubmit={handleSendCode} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-900 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-4 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 font-medium placeholder:text-gray-400"
                                    placeholder="Enter your email"
                                    required
                                    autoFocus
                                />
                            </div>

                            <button
                                disabled={loading}
                                className="w-full h-12 bg-[#0d6cf2] hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading && <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>}
                                {loading ? 'Sending...' : 'Send Verification Code'}
                            </button>
                        </form>
                    )}

                    {/* Step 2: Code Verification & Reset Form */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyAndReset} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-900 ml-1">Verification Code</label>
                                <div className="flex gap-2 justify-between">
                                    {code.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`code-${index}`}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleCodeChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            className="w-12 h-14 text-center text-2xl font-bold rounded-xl bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-4 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900"
                                            required
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-900 ml-1">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-4 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 font-medium placeholder:text-gray-400"
                                    placeholder="Enter new password (min 6 chars)"
                                    required
                                    minLength={6}
                                />
                            </div>

                            <button
                                disabled={loading}
                                className="w-full h-12 bg-[#0d6cf2] hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading && <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>}
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>

                            <div className="text-center">
                                <p className="text-sm text-slate-500">
                                    Didn't receive the code?{' '}
                                    <button type="button" onClick={handleSendCode} disabled={loading} className="text-[#0d6cf2] font-bold hover:underline bg-transparent border-none cursor-pointer">
                                        Resend
                                    </button>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
