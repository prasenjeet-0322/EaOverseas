import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useSavedItems } from '../context/SavedItemsContext';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';

const HomeDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { userProfile, updatePreferences } = useUserProfile();
    const { savedColleges, savedCourses, savedAccommodations } = useSavedItems();

    // Expense Data Configuration
    const EXPENSE_DATA = {
        'USA': {
            tuition: 45000,
            living: 15000,
            currency: '$',
            breakdown: {
                'Housing': 800,
                'Food': 400,
                'Transport': 150,
                'Insurance': 100,
                'Misc': 250
            },
            flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC041CJS96qul2YI8Q21-uqh3Uz_ExNUdFNegfgCPAZPu7yjPvsZaFuxLY5pw3S3EHt6_6bfXdL7eDDv9U748iXapOJYuuxx4JP9-5tTEOnVR8zT6MEQ-yvUZ6eBM9gTu62UVE8cGGh2S_bjpULH8j5brCRsbenUCTqDjR54uF6sekJ'
        },
        'UK': {
            tuition: 38000,
            living: 12000,
            currency: '£',
            breakdown: {
                'Housing': 600,
                'Food': 350,
                'Transport': 100,
                'Insurance': 80,
                'Misc': 200
            },
            flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBve9dnlAesE7Vq0w3T50WLb4Wt4fs9wKA9stSkpUCHPAh-WOZX0sB4SF6e7usF2uLNJj2cM6jAh7WYvpMh4LMBjZpy-wEgrGPQ8qGUDvQpYZrDAOVqbSWM6g4OUeLXxyBz-uv9E0oubxn25mtVilNCMKjk6p5xJJL3Tmt84PqzOHdxCA3-9BzyzvODimvcWHI396wLaCwZkUBnyFgR6WKtiNn-3wnnFfUUApSKigu3GnU0_yzXV4w7qIrNnGHeijosLEKJ_bz-bR'
        },
        'Canada': {
            tuition: 32000,
            living: 11000,
            currency: 'C$',
            breakdown: {
                'Housing': 550,
                'Food': 300,
                'Transport': 90,
                'Insurance': 70,
                'Misc': 180
            },
            flag: 'https://cdn.britannica.com/68/7068-004-7848FEB4/Flag-Canada.jpg'
        },
        'Australia': {
            tuition: 40000,
            living: 20000,
            currency: 'A$',
            breakdown: {
                'Housing': 1200,
                'Food': 600,
                'Transport': 150,
                'Insurance': 50,
                'Misc': 300
            },
            flag: 'https://cdn.britannica.com/78/6078-004-77AF7322/Flag-Australia.jpg'
        },
        'Germany': {
            tuition: 3000,
            living: 12000,
            currency: '€',
            breakdown: {
                'Housing': 400,
                'Food': 250,
                'Transport': 80,
                'Insurance': 110,
                'Misc': 150
            },
            flag: 'https://cdn.britannica.com/97/897-004-232BDF01/Flag-Germany.jpg'
        },
        'India': {
            tuition: 400000,
            living: 150000,
            currency: '₹',
            breakdown: {
                'Housing': 8000,
                'Food': 5000,
                'Transport': 1000,
                'Insurance': 500,
                'Misc': 2000
            },
            flag: 'https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg'
        },
        'Ireland': {
            tuition: 15000,
            living: 12000,
            currency: '€',
            breakdown: {
                'Housing': 600,
                'Food': 300,
                'Transport': 100,
                'Insurance': 50,
                'Misc': 200
            },
            flag: 'https://cdn.britannica.com/33/1733-004-53FA3798/Flag-Ireland.jpg'
        },
        'New Zealand': {
            tuition: 35000,
            living: 18000,
            currency: 'NZ$',
            breakdown: {
                'Housing': 700,
                'Food': 400,
                'Transport': 120,
                'Insurance': 60,
                'Misc': 250
            },
            flag: 'https://cdn.britannica.com/17/3017-004-DCC13F9D/Flag-New-Zealand.jpg'
        }
    };

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    const isFreshUser = !user?.isDemo && userProfile.identity.profileStrength < 30;

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50">
            {/* Header */}
            <div className="hidden lg:block">
                <PageHeader
                    title="Home Dashboard"
                    actions={!user && (
                        <button
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                            onClick={() => navigate('/landing')}
                        >
                            Enter Website
                        </button>
                    )}
                />
            </div>

            <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50/50">
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6 h-full">

                    {/* Dashboard Search */}
                    <div className="w-full flex justify-end">
                        <div className="relative w-full max-w-md">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 !text-[20px]">search</span>
                            <input className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 shadow-sm transition-shadow" placeholder="Search universities, courses, applications..." type="text" />
                        </div>
                    </div>

                    {/* Welcome Banner */}
                    <section className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8 shadow-sm">
                        <div className="flex-1">
                            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                Welcome, {user?.name?.split(' ')[0] || 'Student'} <span className="text-2xl md:text-3xl">👋</span>
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base">
                                {isFreshUser
                                    ? "Let's kickstart your study abroad journey. Complete your profile to get personalized recommendations."
                                    : "Your study abroad journey is on track. Here is your daily overview."}
                            </p>
                        </div>
                        <div className="w-full md:w-[350px]">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm md:text-base font-semibold text-gray-700">Profile Readiness</span>
                                <span className="text-sm md:text-base font-bold text-blue-600">{userProfile.identity.profileStrength}%</span>
                            </div>
                            <div className="h-2 w-full bg-blue-50 rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${userProfile.identity.profileStrength}%` }}></div>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">
                                    {isFreshUser ? "Just got started!" : "Last updated 2 hours ago"}
                                </span>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-colors shadow-sm"
                                >
                                    Complete Profile
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Quick Action Cards */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {/* Upload Documents */}
                        <div
                            onClick={() => navigate('/documents')}
                            className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="size-10 md:size-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-[20px] md:!text-[24px]">description</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm md:text-base">Upload Documents</h3>
                                <p className="text-xs md:text-sm text-gray-500 mt-0.5">Academic records & ID</p>
                            </div>
                        </div>

                        {/* Find Colleges */}
                        <div
                            onClick={() => navigate('/colleges')}
                            className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="size-10 md:size-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-[20px] md:!text-[24px]">school</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm md:text-base">Find Colleges</h3>
                                <p className="text-xs md:text-sm text-gray-500 mt-0.5">Explore 500+ top universities</p>
                            </div>
                        </div>

                        {/* Track Applications */}
                        <div
                            onClick={() => navigate('/applications')}
                            className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="size-10 md:size-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-[20px] md:!text-[24px]">near_me</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm md:text-base">Track Applications</h3>
                                <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                                    {isFreshUser ? "No active applications" : `${userProfile.applications?.length || 0} applications in progress`}
                                </p>
                            </div>
                        </div>

                        {/* View Statistics */}
                        <div
                            onClick={() => navigate('/stats')}
                            className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="size-10 md:size-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-[20px] md:!text-[24px]">analytics</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm md:text-base">View Statistics</h3>
                                <p className="text-xs md:text-sm text-gray-500 mt-0.5">Real-time metrics</p>
                            </div>
                        </div>
                    </section>

                    {/* Dashboard Grid - Main Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 lg:flex-1 lg:min-h-[350px]">
                        {/* Eligibility / Profile Insights */}
                        {isFreshUser ? (
                            <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm flex flex-col h-full items-center justify-center text-center">
                                <div className="size-14 md:size-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
                                    <span className="material-symbols-outlined !text-[28px] md:!text-[32px]">analytics</span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">Profile Analysis Pending</h3>
                                <p className="text-xs md:text-sm text-gray-500 mb-6">Complete your profile to see eligibility matches and recommendations.</p>
                                <button onClick={() => navigate('/profile/basic')} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-xs md:text-sm hover:bg-blue-700">Start Profile Setup</button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm flex flex-col h-full">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-gray-400 !text-[20px] md:!text-[24px]">verified</span>
                                        <h3 className="font-bold text-sm md:text-base text-gray-900">Eligibility</h3>
                                    </div>
                                    <button className="text-xs md:text-sm font-medium text-blue-600 hover:underline">View Details</button>
                                </div>
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-gray-100 bg-cover bg-center border border-gray-200" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCC041CJS96qul2YI8Q21-uqh3Uz_ExNUdFNegfgCPAZPu7yjPvsZaFuxLY5pw3S3EHt6_6bfXdL7eDDv9U748iXapOJYuuxx4JP9-5tTEOnVR8zT6MEQ-yvUZ6eBM9gTu62UVE8cGGh2S_bjpULH8j5brCRsbenUCTqDjR54uF6sekJ')" }}></div>
                                            <span className="font-medium text-sm md:text-base text-gray-700">USA</span>
                                        </div>
                                        <span className="text-[10px] md:text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded font-bold">High Match</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-gray-100 bg-cover bg-center border border-gray-200" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBve9dnlAesE7Vq0w3T50WLb4Wt4fs9wKA9stSkpUCHPAh-WOZX0sB4SF6e7usF2uLNJj2cM6jAh7WYvpMh4LMBjZpy-wEgrGPQ8qGUDvQpYZrDAOVqbSWM6g4OUeLXxyBz-uv9E0oubxn25mtVilNCMKjk6p5xJJL3Tmt84PqzOHdxCA3-9BzyzvODimvcWHI396wLaCwZkUBnyFgR6WKtiNn-3wnnFfUUApSKigu3GnU0_yzXV4w7qIrNnGHeijosLEKJ_bz-bR')" }}></div>
                                            <span className="font-medium text-sm md:text-base text-gray-700">UK</span>
                                        </div>
                                        <span className="text-[10px] md:text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded font-bold">Med. Match</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-gray-100 bg-cover bg-center border border-gray-200 flex items-center justify-center text-xs" style={{ backgroundImage: "url('https://cdn.britannica.com/68/7068-004-7848FEB4/Flag-Canada.jpg')" }}></div>
                                            <span className="font-medium text-sm md:text-base text-gray-700">Canada</span>
                                        </div>
                                        <span className="text-[10px] md:text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold">Low Match</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Top Matches */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm flex flex-col h-full">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-gray-400 !text-[20px] md:!text-[24px]">apartment</span>
                                <h3 className="font-bold text-sm md:text-base text-gray-900">Top Matches</h3>
                            </div>
                            <div className="space-y-4 flex-1">
                                {isFreshUser && userProfile.identity.profileStrength < 20 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center py-4">
                                        <span className="text-slate-400 text-xs md:text-sm">Matches appear here after profile completion.</span>
                                    </div>
                                ) : (
                                    <>
                                        {/* Dynamic Logic: Show based on preferred country or default */}
                                        {(() => {
                                            const country = userProfile.preferences?.countries?.[0] || 'USA';
                                            const matches = {
                                                'USA': { name: 'Arizona State Univ.', loc: 'Tempe, USA', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUdzt3vabnFKzx_oJmfKMYvm9OPQf8tRgWs_Dw85RU5_1SoBwHcAF4l8viDzOlp9uijwjvga0QXKCFwqRvbuJRjcNHvS7c5gVRPiVSZYDft5sEn1XWQmJKkl8649GeMqM69ZuGFUOv3tb0Yh2PBOFSDrcaTF95DgWInD5SDa7HYpjy5Nr0V2UgrCDtR8CmFi2U73PRjLtm5I81RCn5NrZhTv3QdR-atqwiDrwYD8BxuM37Uk3vLwjpAgO1NVEo2PnzPZTwXuuBFQ2Y' },
                                                'UK': { name: 'Imperial College', loc: 'London, UK', img: 'https://logo.clearbit.com/imperial.ac.uk' },
                                                'Canada': { name: 'Univ. of Toronto', loc: 'Toronto, Canada', img: 'https://logo.clearbit.com/utoronto.ca' },
                                                'Australia': { name: 'Univ. of Melbourne', loc: 'Melbourne, AU', img: 'https://logo.clearbit.com/unimelb.edu.au' },
                                                'Germany': { name: 'TU Munich', loc: 'Munich, DE', img: 'https://logo.clearbit.com/tum.de' },
                                                'India': { name: 'IIT Bombay', loc: 'Mumbai, IN', img: 'https://logo.clearbit.com/iitb.ac.in' }
                                            };
                                            const match = matches[country] || matches['USA'];

                                            return (
                                                <div onClick={() => navigate(`/college-details?name=${encodeURIComponent(match.name)}`)} className="flex gap-3 items-start cursor-pointer hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors">
                                                    <div className="size-10 rounded border border-gray-100 bg-white p-1 flex items-center justify-center shrink-0">
                                                        <div className="size-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${match.img}')` }}></div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm md:text-base font-bold text-gray-900">{match.name}</h4>
                                                        <p className="text-[10px] md:text-xs text-gray-500 mb-1">{match.loc}</p>
                                                        <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                                            <span className="material-symbols-outlined !text-[14px]">calendar_month</span> Fall 2024
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                        <div className="text-center pt-2">
                                            <button className="text-xs text-blue-600 font-medium hover:underline">View All Matches</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Top Courses */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm flex flex-col h-full">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-gray-400 !text-[20px] md:!text-[24px]">book</span>
                                <h3 className="font-bold text-sm md:text-base text-gray-900">Top Eligible Courses</h3>
                            </div>
                            <div className="space-y-4 flex-1">
                                {isFreshUser && userProfile.identity.profileStrength < 20 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center py-4">
                                        <span className="text-slate-400 text-xs md:text-sm">Course recommendations appear here after profile completion.</span>
                                    </div>
                                ) : (
                                    <>
                                        {(() => {
                                            const degree = userProfile.academics?.degree?.includes('Master') ? 'MS' : 'Bachelor';
                                            const field = userProfile.academics?.major || 'Computer Science';
                                            const country = userProfile.preferences?.countries?.[0] || 'USA';

                                            const uniMap = {
                                                'USA': 'Arizona State University',
                                                'UK': 'Imperial College London',
                                                'Canada': 'University of Toronto',
                                                'Australia': 'University of Melbourne',
                                                'Germany': 'TU Munich'
                                            };
                                            const uni = uniMap[country] || 'Arizona State University';

                                            return (
                                                <>
                                                    <div onClick={() => navigate(`/course-details?title=${encodeURIComponent(degree + ' in ' + field)}&university=${encodeURIComponent(uni)}`)} className="bg-gray-50/50 rounded-lg p-4 border border-gray-100 cursor-pointer hover:bg-gray-100/80 transition-colors">
                                                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3">{degree} in {field.split(' ')[0]}</h4>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-xs md:text-sm text-gray-500">Postgraduate</span>
                                                            <span className="text-[10px] md:text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded font-bold">High Match</span>
                                                        </div>
                                                    </div>
                                                    <div onClick={() => navigate(`/course-details?title=MBA&university=${encodeURIComponent(uni)}`)} className="bg-gray-50/50 rounded-lg p-4 border border-gray-100 cursor-pointer hover:bg-gray-100/80 transition-colors">
                                                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3">MBA (Business Analytics)</h4>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-xs md:text-sm text-gray-500">Postgraduate</span>
                                                            <span className="text-[10px] md:text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded font-bold">Med. Match</span>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Scholarships */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm flex flex-col h-full relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-4 relative z-10">
                                <span className="material-symbols-outlined text-blue-600 !text-[20px] md:!text-[24px]">savings</span>
                                <h3 className="font-bold text-sm md:text-base text-gray-900">Scholarships</h3>
                            </div>

                            <p className="text-xs md:text-sm text-gray-500 mb-8 leading-relaxed relative z-10">
                                Based on your profile, we found relevant grants.
                            </p>

                            <div className="flex items-baseline gap-2 mb-8 relative z-10 flex-1">
                                <span className="text-4xl md:text-5xl font-bold text-gray-900">{isFreshUser && userProfile.identity.profileStrength < 20 ? '0' : '5'}</span>
                                <span className="text-sm md:text-base font-medium text-gray-500">Matches Found</span>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100 relative z-10">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] md:text-xs text-gray-400 font-medium">Est. Savings</span>
                                        <span className="text-[10px] md:text-xs text-gray-400 font-medium">Value</span>
                                    </div>
                                    <span className="text-sm md:text-base font-bold text-green-600 text-right">
                                        {isFreshUser && userProfile.identity.profileStrength < 20 ? '$0 - $0' : '$5,000 -\n$15,000'}
                                    </span>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        </div>
                    </div>

                    {/* Bottom Row - Full Width */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pb-6">
                        {/* Estimated Annual Expense */}
                        {/* Estimated Annual Expense */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm h-full relative">
                            {/* Header & Dropdown */}
                            {/* Header & Add Button */}
                            <div className="flex justify-between items-center mb-6 relative">
                                <h3 className="font-bold text-sm md:text-base text-gray-900">Estimated Annual Expense</h3>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                        className="flex items-center gap-1 px-3 py-1.5 border border-dashed border-blue-300 bg-blue-50 rounded text-xs md:text-sm text-blue-600 font-bold hover:bg-blue-100 transition-colors"
                                    >
                                        <span className="material-symbols-outlined !text-[16px] md:!text-[18px]">add</span>
                                        Add Country
                                    </button>

                                    {showFilterDropdown && (
                                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden py-1 z-[100] animate-in fade-in zoom-in-95 duration-100">
                                            {(() => {
                                                const currentCountries = userProfile.preferences?.countries || [];
                                                const availableCountries = Object.keys(EXPENSE_DATA).filter(c => !currentCountries.includes(c));

                                                if (availableCountries.length === 0) {
                                                    return <div className="px-4 py-3 text-sm text-gray-400 text-center">All countries added</div>;
                                                }

                                                return availableCountries.map(country => (
                                                    <button
                                                        key={country}
                                                        onClick={() => {
                                                            const newCountries = [...currentCountries, country];
                                                            updatePreferences({ countries: newCountries });
                                                            setShowFilterDropdown(false);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                                                    >
                                                        <div className="size-4 rounded-full bg-cover bg-center border border-gray-200" style={{ backgroundImage: `url('${EXPENSE_DATA[country].flag}')` }}></div>
                                                        {country}
                                                    </button>
                                                ));
                                            })()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Main List - Compact Chips */}
                            <div className="flex flex-wrap gap-3 relative">
                                {(userProfile.preferences?.countries || []).map(country => {
                                    const data = EXPENSE_DATA[country];
                                    if (!data) return null; // enhanced safety
                                    const totalCost = data.tuition + data.living;

                                    return (
                                        <div
                                            key={country}
                                            className="relative group"
                                            onMouseEnter={() => setSelectedCountry(country)}
                                            onMouseLeave={() => setSelectedCountry(null)}
                                        >
                                            <div className="flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
                                                <div className="size-6 md:size-8 rounded-full bg-gray-100 bg-cover bg-center border border-gray-200 shrink-0" style={{ backgroundImage: `url('${data.flag}')` }}></div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wide">{country}</span>
                                                    <span className="text-xs md:text-sm font-bold text-gray-900">{data.currency}{totalCost.toLocaleString()}<span className="text-[10px] md:text-xs font-normal text-gray-400">/yr</span></span>
                                                </div>
                                            </div>

                                            {/* Hover Popup Card (Reused Logic) */}
                                            {selectedCountry === country && (
                                                <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-[280px] bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-[100] animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
                                                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                                                        <div className="size-8 rounded-full bg-gray-100 bg-cover bg-center border border-gray-200" style={{ backgroundImage: `url('${data.flag}')` }}></div>
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 text-sm">{country} Breakdown</h4>
                                                            <p className="text-xs text-gray-500">Monthly Estimates</p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                                        {Object.entries(data.breakdown).map(([key, cost]) => (
                                                            <div key={key} className="bg-gray-50 p-2 rounded border border-gray-100 flex flex-col">
                                                                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{key}</span>
                                                                <span className="text-sm font-bold text-gray-900">{data.currency}{cost}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex justify-between items-center gap-2">
                                                        <span className="text-xs text-blue-800 font-bold whitespace-nowrap">Total Annual</span>
                                                        <span className="text-base font-extrabold text-blue-900">{data.currency}{totalCost.toLocaleString()}</span>
                                                    </div>

                                                    {/* Tooltip Arrow */}
                                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-200 rotate-45"></div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {(userProfile.preferences?.countries || []).length === 0 && (
                                    <div className="w-full py-8 text-center border-2 border-dashed border-gray-100 rounded-lg">
                                        <p className="text-xs md:text-sm text-gray-400 mb-2">No countries selected yet.</p>
                                        <button
                                            onClick={() => setShowFilterDropdown(true)}
                                            className="text-xs md:text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
                                        >
                                            Add a destination
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Overlay to close dropdown when clicking outside */}
                            {showFilterDropdown && (
                                <div className="fixed inset-0 z-10" onClick={() => setShowFilterDropdown(false)}></div>
                            )}
                        </div>

                        {/* Saved Items Component Box */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm h-full flex flex-col gap-4 md:gap-6">

                            <div className="flex flex-col gap-2 flex-1">
                                {/* Row 1: Saved Accommodation (Full Width) */}
                                <div
                                    onClick={() => navigate('/saved-accommodations')}
                                    className="flex-1 bg-gray-50 rounded-xl p-3 md:p-5 hover:bg-gray-100 transition-colors cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden gap-4"
                                >
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="size-10 md:size-16 rounded-xl bg-white text-orange-600 flex items-center justify-center shadow-sm shrink-0">
                                            <span className="material-symbols-outlined !text-[24px] md:!text-[40px]">home</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm md:text-lg leading-tight">Saved Accommodation</h4>
                                            <p className="text-xs text-gray-400 sm:hidden mt-0.5">View properties</p>
                                            <p className="text-xs text-gray-400 hidden sm:block mt-0.5">View saved properties</p>
                                        </div>
                                    </div>
                                    <div className="relative z-10 self-end sm:self-auto">
                                        <span className="font-bold text-gray-900 text-lg md:text-2xl">{savedAccommodations ? savedAccommodations.length : 0}</span>
                                    </div>
                                    <div className="absolute top-1/2 -translate-y-1/2 right-[-20px] opacity-5 group-hover:opacity-10 transition-opacity">
                                        <span className="material-symbols-outlined !text-[100px] md:!text-[140px] text-orange-600">home</span>
                                    </div>
                                </div>

                                {/* Saved Courses */}
                                <div
                                    onClick={() => navigate('/saved-courses')}
                                    className="flex-1 bg-gray-50 rounded-xl p-3 md:p-5 hover:bg-gray-100 transition-colors cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden gap-4"
                                >
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="size-10 md:size-16 rounded-xl bg-white text-purple-600 flex items-center justify-center shadow-sm shrink-0">
                                            <span className="material-symbols-outlined !text-[24px] md:!text-[40px]">book</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm md:text-lg leading-tight">Saved Courses</h4>
                                            <p className="text-xs text-gray-400 mt-0.5">View courses</p>
                                        </div>
                                    </div>
                                    <div className="relative z-10 self-end sm:self-auto">
                                        <span className="font-bold text-gray-900 text-lg md:text-2xl">{savedCourses.length}</span>
                                    </div>
                                    <div className="absolute top-1/2 -translate-y-1/2 right-[-20px] opacity-5 group-hover:opacity-10 transition-opacity">
                                        <span className="material-symbols-outlined !text-[100px] md:!text-[140px] text-purple-600">book</span>
                                    </div>
                                </div>

                                {/* Saved Colleges */}
                                <div
                                    onClick={() => navigate('/saved-colleges')}
                                    className="flex-1 bg-gray-50 rounded-xl p-3 md:p-5 hover:bg-gray-100 transition-colors cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden gap-4"
                                >
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="size-10 md:size-16 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm shrink-0">
                                            <span className="material-symbols-outlined !text-[24px] md:!text-[40px]">school</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm md:text-lg leading-tight">Saved Colleges</h4>
                                            <p className="text-xs text-gray-400 mt-0.5">View universities</p>
                                        </div>
                                    </div>
                                    <div className="relative z-10 self-end sm:self-auto">
                                        <span className="font-bold text-gray-900 text-lg md:text-2xl">{savedColleges.length}</span>
                                    </div>
                                    <div className="absolute top-1/2 -translate-y-1/2 right-[-20px] opacity-5 group-hover:opacity-10 transition-opacity">
                                        <span className="material-symbols-outlined !text-[100px] md:!text-[140px] text-blue-600">school</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomeDashboard;

