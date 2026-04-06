import { useEffect, useState } from "react";
import API from "../../services/api";
import "./AdminJobs.css";

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [minCgpa, setMinCgpa] = useState("");
  const [editJobId, setEditJobId] = useState(null);

  // Fetch all jobs from backend
  const fetchJobs = () => {
    API.get("/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Post new or update existing job
  const saveJob = () => {
    if (!title || !company || !location || !description || !minCgpa) {
      alert("Please fill all fields");
      return;
    }

    const jobData = {
      title,
      company,
      location,
      description,
      minCgpa: parseFloat(minCgpa),
    };

    if (editJobId) {
      // Update existing job
      API.put(`/jobs/job/${editJobId}`, jobData)
        .then(res => {
          const updatedJob = res.data;
          setJobs(prev => prev.map(job => job.jobId === updatedJob.jobId ? updatedJob : job));
          resetForm();
        })
        .catch(err => alert("Failed to update job"));
    } else {
      // Post new job
      API.post("/jobs/jobpost", jobData)
        .then(res => {
          setJobs(prev => [...prev, res.data]);
          resetForm();
        })
        .catch(err => alert("Failed to post job"));
    }
  };

  // Edit job: load data into form
  const editJob = (job) => {
    setEditJobId(job.jobId);
    setTitle(job.title);
    setCompany(job.company);
    setLocation(job.location);
    setDescription(job.description);
    setMinCgpa(job.minCgpa);
  };

  // Delete job
  const deleteJob = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      API.delete(`/jobs/job/${id}`)
        .then(() => setJobs(prev => prev.filter(job => job.jobId !== id)))
        .catch(err => alert("Failed to delete job"));
    }
  };

  // Reset form
  const resetForm = () => {
    setEditJobId(null);
    setTitle("");
    setCompany("");
    setLocation("");
    setDescription("");
    setMinCgpa("");
  };

  return (
    <div className="admin-jobs-wrapper">
      {/* Form */}
      <div className="job-form-card">
        <h2>{editJobId ? "Edit Job" : "Post New Job"}</h2>
        <div className="job-form-grid">
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <input type="text" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
          <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
          <input type="number" step="0.01" placeholder="Min CGPA" value={minCgpa} onChange={e => setMinCgpa(e.target.value)} />
        </div>
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <div className="form-buttons">
          <button onClick={saveJob}>{editJobId ? "Update Job" : "Post Job"}</button>
          {editJobId && <button className="cancel-btn" onClick={resetForm}>Cancel</button>}
        </div>
      </div>

      {/* Job List */}
      <div className="jobs-list-card">
        <h2>All Jobs</h2>
        {jobs.length === 0 ? <p>No jobs posted yet.</p> :
          jobs.map(job => (
            <div key={job.jobId} className="job-item">
              <h3>{job.title} - {job.company}</h3>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Min CGPA:</strong> {job.minCgpa}</p>
              <p>{job.description}</p>
              <div className="job-actions">
                <button onClick={() => editJob(job)}>Edit</button>
                <button onClick={() => deleteJob(job.jobId)}>Delete</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default AdminJobs;