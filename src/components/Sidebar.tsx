import { useState } from 'react';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Sidebar = ({ isOpen, onClose, user }) => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const currentPath = location.pathname;
    const isCourseApp = searchParams.get('title');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const navigate = useNavigate();
    // User is passed as prop now


    const navItems = [
        { name: 'Global Feed', icon: 'public', path: '/feed' },
        { name: 'Community Feed', icon: 'forum', path: '/community-feed' },
        { name: 'Universities', icon: 'school', path: '/colleges' },
        { name: 'Courses', icon: 'book', path: '/courses' },
        { name: 'Home Dashboard', icon: 'dashboard', path: '/dashboard' },
        { name: 'Test Prep', icon: 'quiz', path: '/test-prep' },
        { name: 'Accommodation', icon: 'home_work', path: '/accommodation' },
        { name: 'Loans', icon: 'attach_money', path: '/loans' },
        { name: 'Visas', icon: 'airplane_ticket', path: '/visas' },
        { name: 'Counsellor', icon: 'support_agent', path: '/consultant' },
        { name: 'Profile', icon: 'person', path: '/profile' },
    ];

    return (
        <>
            {/* Mobile Overlay Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>
            )}

            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50
                    w-64 flex-col h-full bg-white shrink-0 lg:flex
                    transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="px-6 py-5 flex items-center justify-between">
                    <img src={logo} alt="EAOverseas" className="h-10 w-auto object-contain" />
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <nav className="flex flex-col gap-1 px-3 mt-2 flex-1 overflow-y-auto">
                    {navItems.map((item) => {
                        let isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));

                        // Hide protected items for guests (optional, keeping visible but actionable via auth guard is better per user request)
                        // But Dashboard is special - user specifically said "pages like global feed... will visible first"
                        // I will hide 'Home Dashboard' for guests and redirect '/' to feed later.
                        if (!user && item.path === '/') return null;
                        if (!user && item.path === '/profile') return null;
                        if (!user && (
                            item.path === '/loans' ||
                            item.path === '/visas' ||
                            item.path === '/consultant'
                        )) return null;

                        // Keep Global Feed active when viewing an institution profile
                        if (item.path === '/feed' && currentPath.startsWith('/institution/')) isActive = true;

                        // Special case overrides
                        if (item.path === '/courses' && (currentPath.includes('/course-details') || (currentPath.includes('/application/') && isCourseApp))) isActive = true;
                        if (item.path === '/colleges' && (currentPath.includes('/college-details') || (currentPath.includes('/application/') && !isCourseApp))) isActive = true;
                        if (item.path === '/' && (currentPath.includes('/documents') || currentPath.includes('/applications')) && !currentPath.includes('/visa-application')) isActive = true;
                        if (item.path === '/profile' && (currentPath.includes('/account-settings') || currentPath.includes('/notification-preferences') || currentPath.includes('/privacy-security') || currentPath.includes('/referrals') || currentPath.includes('/saved-colleges') || currentPath.includes('/saved-courses'))) isActive = true;
                        // Prevent Profile tab from being active for public profiles
                        if (item.path === '/profile' && currentPath.startsWith('/profile/') && currentPath !== '/profile/edit' && !currentPath.includes('academic-snapshot')) isActive = false;
                        // Keep Community Feed active when viewing a public profile (e.g. /profile/Sarah_Student)
                        if (item.path === '/community-feed' && currentPath.startsWith('/profile/') && currentPath !== '/profile' && currentPath !== '/profile/edit' && !currentPath.includes('academic-snapshot')) isActive = true;
                        // Keep Consultant active for waiting room
                        if (item.path === '/consultant' && currentPath === '/consultation-waiting-room') isActive = true;
                        if (item.path === '/visas' && currentPath.includes('/visa-application')) isActive = true;
                        // Keep Loans active for sub-pages
                        if (item.path === '/loans' && (currentPath.includes('/loan-') || currentPath.includes('/lender-selection'))) isActive = true;

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => {
                                    if (window.innerWidth < 1024) onClose();
                                }}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-600 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                                    }`}
                            >
                                <span className={`material-symbols-outlined ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                    {item.icon}
                                </span>
                                <span className="text-sm">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-gray-500">settings</span>
                                    <span className="text-sm font-medium text-gray-700">Settings</span>
                                </div>
                                <span className={`material-symbols-outlined text-gray-400 text-[20px] transition-transform duration-300 ${isSettingsOpen ? 'rotate-180' : ''}`}>expand_less</span>
                            </button>

                            {/* Settings Dropup Menu */}
                            <div className={`absolute bottom-full left-0 mb-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 transform origin-bottom border-gray-100 ${isSettingsOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}`}>
                                <div className="p-1">

                                    <button
                                        onClick={() => navigate('/notification-preferences')}
                                        className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors flex items-center gap-3"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">notifications</span>
                                        Notification Preferences
                                    </button>
                                    <button
                                        onClick={() => navigate('/privacy-security')}
                                        className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors flex items-center gap-3"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">security</span>
                                        Privacy & Security
                                    </button>
                                    <div className="h-px bg-gray-100 my-1 hidden lg:block"></div>
                                    <button
                                        onClick={() => {
                                            // Trigger auth action if needed, but for now strict redirect as requested
                                            // In a real app we'd clear auth tokens here
                                            // executeAction(() => logout()) 
                                            navigate('/login'); // Redirect to login page as requested
                                            window.location.reload(); // Optional: Ensure state is cleared
                                        }}
                                        className="w-full text-left px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors items-center gap-3 hidden lg:flex">
                                        <span className="material-symbols-outlined text-[18px]">logout</span>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                        </div>
                    )}
                    {/* Mobile Sign Out Button - Outside Dropdown */}
                    {user && (
                        <button
                            onClick={() => {
                                navigate('/login');
                                window.location.reload();
                            }}
                            className="w-full flex lg:hidden items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 font-medium transition-colors mt-1"
                        >
                            <span className="material-symbols-outlined text-gray-500">logout</span>
                            <span className="text-sm font-medium">Sign Out</span>
                        </button>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
