import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import SuperAdminProfile from "./pages/superadmin/SuperAdminProfile";
import SuperAdminAddIAIUser from "./pages/superadmin/SuperAdminAddIAIUser";
import SuperAdminClientEscalation from "./pages/superadmin/SuperAdminClientEscalation";
import SuperAdminPassword from "./pages/superadmin/SuperAdminPassword";
import SuperAdminPasswordManager from "./pages/superadmin/SuperAdminPasswordManager";
import SuperAdminNotifications from "./pages/superadmin/SuperAdminNotifications";
import SuperAdminPrimarySkills from "./pages/superadmin/SuperAdminPrimarySkills";
import SuperAdminSecondarySkills from "./pages/superadmin/SuperAdminSecondarySkills";
import SuperAdminInterviews from "./pages/superadmin/SuperAdminInterviews";
import SuperAdminEditRating from "./pages/superadmin/SuperAdminEditRating";
import SuperAdminRegisteredCandidates from "./pages/superadmin/SuperAdminRegisteredCandidates";
import SuperAdminInterviewerSchedules from "./pages/superadmin/SuperAdminInterviewerSchedules";
import SuperAdminRegisteredInterviewers from "./pages/superadmin/SuperAdminRegisteredInterviewers";
import SuperAdminCity from "./pages/superadmin/SuperAdminCity";
import SuperAdminTodaysFollowups from "./pages/superadmin/SuperAdminTodaysFollowups";
import SuperAdminAddProfiles from "./pages/superadmin/SuperAdminAddProfiles";
import SuperAdminAllProfiles from "./pages/superadmin/SuperAdminAllProfiles";
import SuperAdminPostJob from "./pages/superadmin/SuperAdminPostJob";
import SuperAdminInterviewProcess from "./pages/superadmin/SuperAdminInterviewProcess";
import SuperAdminCompanyOnBoard from "./pages/superadmin/SuperAdminCompanyOnBoard";
import SuperAdminProfilesDashboard from "./pages/superadmin/SuperAdminProfilesDashboard";
import SuperAdminReleaseCandidates from "./pages/superadmin/SuperAdminReleaseCandidates";
import AnternClientLayout from "./layouts/AnternClientLayout";
import AnternClientDashboard from "./pages/antern-client/AnternClientDashboard";
import AnternClientProfile from "./pages/antern-client/AnternClientProfile";
import AnternClientPassword from "./pages/antern-client/AnternClientPassword";
import AnternClientAllPostings from "./pages/antern-client/AnternClientAllPostings";
import AnternClientCompanyPanels from "./pages/antern-client/AnternClientCompanyPanels";
import AnternClientDepartments from "./pages/antern-client/AnternClientDepartments";
import AnternClientDesignations from "./pages/antern-client/AnternClientDesignations";
import AnternClientSubUsers from "./pages/antern-client/AnternClientSubUsers";
import AnternClientVendors from "./pages/antern-client/AnternClientVendors";
import AnternClientAllProfiles from "./pages/antern-client/AnternClientAllProfiles";
import AnternClientDomain from "./pages/antern-client/AnternClientDomain";

import AnternRecruiterLayout from "./layouts/AnternRecruiterLayout";
import AnternRecruiterDashboard from "./pages/antern-recruiter/AnternRecruiterDashboard";
import AnternRecruiterAllPostings from "./pages/antern-recruiter/AnternRecruiterAllPostings";
import AnternRecruiterPostJob from "./pages/antern-recruiter/AnternRecruiterPostJob";
import AnternRecruiterCompanyPanels from "./pages/antern-recruiter/AnternRecruiterCompanyPanels";
import AnternRecruiterDesignation from "./pages/antern-recruiter/AnternRecruiterDesignation";
import AnternRecruiterAllProfiles from "./pages/antern-recruiter/AnternRecruiterAllProfiles";
import AnternRecruiterPostingProfiles from "./pages/antern-recruiter/AnternRecruiterPostingProfiles";
import AnternRecruiterDomain from "./pages/antern-recruiter/AnternRecruiterDomain";
import AnternRecruiterInterviewProcess from "./pages/antern-recruiter/AnternRecruiterInterviewProcess";
import CandidateGrid from "./pages/shared/CandidateGrid";

