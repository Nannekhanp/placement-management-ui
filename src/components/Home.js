import { Outlet, Link, useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../logo.png";

function Home() {
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id"); // adminId or studentId
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="PMS Logo" />
        </div>

        {/* BEFORE LOGIN */}
        {!role && (
          <>
            <Link to="/student/login">Student Login</Link>
            <Link to="/student/register">Student Register</Link>
            <Link to="/admin/login">Admin Login</Link>
          </>
        )}

        {/* STUDENT SIDEBAR */}
        {role === "STUDENT" && (
          <>
            <Link to="/student/dashboard">Dashboard</Link>
            <Link to="/student/jobs">Jobs</Link>
            <Link to={`/student/applied/${userId}`}>Applied Jobs</Link>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}

        {/* ADMIN SIDEBAR */}
        {role === "ADMIN" && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            {/* <Link to="/jobs">Students</Link> */}
            <Link to="/jobs/jobpost">Post Jobs</Link>
            <Link to="/app/applications">Applications</Link>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>

      {/* Content Area */}
      <div className="content">
        <div className="content-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;