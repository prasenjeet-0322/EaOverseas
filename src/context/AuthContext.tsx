import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    isDemo?: boolean;
    createdAt?: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<User>;
    signup: (userDetails: any) => Promise<User>;
    verifyOTP: (email: string, otp: string) => Promise<User>;
    resendOTP: (email: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persistent session
        const storedUser = localStorage.getItem('eaoverseas_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
                localStorage.removeItem('eaoverseas_user');
            }
        }
        setLoading(false);
    }, []);

    const safeJson = async (res: Response) => {
        const text = await res.text();
        try {
            return text ? JSON.parse(text) : {}; // Handle empty response
        } catch (e) {
            console.error("JSON Parse Error:", e, "Response Text:", text);
            throw new Error(text || res.statusText || "Server Error");
        }
    };

    const login = async (email: string, password: string): Promise<User> => {
        try {
            // ADMIN LOGIN (Full/Demo Mode)
            if (email === 'alex.j@example.com' && password === '5678') {
                const adminUser = {
                    id: 'demo-1',
                    name: 'Alex Johnson',
                    email: 'alex.j@example.com',
                    role: 'Student',
                    isDemo: true,
                };
                setUser(adminUser);
                localStorage.setItem('eaoverseas_user', JSON.stringify(adminUser));
                return adminUser;
            }

            // UNIVERSITY LOGIN (Demo Mode)
            if (email === 'admin@university.edu' && password === 'UNIV2026') {
                const uniUser = {
                    id: 'demo-2',
                    name: 'University Admin',
                    email: 'admin@university.edu',
                    role: 'University',
                    isDemo: true,
                };
                setUser(uniUser);
                localStorage.setItem('eaoverseas_user', JSON.stringify(uniUser));
                return uniUser;
            }

            // COUNSELLOR LOGIN (Demo Mode)
            if (email === 'partner@counsellor.com' && password === 'COUNSELLOR2026') {
                const counsellorUser = {
                    id: 'demo-3',
                    name: 'Dr. Alex Morgan',
                    email: 'partner@counsellor.com',
                    role: 'Counsellor',
                    isDemo: true,
                };
                setUser(counsellorUser);
                localStorage.setItem('eaoverseas_user', JSON.stringify(counsellorUser));
                return counsellorUser;
            }
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                const errorData = await safeJson(res);
                throw new Error(errorData.msg || errorData.message || 'Login failed');
            }

            const data = await safeJson(res);
            localStorage.setItem('token', data.token);
            localStorage.setItem('eaoverseas_user', JSON.stringify(data.user));
            setUser(data.user);
            return data.user;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const signup = async (userDetails: any): Promise<User> => {
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDetails)
            });

            if (!res.ok) {
                const errorData = await safeJson(res);
                throw new Error(errorData.msg || errorData.message || 'Signup failed');
            }

            // Return intermediate user object with email for verification step
            // We don't get a full user yet, just confirmation OTP was sent
            // Construct a temp user object or just return email wrapper
            return { id: 'pending', email: userDetails.email, name: userDetails.name } as User;
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    };

    const verifyOTP = async (email: string, otp: string): Promise<User> => { // Changed userId to email
        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }) // Sending email and otp
            });

            if (!res.ok) {
                const errorData = await safeJson(res);
                throw new Error(errorData.msg || errorData.message || 'Verification failed');
            }

            const data = await safeJson(res);

            // On success, store token and user
            localStorage.setItem('token', data.token);
            localStorage.setItem('eaoverseas_user', JSON.stringify(data.user));
            setUser(data.user);

            return data.user;
        } catch (error) {
            console.error("Verification error:", error);
            throw error;
        }
    };

    const resendOTP = async (email: string): Promise<void> => {
        try {
            const res = await fetch('/api/auth/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!res.ok) {
                const errorData = await safeJson(res);
                throw new Error(errorData.msg || errorData.message || 'Resend failed');
            }
        } catch (error) {
            console.error("Resend OTP error:", error);
            throw error;
        }
    };

    const forgotPassword = async (email: string): Promise<void> => {
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!res.ok) {
                const errorData = await safeJson(res);
                throw new Error(errorData.msg || errorData.message || 'Failed to send password reset OTP');
            }
        } catch (error) {
            console.error("Forgot Password error:", error);
            throw error;
        }
    };

    const resetPassword = async (email: string, otp: string, newPassword: string): Promise<void> => {
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword })
            });

            if (!res.ok) {
                const errorData = await safeJson(res);
                throw new Error(errorData.msg || errorData.message || 'Password reset failed');
            }
        } catch (error) {
            console.error("Reset Password error:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('eaoverseas_user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, verifyOTP, resendOTP, forgotPassword, resetPassword, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
