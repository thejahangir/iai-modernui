import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminAddIAIUser from "./pages/admin/AdminAddIAIUser";
import AdminClientEscalation from "./pages/admin/AdminClientEscalation";
import AdminPassword from "./pages/admin/AdminPassword";
import AdminPasswordManager from "./pages/admin/AdminPasswordManager";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminPrimarySkills from "./pages/admin/AdminPrimarySkills";
import AdminSecondarySkills from "./pages/admin/AdminSecondarySkills";
import AdminInterviews from "./pages/admin/AdminInterviews";
import AdminEditRating from "./pages/admin/AdminEditRating";
import AdminRegisteredCandidates from "./pages/admin/AdminRegisteredCandidates";
import AdminInterviewerSchedules from "./pages/admin/AdminInterviewerSchedules";
import AdminRegisteredInterviewers from "./pages/admin/AdminRegisteredInterviewers";
import AdminCity from "./pages/admin/AdminCity";
import AdminTodaysFollowups from "./pages/admin/AdminTodaysFollowups";

export default function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/dashboard/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="add-iai-user" element={<AdminAddIAIUser />} />
            <Route path="escalation" element={<AdminClientEscalation />} />
            <Route path="password" element={<AdminPasswordManager />} />
            <Route path="change-password" element={<AdminPassword />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="skills/primary" element={<AdminPrimarySkills />} />
            <Route path="skills/secondary" element={<AdminSecondarySkills />} />
            <Route path="interviews" element={<AdminInterviews />} />
            <Route path="interviews/rating" element={<AdminEditRating />} />
            <Route path="candidate/registered" element={<AdminRegisteredCandidates />} />
            <Route path="interviewer/schedules" element={<AdminInterviewerSchedules />} />
            <Route path="interviewer/registered" element={<AdminRegisteredInterviewers />} />
            <Route path="city" element={<AdminCity />} />
            <Route path="follow-ups" element={<AdminTodaysFollowups />} />
            {/* Catch-all for other admin routes currently */}
            <Route path="*" element={<div className="p-8 text-center text-muted-foreground"><h2 className="text-2xl font-bold mb-2">Coming Soon</h2><p>This admin page is under construction.</p></div>} />
          </Route>

          {/* Placeholder for other roles */}
          <Route path="/dashboard" element={<div className="p-8"><h1 className="text-2xl font-bold">Dashboard</h1><p>Welcome!</p></div>} />
        </Routes>
      </Router>
  );
}
