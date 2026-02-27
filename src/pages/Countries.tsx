import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const Countries = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const destinations = [
        {
            name: 'United States',
            code: 'US',
            flag: '🇺🇸',
            tag: 'Top Tier',
            tagColor: 'bg-green-100 text-green-700',
            subtitle: 'Ivy League Excellence & Innovation',
            icon: 'school'
        },
        {
            name: 'United Kingdom',
            code: 'GB',
            flag: '🇬🇧',
            tag: 'High ROI',
            tagColor: 'bg-blue-100 text-blue-700',
            subtitle: 'Historic Prestige & Global Hub',
            icon: 'history_edu'
        },
        {
            name: 'Canada',
            code: 'CA',
            flag: '🇨🇦',
            tag: 'Permanent Residency',
            tagColor: 'bg-red-100 text-red-700',
            subtitle: 'Diverse Culture & Work Rights',
            icon: 'work'
        },
        {
            name: 'Australia',
            code: 'AU',
            flag: '🇦🇺',
            tag: 'Lifestyle',
            tagColor: 'bg-indigo-100 text-indigo-700',
            subtitle: 'Sun, Sand & World-Class Research',
            icon: 'sunny'
        },
        {
            name: 'Germany',
            code: 'DE',
            flag: '🇩🇪',
            tag: 'No Tuition',
            tagColor: 'bg-orange-100 text-orange-700',
            subtitle: 'Engineering Hub of Europe',
            icon: 'engineering'
        },
        {
            name: 'Ireland',
            code: 'IE',
            flag: '🇮🇪',
            tag: 'Tech Hub',
            tagColor: 'bg-purple-100 text-purple-700',
            subtitle: 'Silicon Valley of Europe',
            icon: 'settings_ethernet'
        },
        {
            name: 'France',
            code: 'FR',
            flag: '🇫🇷',
            tag: 'Culture',
            tagColor: 'bg-pink-100 text-pink-700',
            subtitle: 'Art, Fashion & Culinary Capital',
            icon: 'brush'
        },
        {
            name: 'New Zealand',
            code: 'NZ',
            flag: '🇳🇿',
            tag: 'Adventure',
            tagColor: 'bg-teal-100 text-teal-700',
            subtitle: 'Innovation & Natural Beauty',
            icon: 'landscape'
        },
        {
            name: 'Japan',
            code: 'JP',
            flag: '🇯🇵',
            tag: 'Technology',
            tagColor: 'bg-red-50 text-red-600',
            subtitle: 'Tradition Meets Innovation',
            icon: 'precision_manufacturing'
        },
        {
            name: 'Singapore',
            code: 'SG',
            flag: '🇸🇬',
            tag: 'Global Hub',
            tagColor: 'bg-cyan-100 text-cyan-700',
            subtitle: 'Gateway to Asia & Finance',
            icon: 'apartment'
        },
        {
            name: 'Netherlands',
            code: 'NL',
            flag: '🇳🇱',
            tag: 'Sustainability',
            tagColor: 'bg-amber-100 text-amber-700',
            subtitle: 'English-Taught & Open Minded',
            icon: 'wind_power'
        },
        {
            name: 'Sweden',
            code: 'SE',
            flag: '🇸🇪',
            tag: 'Innovation',
            tagColor: 'bg-blue-50 text-blue-600',
            subtitle: 'Sustainability & Creativity',
            icon: 'lightbulb'
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-[#111418] overflow-x-hidden">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section with Abstract Map */}
                <div className="relative w-full bg-[#f4f8ff] overflow-hidden py-12 md:py-20 px-4 md:px-20 lg:px-40">
                    {/* Abstract Map Background Decoration */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" data-location="world">
                        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
                            <circle className="map-pin text-[#2463eb] animate-[float_3s_ease-in-out_infinite]" cx="200" cy="150" fill="currentColor" r="2" style={{ animationDelay: '0s' }}></circle>
                            <circle className="map-pin text-[#2463eb] animate-[float_3s_ease-in-out_infinite]" cx="450" cy="280" fill="currentColor" r="2" style={{ animationDelay: '0.5s' }}></circle>
                            <circle className="map-pin text-[#2463eb] animate-[float_3s_ease-in-out_infinite]" cx="700" cy="120" fill="currentColor" r="2" style={{ animationDelay: '1.2s' }}></circle>
                            <circle className="map-pin text-[#2463eb] animate-[float_3s_ease-in-out_infinite]" cx="850" cy="350" fill="currentColor" r="2" style={{ animationDelay: '0.8s' }}></circle>
                            <path className="text-[#2463eb]/30" d="M150 100 Q 300 50 450 150 T 800 100" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                            <path className="text-[#2463eb]/30" d="M100 300 Q 400 350 700 250 T 900 400" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                        </svg>
                    </div>
                    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
                        <span className="px-4 py-1.5 rounded-full bg-[#2463eb]/10 text-[#2463eb] text-xs font-bold uppercase tracking-widest mb-4 md:mb-6">Discover the World</span>
                        <h1 className="text-3xl md:text-6xl font-black leading-tight tracking-[-0.033em] mb-4 md:mb-6 text-[#111218]">
                            Choose Your <span className="text-[#2463eb]">Study Destination</span>
                        </h1>
                        <p className="text-sm md:text-lg text-slate-600 mb-6 md:mb-10 max-w-2xl">
                            AI-powered insights to help you find your perfect academic home. Compare tuition, lifestyle, and career outcomes in one place.
                        </p>
                    </div>
                </div>

                {/* Grey Background Section */}
                <div className="w-full bg-[#f8f9fc] pb-20 pt-6 md:pt-10">
                    {/* Showcase Grid */}
                    <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-10">
                        <div className="mb-8 md:mb-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111218]">Popular Study Destinations</h2>
                                {/* Desktop Button */}
                                <button
                                    onClick={() => navigate('/all-destinations')}
                                    className="hidden md:flex bg-white text-[#2463eb] px-6 py-3 rounded-full font-bold text-base items-center gap-2 shadow-sm hover:shadow-md hover:gap-3 transition-all"
                                >
                                    View more countries <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                </button>
                            </div>
                            <p className="text-slate-500 max-w-lg mb-6 md:mb-0">Handpicked locations with high student satisfaction and globally recognized credentials.</p>

                            {/* Mobile Button - Below Text */}
                            <button
                                onClick={() => navigate('/all-destinations')}
                                className="md:hidden w-full bg-white text-[#2463eb] px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm border border-slate-100"
                            >
                                View more countries <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {destinations.map((dest, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/country/${dest.code}`)}
                                    className="group relative bg-white rounded-[1.5rem] md:rounded-[2rem] border border-blue-100 p-5 md:p-8 hover:shadow-[0_0_20px_rgba(36,99,235,0.1)] hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden min-h-[220px] md:min-h-[280px] flex flex-col justify-between"
                                >
                                    {/* Flowing Lines Background */}
                                    <div className="absolute inset-0 opacity-10 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <svg className="w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                                </filter>
                                            </defs>
                                            <path d="M0,100 C100,150 200,50 400,100" fill="none" stroke="#2463eb" strokeWidth="2" opacity="0.4" filter="url(#glow)" />
                                            <path d="M0,200 C150,250 250,150 400,200" fill="none" stroke="#2463eb" strokeWidth="2" opacity="0.2" filter="url(#glow)" />
                                        </svg>
                                    </div>

                                    <div className="relative z-10 flex flex-col items-start text-left">
                                        <div className="size-12 md:size-16 rounded-2xl bg-white flex items-center justify-center mb-4 md:mb-6 shadow-sm border border-slate-100 overflow-hidden">
                                            <img
                                                src={`https://flagcdn.com/w160/${dest.code.toLowerCase()}.png`}
                                                alt={`${dest.name} flag`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-[#111218] mb-2 md:mb-3 tracking-tight">{dest.name}</h3>
                                        <p className="font-medium text-slate-500 text-xs md:text-sm leading-relaxed max-w-[90%]">{dest.subtitle}</p>
                                    </div>

                                    {/* View Insights - Visible on Mobile, Hover on Desktop */}
                                    <div className="relative z-10 mt-2 md:mt-6 flex items-center gap-1 md:gap-2 text-[#2463eb] font-bold text-[10px] md:text-sm opacity-100 translate-x-0 md:opacity-0 md:-translate-x-2 group-hover:md:opacity-100 group-hover:md:translate-x-0 transition-all duration-300">
                                        View Insights <span className="material-symbols-outlined text-sm md:text-lg">arrow_forward</span>
                                    </div>

                                    {/* Watermark Icon */}
                                    <div className="absolute -right-4 -bottom-4 md:-right-6 md:-bottom-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
                                        <span className="material-symbols-outlined !text-[100px] md:!text-[140px]">{dest.icon}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Countries;