import CandidateLayout from "./layouts/CandidateLayout";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import CandidateProfile from "./pages/candidate/CandidateProfile";
import CandidateScheduleInterview from "./pages/candidate/CandidateScheduleInterview";
import CandidateApplyJobs from "./pages/candidate/CandidateApplyJobs";
import CandidateViewedProfiles from "./pages/candidate/CandidateViewedProfiles";
import CandidateInterviewTips from "./pages/candidate/CandidateInterviewTips";

import InterviewerLayout from "./layouts/InterviewerLayout";
import InterviewerDashboard from "./pages/interviewer/InterviewerDashboard";
import InterviewerProfile from "./pages/interviewer/InterviewerProfile";
import InterviewerPersonalInfo from "./pages/interviewer/InterviewerPersonalInfo";
import InterviewerSchedule from "./pages/interviewer/InterviewerSchedule";
import InterviewerPickupSchedule from "./pages/interviewer/InterviewerPickupSchedule";

import VendorLayout from "./layouts/VendorLayout";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorAllPostings from "./pages/vendor/VendorAllPostings";
import VendorAllProfiles from "./pages/vendor/VendorAllProfiles";
import VendorUsers from "./pages/vendor/VendorUsers";

import VendorRecruiterLayout from "./layouts/VendorRecruiterLayout";
import VendorRecruiterDashboard from "./pages/vendor-recruiter/VendorRecruiterDashboard";
import VendorRecruiterAllProfiles from "./pages/vendor-recruiter/VendorRecruiterAllProfiles";
import VendorRecruiterAllPostings from "./pages/vendor-recruiter/VendorRecruiterAllPostings";

