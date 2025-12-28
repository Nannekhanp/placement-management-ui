import { useEffect, useState } from "react";
import API from "../../services/api";

function AppliedJobs() {
  const [applied, setApplied] = useState([]);
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    API.get(`/jobs/applied/${studentId}`)
      .then(res => setApplied(res.data))
      .catch(err => console.error(err));
  }, [studentId]);

  return (
    <div>
      <h2>Applied Jobs</h2>

      {applied.length === 0 ? (
        <p>No applied jobs</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Job ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Company</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Location</th>
            </tr>
          </thead>
          <tbody>
            {applied.map(a => (
              <tr key={a.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {a.job ? a.job.jobId : "-"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {a.job ? a.job.title : "-"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {a.job ? a.job.company : "-"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {a.job ? a.job.location : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AppliedJobs;
