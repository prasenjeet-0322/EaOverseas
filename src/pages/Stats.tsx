import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';

const Stats = () => {
    const { user, loading: authLoading } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (authLoading) return; // Wait until AuthContext has finished initializing from localStorage

        const fetchStats = async () => {
            try {
                // If the user is a demo user, we don't have a real JWT token.
                // We'll simulate a successful load with mock data for demo purposes.
                if (user?.isDemo) {
                    setStats({
                        applicationStats: { applied: 5, shortlisted: 2, accepted: 1, rejected: 0, withdrawn: 0 },
                        profileStrength: 85
                    });
                    setLoading(false);
                    return;
                }

                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No authentication token available");
                }
                const res = await axios.get('http://localhost:5001/api/dashboard/stat', {
                    headers: { 'x-auth-token': token }
                });
                setStats(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching stats:', err);
                setError('Failed to load dashboard statistics.');
                setLoading(false);
            }
        };

        fetchStats();
    }, [authLoading, user]);

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50">
            <div className="hidden lg:block">
                <PageHeader title="Real-Time Statistics" actions={null} breadcrumbs={[]} />
            </div>

            <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50/50">
                <div className="max-w-4xl mx-auto flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">My Analytics</h2>

                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <span className="material-symbols-outlined animate-spin text-blue-600 text-4xl">refresh</span>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
                            {error}
                        </div>
                    )}

                    {!loading && !error && stats && (
                        <div className="space-y-6">
                            {/* Profile Strength Card */}
                            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">person</span>
                                    Profile Strength
                                </h3>

                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-semibold text-gray-700">Completion</span>
                                            <span className="text-sm font-bold text-blue-600">{stats.profileStrength}%</span>
                                        </div>
                                        <div className="h-3 w-full bg-blue-50 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                                style={{ width: `${stats.profileStrength}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="size-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl border-4 border-blue-100 shrink-0">
                                        {stats.profileStrength}%
                                    </div>
                                </div>
                            </div>

                            {/* Application Stats Grid */}
                            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-purple-600">article</span>
                                    Application Statuses
                                </h3>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                                        <p className="text-sm text-gray-500 font-medium mb-1 uppercase text-xs tracking-wider">Applied</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.applicationStats.applied || 0}</p>
                                    </div>
                                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 hover:border-orange-200 transition-colors">
                                        <p className="text-sm text-orange-600 font-medium mb-1 uppercase text-xs tracking-wider">Shortlisted</p>
                                        <p className="text-3xl font-bold text-orange-700">{stats.applicationStats.shortlisted || 0}</p>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-xl border border-green-100 hover:border-green-200 transition-colors">
                                        <p className="text-sm text-green-600 font-medium mb-1 uppercase text-xs tracking-wider">Accepted</p>
                                        <p className="text-3xl font-bold text-green-700">{stats.applicationStats.accepted || 0}</p>
                                    </div>
                                    <div className="p-4 bg-red-50 rounded-xl border border-red-100 hover:border-red-200 transition-colors">
                                        <p className="text-sm text-red-600 font-medium mb-1 uppercase text-xs tracking-wider">Rejected</p>
                                        <p className="text-3xl font-bold text-red-700">{stats.applicationStats.rejected || 0}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Stats;
