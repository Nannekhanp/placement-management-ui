import { useState } from "react";
import API from "../../services/api";

function CompanyDashboard() {
  const [job, setJob] = useState({});
  const companyId = localStorage.getItem("companyId");

  const postJob = async () => {
    job.company = { companyId };
    await API.post("/company/job", job);
    alert("Job Posted");
  };

  return (
    <div>
      <h2>Company Dashboard</h2>
      <input placeholder="Job Title" onChange={e=>setJob({...job,title:e.target.value})}/>
      <input placeholder="Description" onChange={e=>setJob({...job,description:e.target.value})}/>
      <button onClick={postJob}>Post Job</button>
    </div>
  );
}
export default CompanyDashboard;
