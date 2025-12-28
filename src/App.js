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

          {/* Company */}
          <Route path="/company/register" element={<CompanyRegister />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />

        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
