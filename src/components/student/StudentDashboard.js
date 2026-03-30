import StudentJobs from "../Jobs/StudentJobs";
import AppliedJobs from "../Jobs/AppliedJobs";

function StudentDashboard() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/student/login";
  };

  return (
    <div className="content">
      <div className="dashboard">
        <h2>Student Dashboard</h2>
        {/* Available Jobs */}
        <div className="card">
          <StudentJobs />
        </div>

        {/* Applied Jobs */}
        <div className="card">
          <AppliedJobs />
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;
