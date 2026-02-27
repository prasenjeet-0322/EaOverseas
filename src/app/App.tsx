import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import Blogs from './pages/Blogs';
import HomeDashboard from './pages/HomeDashboard';
import Courses from './pages/Courses';
import Feed from './pages/Feed';
import CommunityFeed from './pages/CommunityFeed';
import ApplicationDashboard from './pages/ApplicationDashboard';
import DocumentsDashboard from './pages/DocumentsDashboard';
import CollegeFinder from './pages/CollegeFinder';
import CollegeDetails from './pages/CollegeDetails';
import CourseDetails from './pages/CourseDetails';
import ApplicationLayout from './pages/application/ApplicationLayout';
import PersonalDetails from './pages/application/PersonalDetails';
import AcademicDetails from './pages/application/AcademicDetails';
import Documents from './pages/application/Documents';
import Payment from './pages/application/Payment';
import Review from './pages/application/Review';

import ApplicationSubmitted from './pages/application/ApplicationSubmitted';
import ApplicationStart from './pages/application/ApplicationStart';
import InitiateApplication from './pages/application/InitiateApplication';

import FeedDetails from './pages/FeedDetails';
import Accommodation from './pages/Accommodation';
import AccommodationDetails from './pages/AccommodationDetails';

import MyProfile from './pages/MyProfile';
import UserProfile from './pages/UserProfile';
import UniversityProfile from './pages/UniversityProfile';
import EditProfile from './pages/EditProfile';
import Consultant from './pages/Consultant';
import ConsultationWaitingRoom from './pages/ConsultationWaitingRoom';
import AccountSettings from './pages/AccountSettings';
import NotificationPreferences from './pages/NotificationPreferences';
import PrivacySecurity from './pages/PrivacySecurity';
import AcademicSnapshotDetails from './pages/AcademicSnapshotDetails';
import Referrals from './pages/Referrals';
import SavedColleges from './pages/SavedColleges';
import SavedCourses from './pages/SavedCourses';
import SavedAccommodations from './pages/SavedAccommodations';
import VisaPrep from './pages/VisaPrep';
import LoanRequirements from './pages/LoanRequirements';
import LoanEligibility from './pages/LoanEligibility';
import LoanDocuments from './pages/LoanDocuments';
import LenderSelection from './pages/LenderSelection';
import LoanApplicationTimeline from './pages/LoanApplicationTimeline';
import ConfirmAdmission from './pages/ConfirmAdmission';
import VisaDocumentUpload from './pages/VisaDocumentUpload';
import TestPrep from './pages/TestPrep';
import TestOverview from './pages/TestOverview';
import ListeningTest from './pages/ListeningTest';
import SpeakingTest from './pages/SpeakingTest';
import ReadingTestInstructions from './pages/ReadingTestInstructions';
import ReadingTest from './pages/ReadingTest';
import ReadingTestResult from './pages/ReadingTestResult';
import ReadingTestSubmitted from './pages/ReadingTestSubmitted';
import WritingTestInstructions from './pages/WritingTestInstructions';
import WritingTest from './pages/WritingTest';
import ConsultantDashboard from './pages/ConsultantDashboard';
import ConsultantLayout from './layouts/ConsultantLayout';

// Profile Pages
import ProfileLayout from './pages/profile/ProfileLayout';
import BasicInfo from './pages/profile/BasicInfo';
import Education from './pages/profile/Education';
import Goals from './pages/profile/Goals';
import ProfileCompleted from './pages/profile/ProfileCompleted';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Verification from './pages/Verification';
import UniversityVerification from './pages/UniversityVerification';
import UniversityPendingVerification from './pages/UniversityPendingVerification';

import { SavedItemsProvider } from './shared/contexts/SavedItemsContext';
import { UserProfileProvider } from './shared/contexts/UserProfileContext';
import { NotificationProvider } from './shared/contexts/NotificationContext';
import { useAuth } from './shared/contexts/AuthContext';

const HomeRoute = () => {
    const { user, loading } = useAuth();
    if (loading) return null; // Or a spinner
    // Redirect to Global Feed for logged-in users as requested
    return user ? <Navigate to="/feed" replace /> : <Navigate to="/feed" replace />;
};

