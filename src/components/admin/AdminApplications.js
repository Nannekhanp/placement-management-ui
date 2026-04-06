import { useEffect, useState } from "react";
import API from "../../services/api";
import "./AdminApplications.css";

function AdminApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = () => {
    API.get("/app/applications")
      .then(res => setApplications(res.data))
      .catch(err => console.error("Failed to fetch applications", err));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = (applicationId, status) => {
    API.put(`/app/applications/${applicationId}`, { status })
      .then(res => {
        const updated = res.data;
        setApplications(prev =>
          prev.map(app =>
            app.applicationId === updated.applicationId ? updated : app
          )
        );
      })
      .catch(err => alert("Failed to update status"));
  };

  return (
    <div className="applications-wrapper">
      <h2>Student Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map(app => (
          <div key={app.applicationId} className="application-card">
            <p><strong>Student:</strong> {app.student?.name} ({app.student?.email})</p>
            <p><strong>Job:</strong> {app.job?.title} - {app.job?.company}</p>
            <p><strong>Status:</strong> {app.status}</p>
            <div className="status-buttons">
              {app.status !== "SELECTED" && <button onClick={() => updateStatus(app.applicationId, "SELECTED")}>Select</button>}
              {app.status !== "REJECTED" && <button onClick={() => updateStatus(app.applicationId, "REJECTED")}>Reject</button>}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminApplications;