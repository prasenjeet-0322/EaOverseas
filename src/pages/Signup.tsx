import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
        institutionName: '',
        country: '',
        city: '',
        website: '',
        referralCode: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    React.useEffect(() => {
        if (location.state?.googleUser) {
            const { name, email } = location.state.googleUser;
            setFormData(prev => ({
                ...prev,
                name: name || '',
                email: email || ''
            }));
        }
    }, [location.state]);

    const signupGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });
                const payload = await res.json();

                // Store the token
                localStorage.setItem('google_token', tokenResponse.access_token);

                // Create user object for session
                const user = {
                    id: payload.sub,
                    name: payload.name,
                    email: payload.email,
                    picture: payload.picture,
                    role: 'Student', // Default to Student for signup
                    isDemo: false
                };

                // Store user session
                localStorage.setItem('eaoverseas_user', JSON.stringify(user));

                // Redirect
                navigate('/dashboard');
                window.location.reload();
            } catch (error) {
                console.error("Error fetching Google User Info:", error);
                alert("Failed to fetch user info from Google.");
            }
        },
        onError: () => {
            console.log("Login Failed");
            alert("Google Signup Failed");
        }
    });

    const handleLinkedInSignup = () => {
        const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
        const redirectUri = "http://localhost:5173/linkedin";
        const scope = "openid profile email";

        window.location.href =
            `https://www.linkedin.com/oauth/v2/authorization` +
            `?response_type=code` +
            `&client_id=${clientId}` +
            `&redirect_uri=${redirectUri}` +
            `&scope=${scope}`;
    };

    const handleChange = (e) => {
        // Correct way to handle input changes
        if (e.target.name) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Hardcoded role to Student
            const user = await signup({ ...formData, role: 'Student' });
            const from = location.state?.from;
            // Passed email only, verification page doesn't need userId anymore
            navigate('/verification', { state: { from, email: formData.email } });
        } catch (err: any) {
            setError(err.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-display overflow-hidden">
            {/* Left Side - Image */}
            <div className="hidden lg:block w-[50%] bg-[#0d6cf20a] relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop")`,
                    filter: 'grayscale(20%)'
                }}></div>
                <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-16 text-white z-10">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                        <div className="flex gap-2 text-yellow-400 mb-4">
                            <span className="material-symbols-outlined fill-current">star</span>
                            <span className="material-symbols-outlined fill-current">star</span>
                            <span className="material-symbols-outlined fill-current">star</span>
                            <span className="material-symbols-outlined fill-current">star</span>
                            <span className="material-symbols-outlined fill-current">star_half</span>
                        </div>
                        <p className="text-lg leading-relaxed font-medium mb-6">"Applying to universities abroad felt overwhelming until I found EAOverseas. The platform made the entire process simple and stress-free."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 bg-cover bg-center border-2 border-white/50" style={{
                                backgroundImage: `url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop")`
                            }}></div>
                            <div>
                                <p className="font-bold text-white">Sarah Chen</p>
                                <p className="text-sm text-blue-200">Student, University of Toronto</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-8 overflow-y-auto">
                <div className="max-w-[400px] lg:max-w-[500px] w-full mx-auto transition-all duration-300">
                    {/* Logo (Static -> Clickable) */}
                    <Link to="/landing" className="flex items-center gap-2 mb-6 lg:mb-8 group cursor-pointer w-fit">
                        <div className="bg-[#0d6cf2]/10 rounded-lg flex items-center justify-center size-9 lg:size-10 text-[#0d6cf2] transition-colors group-hover:bg-[#0d6cf2]/20">
                            <span className="material-symbols-outlined text-[20px] lg:text-[24px]">school</span>
                        </div>
                        <span className="font-bold text-slate-900 text-lg lg:text-xl group-hover:text-[#0d6cf2] transition-colors">EAOverseas</span>
                    </Link>

                    {/* Header */}
                    <div className="mb-6 lg:mb-8">
                        <h1 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2 text-left">
                            Create Account
                        </h1>
                        <p className="text-slate-500 text-sm lg:text-base">
                            Join thousands of students achieving their dreams.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-4 lg:space-y-5" onSubmit={handleSignup}>

                        {/* Student Form */}
                        <div className="space-y-3 lg:space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                                    placeholder="e.g. John Doe"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Mobile Number</label>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                                    placeholder="Enter your mobile number"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-1 relative">
                            <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full h-10 lg:h-12 px-3 pr-10 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                                    placeholder="Create a password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                >
                                    <span className="material-symbols-outlined text-[18px] lg:text-[20px]">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Referral Code <span className="text-slate-400 font-normal">(Optional)</span></label>
                            <input
                                type="text"
                                name="referralCode"
                                value={formData.referralCode}
                                onChange={handleChange}
                                className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                                placeholder="Enter referral code"
                            />
                        </div>
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className={`w-full h-10 lg:h-12 bg-[#0d6cf2] hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20 text-white text-sm lg:text-base font-bold rounded-lg transition-all mt-2 lg:mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>

                        <div className="relative flex py-1 items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink-0 mx-3 text-gray-400 text-[10px] lg:text-xs uppercase font-bold tracking-wider">Or sign up with</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => signupGoogle()}
                                className="flex items-center justify-center gap-2 h-9 lg:h-11 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-slate-700 text-xs lg:text-sm"
                            >
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span className="hidden lg:inline">Google</span>
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 h-9 lg:h-11 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-slate-700 text-xs lg:text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1877F2" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg>
                                <span className="hidden lg:inline">Facebook</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleLinkedInSignup}
                                className="flex items-center justify-center gap-2 h-9 lg:h-11 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-slate-700 text-xs lg:text-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0077b5" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                </svg>
                                <span className="hidden lg:inline">LinkedIn</span>
                            </button>
                        </div>

                        <div className="text-center pt-2">
                            <p className="text-slate-500 text-xs lg:text-sm">Already have an account? <Link to="/login" className="text-[#0d6cf2] font-bold hover:underline">Sign in</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
