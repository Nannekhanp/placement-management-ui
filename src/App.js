import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";

import StudentRegister from "./components/student/StudentRegister";
import StudentLogin from "./components/student/StudentLogin";
import StudentDashboard from "./components/student/StudentDashboard";
import StudentJobs from "./components/Jobs/StudentJobs";

import AdminDashboard from "./components/admin/AdminDashboard";
import CompanyRegister from "./components/company/CompanyRegister";
import CompanyLogin from "./components/company/CompanyLogin";
import CompanyDashboard from "./components/company/CompanyDashboard";
import AppliedJobs from "./components/Jobs/AppliedJobs";
import AdminRegister from "./components/admin/AdminRegister";
import AdminLogin from "./components/admin/AdminLogin";
import AdminJobs from "./components/admin/AdminJobs";
import AdminApplications from "./components/admin/AdminApplications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout */}
        <Route path="/" element={<Home />}>

          {/* Default */}
          <Route index element={<StudentLogin />} />

          {/* Student */}
          <Route path="student/login" element={<StudentLogin />} />
          <Route path="student/register" element={<StudentRegister />} />
          <Route path="student/dashboard" element={<StudentDashboard />} />
          <Route path="student/jobs" element={<StudentJobs />} />
          <Route path="student/applied/:studentId" element={<AppliedJobs />} />
          {/* Admin */}
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          {/* <Route path="/jobs" element={<AdminStudents />} /> */}
          <Route path="/jobs/jobpost" element={<AdminJobs />} />
          <Route path="/app/applications" element={<AdminApplications />} />
          
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
