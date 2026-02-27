import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSettings, updateSettings } from '../services/settingsService';

const NotificationPreferences = () => {
    // State for toggles
    const [loading, setLoading] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [inAppAlerts, setInAppAlerts] = useState(true);
    const [uniStatusUpdates, setUniStatusUpdates] = useState(true);
    const [docVerification, setDocVerification] = useState(true);
    const [visaReminders, setVisaReminders] = useState(true);
    const [loanAlerts, setLoanAlerts] = useState(true);
    const [newUniRecs, setNewUniRecs] = useState(false);
    const [scholarshipOps, setScholarshipOps] = useState(true);

    // Mute State
    const [mutedGroups, setMutedGroups] = useState<string[]>([]);
    const [mutedUsers, setMutedUsers] = useState<string[]>([]);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const settings = await getSettings();
                if (settings) {
                    // Map backend settings to local state
                    if (settings.notifications) {
                        setEmailNotifications(settings.notifications.email);
                        setInAppAlerts(settings.notifications.push);
                    }
                    if (settings.mutedGroups) setMutedGroups(settings.mutedGroups);
                    if (settings.mutedUsers) setMutedUsers(settings.mutedUsers);
                }
            } catch (error) {
                console.error("Failed to load settings", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);


    const handleSave = async () => {
        try {
            await updateSettings({
                notifications: {
                    email: emailNotifications,
                    push: inAppAlerts
                },
                mutedGroups,
                mutedUsers
            });
            alert('Settings saved successfully');
        } catch (error) {
            alert('Failed to save settings');
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc] relative">
            <div className="flex-1 overflow-y-auto p-3 md:p-8 flex justify-center">
                <div className="w-full max-w-4xl space-y-6 pb-12">
                    {/* Page Heading */}
                    <div className="flex flex-col gap-2 mb-4 md:mb-8">
                        <h2 className="text-[#111418] text-xl md:text-3xl font-bold tracking-tight">Notification Preferences</h2>
                        <p className="text-slate-500 text-xs md:text-base max-w-2xl">Manage how and when EAOverseas communicates with you. We recommend keeping critical alerts on for your application timeline.</p>
                    </div>

                    {/* Main Settings Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

                        {/* Section 1: Channels */}
                        <div className="p-4 md:p-6 border-b border-slate-100">
                            <h3 className="text-base md:text-lg font-semibold text-[#111418] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400">campaign</span>
                                Communication Channels
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <label className="flex items-center gap-3 p-3 md:p-4 rounded-lg border border-slate-200 hover:border-blue-600/50 hover:bg-slate-50 transition-all cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={emailNotifications}
                                        onChange={(e) => setEmailNotifications(e.target.checked)}
                                        className="size-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600/20 focus:border-blue-600 accent-blue-600"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-[#111418]">Email Notifications</span>
                                        <span className="text-[10px] md:text-xs text-slate-500">Sent to alex.student@university.edu</span>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 md:p-4 rounded-lg border border-slate-200 hover:border-blue-600/50 hover:bg-slate-50 transition-all cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={inAppAlerts}
                                        onChange={(e) => setInAppAlerts(e.target.checked)}
                                        className="size-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600/20 focus:border-blue-600 accent-blue-600"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-[#111418]">In-App Alerts</span>
                                        <span className="text-[10px] md:text-xs text-slate-500">Dashboard & browser push</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Section 2: Detailed Toggles */}
                        <div className="p-4 md:p-6">
                            <h3 className="text-base md:text-lg font-semibold text-[#111418] mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400">tune</span>
                                Alert Categories
                            </h3>
                            <div className="space-y-8">
                                {/* Group 1: Applications */}
                                <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_auto] gap-4 md:gap-8 items-start">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-[#111418]">Application Activity</span>
                                        <span className="text-[10px] md:text-sm text-slate-500">Updates regarding your university applications.</span>
                                    </div>
                                    <div className="col-span-1 md:col-span-2 space-y-4">
                                        {/* Toggle Item */}
                                        <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-[#111418]">University Status Updates</span>
                                                <span className="text-[10px] md:text-xs text-slate-500">Admissions decisions and interview invites.</span>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={uniStatusUpdates} onChange={(e) => setUniStatusUpdates(e.target.checked)} className="sr-only peer" />
                                                <div className="w-9 h-5 md:w-11 md:h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-600/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        {/* Toggle Item */}
                                        <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-[#111418]">Document Verification</span>
                                                <span className="text-[10px] md:text-xs text-slate-500">Results of transcript and ID checks.</span>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={docVerification} onChange={(e) => setDocVerification(e.target.checked)} className="sr-only peer" />
                                                <div className="w-9 h-5 md:w-11 md:h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-600/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-slate-100" />

                                {/* Group 2: Compliance */}
                                <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_auto] gap-4 md:gap-8 items-start">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-[#111418]">Deadlines & Compliance</span>
                                        <span className="text-[10px] md:text-sm text-slate-500">Critical reminders for your journey.</span>
                                    </div>
                                    <div className="col-span-1 md:col-span-2 space-y-4">
                                        {/* Toggle Item (Critical) */}
                                        <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-[#111418]">Visa Application Reminders</span>
                                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">Critical</span>
                                                </div>
                                                <span className="text-[10px] md:text-xs text-slate-500">Embassy appointments and document expiration.</span>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={true} disabled className="sr-only peer" />
                                                <div className="w-9 h-5 md:w-11 md:h-6 bg-blue-600/20 cursor-not-allowed peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-blue-600 opacity-60"></div>
                                            </label>
                                        </div>
                                        {/* Toggle Item */}
                                        <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-[#111418]">Loan Disbursement Alerts</span>
                                                <span className="text-[10px] md:text-xs text-slate-500">Updates on your financial aid status.</span>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={loanAlerts} onChange={(e) => setLoanAlerts(e.target.checked)} className="sr-only peer" />
                                                <div className="w-9 h-5 md:w-11 md:h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-600/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-slate-100" />

                                {/* Group 3: AI Insights */}
                                <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_auto] gap-4 md:gap-8 items-start">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-[#111418]">AI & Discovery</span>
                                        <span className="text-[10px] md:text-sm text-slate-500">Personalized suggestions from our AI.</span>
                                    </div>
                                    <div className="col-span-1 md:col-span-2 space-y-4">
                                        {/* Toggle Item */}
                                        <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-[#111418]">New University Recommendations</span>
                                                <span className="text-[10px] md:text-xs text-slate-500">When the AI finds a new match for your profile.</span>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={newUniRecs} onChange={(e) => setNewUniRecs(e.target.checked)} className="sr-only peer" />
                                                <div className="w-9 h-5 md:w-11 md:h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-600/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        {/* Toggle Item */}
                                        <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-[#111418]">Scholarship Opportunities</span>
                                                <span className="text-[10px] md:text-xs text-slate-500">Alerts for grants you are eligible for.</span>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={scholarshipOps} onChange={(e) => setScholarshipOps(e.target.checked)} className="sr-only peer" />
                                                <div className="w-9 h-5 md:w-11 md:h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-600/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Muted Channels */}
                        <div className="p-4 md:p-6 border-t border-slate-100">
                            <h3 className="text-base md:text-lg font-semibold text-[#111418] mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400">moff</span>
                                Muted Channels
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-[#111418] mb-2">Muted Groups</h4>
                                    {mutedGroups.length === 0 ? (
                                        <p className="text-xs text-slate-500 italic">No muted groups.</p>
                                    ) : (
                                        <ul className="space-y-2">
                                            {mutedGroups.map(group => (
                                                <li key={group} className="flex justify-between items-center text-sm bg-slate-50 p-2 rounded">
                                                    <span>{group}</span>
                                                    <button onClick={() => setMutedGroups(mutedGroups.filter(g => g !== group))} className="text-red-500 text-xs">Unmute</button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-[#111418] mb-2">Muted Users</h4>
                                    {mutedUsers.length === 0 ? (
                                        <p className="text-xs text-slate-500 italic">No muted users.</p>
                                    ) : (
                                        <ul className="space-y-2">
                                            {mutedUsers.map(user => (
                                                <li key={user} className="flex justify-between items-center text-sm bg-slate-50 p-2 rounded">
                                                    <span>{user}</span>
                                                    <button onClick={() => setMutedUsers(mutedUsers.filter(u => u !== user))} className="text-red-500 text-xs">Unmute</button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                            <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 transition-colors">
                                Reset to Default
                            </button>
                            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-sm shadow-blue-200 transition-colors">
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>

                    {/* Helper Text */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                        <span className="material-symbols-outlined text-blue-600 mt-0.5 text-[20px]">info</span>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-slate-800">Note on critical alerts</p>
                            <p className="text-xs md:text-sm text-slate-600">Some notifications related to government compliance and visa deadlines cannot be disabled to ensure you don't miss legally required steps.</p>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default NotificationPreferences;
