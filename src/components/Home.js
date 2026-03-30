import { Outlet, Link, useNavigate, useParams  } from "react-router-dom";
import "./Home.css";
import logo from "../logo.png";
function Home() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const { studentId } = useParams(); // get the id from URL
  console.log(studentId);

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
            <Link to="/company/login">Company Login</Link>
            <Link to="/admin/login">Admin Login</Link>
          </>
        )}

        {/* STUDENT SIDEBAR */}
        {role === "STUDENT" && (
          <>
            <Link to="/student/dashboard">Dashboard</Link>
            <Link to="/student/jobs">Jobs</Link>
            <Link to={`/student/applied/${studentId}`}>Applied Jobs</Link>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}

        {/* COMPANY SIDEBAR */}
        {/* {role === "COMPANY" && (
          <>
            <Link to="/company/dashboard">Dashboard</Link>
            <Link to="/company/post-job">Post Job</Link>
            <Link to="/company/applicants">Applicants</Link>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )} */}

        {/* ADMIN SIDEBAR */}
        {role === "ADMIN" && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/students">Students</Link>
            {/* <Link to="/admin/companies">Companies</Link> */}
            <Link to="/admin/jobs">Jobs</Link>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>

      {/* Content Area (ONLY Outlet) */}
      <div className="content">
        <div className="content-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