function App() {
    return (
        <NotificationProvider>
            <SavedItemsProvider>
                <UserProfileProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/landing" element={<LandingPage />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/blogs" element={<Blogs />} />
                            <Route path="/" element={<MainLayout />}>
                                <Route index element={<HomeRoute />} />
                                <Route path="dashboard" element={<HomeDashboard />} />
                                <Route path="courses" element={<Courses />} />
                                <Route path="feed" element={<Feed />} />
                                <Route path="community-feed" element={<CommunityFeed />} />
                                <Route path="feed-details/:id" element={<FeedDetails />} /> {/* Feed Details Route */}
                                <Route path="colleges" element={<CollegeFinder />} />
                                <Route path="college-details" element={<CollegeDetails />} />
                                <Route path="course-details" element={<CourseDetails />} /> {/* Course Details Route */}

                                <Route path="test-prep" element={<TestPrep />} />
                                <Route path="test-prep/overview" element={<TestOverview />} />
                                <Route path="accommodation" element={<Accommodation />} />
                                <Route path="accommodation-details" element={<AccommodationDetails />} />
                                <Route path="applications" element={<ApplicationDashboard />} />
                                <Route path="documents" element={<DocumentsDashboard />} />
                                <Route path="profile" element={<MyProfile />} />
                                <Route path="profile/edit" element={<EditProfile />} />
                                <Route path="account-settings" element={<AccountSettings />} />
                                <Route path="notification-preferences" element={<NotificationPreferences />} />
                                <Route path="privacy-security" element={<PrivacySecurity />} />
                                <Route path="profile/academic-snapshot" element={<AcademicSnapshotDetails />} />
                                <Route path="referrals" element={<Referrals />} />
                                <Route path="saved-colleges" element={<SavedColleges />} />
                                <Route path="saved-courses" element={<SavedCourses />} />
                                <Route path="saved-accommodations" element={<SavedAccommodations />} />
                                <Route path="profile/:username" element={<UserProfile />} />
                                <Route path="institution/:name" element={<UniversityProfile />} />
                                <Route path="consultant" element={<Consultant />} />
                                <Route path="consultation-waiting-room" element={<ConsultationWaitingRoom />} />
                                <Route path="visas" element={<VisaPrep />} />
                                <Route path="loans" element={<LoanRequirements />} />
                                <Route path="loan-eligibility" element={<LoanEligibility />} />
                                <Route path="loan-documents" element={<LoanDocuments />} />
                                <Route path="lender-selection" element={<LenderSelection />} />
                                <Route path="loan-application-timeline" element={<LoanApplicationTimeline />} />
                                <Route path="/visa-application/confirm" element={<ConfirmAdmission />} />
                                <Route path="/visa-application/documents" element={<VisaDocumentUpload />} />
                                <Route path="test-prep/reading-instructions" element={<ReadingTestInstructions />} />
                                <Route path="test-prep/reading/submitted" element={<ReadingTestSubmitted />} />
                                <Route path="test-prep/writing-instructions" element={<WritingTestInstructions />} />
                                <Route path="test-prep/writing" element={<WritingTest />} />
                            </Route>

                            {/* Test Prep Routes (Standalone - No Layout) */}
                            <Route path="/test-prep/listening" element={<ListeningTest />} />
                            <Route path="/test-prep/reading" element={<ReadingTest />} />
                            <Route path="/test-prep/reading/result" element={<ReadingTestResult />} />
                            <Route path="/test-prep/speaking" element={<SpeakingTest />} />

                            {/* Profile Wizard Routes */}
                            <Route path="/profile-setup" element={<ProfileLayout />}>
                                <Route index element={<Navigate to="basic" replace />} />
                                <Route path="basic" element={<BasicInfo />} />
                                <Route path="education" element={<Education />} />
                                <Route path="goals" element={<Goals />} />
                                <Route path="completed" element={<ProfileCompleted />} />
                            </Route>

                            {/* Application Layout Routes */}
                            <Route path="/application" element={<ApplicationLayout />}>
                                <Route index element={<Navigate to="details" replace />} />
                                <Route path="details" element={<PersonalDetails />} />
                                <Route path="academic" element={<AcademicDetails />} />
                                <Route path="documents" element={<Documents />} />
                                <Route path="payment" element={<Payment />} />
                                <Route path="review" element={<Review />} />
                            </Route>

                            <Route path="/application/start" element={<ApplicationStart />} />
                            <Route path="/application/initiate" element={<InitiateApplication />} />
                            <Route path="/application/submitted" element={<ApplicationSubmitted />} />

                            {/* Consultant Routes */}
                            <Route element={<ConsultantLayout />}>
                                <Route path="/counsellor-dashboard" element={<ConsultantDashboard />} />
                            </Route>

                            {/* Auth Routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/verification" element={<Verification />} />
                            <Route path="/university-verification" element={<UniversityVerification />} />
                            <Route path="/university-pending-verification" element={<UniversityPendingVerification />} />
                        </Routes>
                    </BrowserRouter>
                </UserProfileProvider>
            </SavedItemsProvider>
        </NotificationProvider>
    );
}

export default App;