export default function App() {
  return (
    <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/dashboard/superadmin" element={<SuperAdminLayout />}>
            <Route index element={<SuperAdminDashboard />} />
            <Route path="profile" element={<SuperAdminProfile />} />
            <Route path="add-iai-user" element={<SuperAdminAddIAIUser />} />
            <Route path="escalation" element={<SuperAdminClientEscalation />} />
            <Route path="password" element={<SuperAdminPasswordManager />} />
            <Route path="change-password" element={<SuperAdminPassword />} />
            <Route path="notifications" element={<SuperAdminNotifications />} />
            <Route path="skills/primary" element={<SuperAdminPrimarySkills />} />
            <Route path="skills/secondary" element={<SuperAdminSecondarySkills />} />
            <Route path="interviews" element={<SuperAdminInterviews />} />
            <Route path="interviews/rating" element={<SuperAdminEditRating />} />
            <Route path="candidate/registered" element={<SuperAdminRegisteredCandidates />} />
            <Route path="interviewer/schedules" element={<SuperAdminInterviewerSchedules />} />
            <Route path="interviewer/registered" element={<SuperAdminRegisteredInterviewers />} />
            <Route path="city" element={<SuperAdminCity />} />
            <Route path="follow-ups" element={<SuperAdminTodaysFollowups />} />
            <Route path="company/add" element={<SuperAdminAddProfiles />} />
            <Route path="company/all" element={<SuperAdminAllProfiles />} />
            <Route path="company/post" element={<SuperAdminPostJob />} />
            <Route path="company/interview-process" element={<SuperAdminInterviewProcess />} />
            <Route path="company/onboard" element={<SuperAdminCompanyOnBoard />} />
            <Route path="company/profiles" element={<SuperAdminProfilesDashboard />} />
            <Route path="company/release" element={<SuperAdminReleaseCandidates />} />
            <Route path="candidates/:type" element={<CandidateGrid />} />
            {/* Catch-all for other admin routes currently */}
            <Route path="*" element={<div className="p-8 text-center text-muted-foreground"><h2 className="text-2xl font-bold mb-2">Coming Soon</h2><p>This admin page is under construction.</p></div>} />
          </Route>

          {/* Client Routes */}
          <Route path="/dashboard/antern-client" element={<AnternClientLayout />}>
            <Route index element={<AnternClientDashboard />} />
            <Route path="profile" element={<AnternClientProfile />} />
            <Route path="change-password" element={<AnternClientPassword />} />
            <Route path="postings" element={<AnternClientAllPostings />} />
            <Route path="company-panels" element={<AnternClientCompanyPanels />} />
            <Route path="department" element={<AnternClientDepartments />} />
            <Route path="designation" element={<AnternClientDesignations />} />
            <Route path="sub-users" element={<AnternClientSubUsers />} />
            <Route path="vendor" element={<AnternClientVendors />} />
            <Route path="all-profiles" element={<AnternClientAllProfiles />} />
            <Route path="domain" element={<AnternClientDomain />} />
            {/* Catch-all for other client routes currently */}
            <Route path="*" element={<div className="p-8 text-center text-muted-foreground"><h2 className="text-2xl font-bold mb-2">Coming Soon</h2><p>This client page is under construction.</p></div>} />
          </Route>

          {/* Recruiter Routes */}
          <Route path="/dashboard/antern-recruiter" element={<AnternRecruiterLayout />}>
            <Route index element={<AnternRecruiterDashboard />} />
            <Route path="postings" element={<AnternRecruiterAllPostings />} />
            <Route path="postings/:id/profiles" element={<AnternRecruiterPostingProfiles />} />
            <Route path="post-job" element={<AnternRecruiterPostJob />} />
            <Route path="company-panels" element={<AnternRecruiterCompanyPanels />} />
            <Route path="designation" element={<AnternRecruiterDesignation />} />
            <Route path="all-profiles" element={<AnternRecruiterAllProfiles />} />
            <Route path="domain" element={<AnternRecruiterDomain />} />
            <Route path="interview-process" element={<AnternRecruiterInterviewProcess />} />
            <Route path="postings/:id/candidates/:type" element={<CandidateGrid />} />
            <Route path="*" element={<div className="p-8 text-center text-muted-foreground"><h2 className="text-2xl font-bold mb-2">Coming Soon</h2><p>This recruiter page is under construction.</p></div>} />
          </Route>

          {/* Candidate Routes */}
          <Route path="/dashboard/candidate" element={<CandidateLayout />}>
            <Route index element={<CandidateDashboard />} />
            <Route path="profile" element={<CandidateProfile />} />
            <Route path="schedule" element={<CandidateScheduleInterview />} />
            <Route path="apply" element={<CandidateApplyJobs />} />
            <Route path="viewed" element={<CandidateViewedProfiles />} />
            <Route path="interview-tips" element={<CandidateInterviewTips />} />
            <Route path="*" element={<div className="p-8 text-center text-muted-foreground"><h2 className="text-2xl font-bold mb-2">Coming Soon</h2><p>This candidate page is under construction.</p></div>} />
          </Route>

          {/* Interviewer Routes */}
          <Route path="/dashboard/interviewer" element={<InterviewerLayout />}>
            <Route index element={<InterviewerDashboard />} />
            <Route path="profile" element={<InterviewerProfile />} />
            <Route path="personal-info" element={<InterviewerPersonalInfo />} />
            <Route path="schedule" element={<InterviewerSchedule />} />
            <Route path="pickup-schedule" element={<InterviewerPickupSchedule />} />
            <Route path="*" element={<div className="p-8 text-center text-muted-foreground"><h2 className="text-2xl font-bold mb-2">Coming Soon</h2><p>This interviewer page is under construction.</p></div>} />
          </Route>

          {/* Vendor Routes */}
          <Route path="/dashboard/vendor" element={<VendorLayout />}>
            <Route index element={<VendorDashboard />} />
            <Route path="postings" element={<VendorAllPostings />} />
            <Route path="profiles" element={<VendorAllProfiles />} />
            <Route path="users" element={<VendorUsers />} />
            <Route path="*" element={<div className="p-8 text-center text-muted-foreground"><h2 className="text-2xl font-bold mb-2">Coming Soon</h2><p>This vendor page is under construction.</p></div>} />
          </Route>

          {/* VendorRecruiter Routes */}
          <Route path="/dashboard/vendor-recruiter" element={<VendorRecruiterLayout />}>
            <Route index element={<VendorRecruiterDashboard />} />
            <Route path="postings" element={<VendorRecruiterAllPostings />} />
            <Route path="profiles" element={<VendorRecruiterAllProfiles />} />
            <Route path="*" element={<div className="p-8 text-center text-muted-foreground"><h2 className="text-2xl font-bold mb-2">Coming Soon</h2><p>This vendor recruiter page is under construction.</p></div>} />
          </Route>

          {/* Placeholder for other roles */}
          <Route path="/dashboard" element={<div className="p-8"><h1 className="text-2xl font-bold">Dashboard</h1><p>Welcome!</p></div>} />
        </Routes>
  );
}




