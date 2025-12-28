import { useEffect, useState } from "react";
import API from "../../services/api";

function StudentJobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const studentId = localStorage.getItem("studentId");

  // Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  // Apply for a job
  const applyJob = async (jobId) => {
    try {
      await API.post(`/jobs/apply?studentId=${studentId}&jobId=${jobId}`);
      alert("Applied Successfully");
      setAppliedJobs([...appliedJobs, jobId]);
    } catch (err) {
      console.error("Failed to apply:", err);
      alert("Failed to apply for job");
    }
  };

  return (
    <div>
      <h2>Available Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Job ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Company</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Location</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.jobId}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{job.jobId}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{job.title}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{job.company}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{job.location}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => applyJob(job.jobId)}
                    disabled={appliedJobs.includes(job.jobId)}
                  >
                    {appliedJobs.includes(job.jobId) ? "Applied" : "Apply"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentJobs;
