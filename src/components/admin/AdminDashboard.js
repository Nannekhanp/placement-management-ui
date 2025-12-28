import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    API.get("/students").then(res => setStudents(res.data));
    API.get("/company").then(res => setCompanies(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Students</h3>
      {students.map(s => <div key={s.studentId}>{s.name}</div>)}

      <h3>Companies</h3>
      {companies.map(c => <div key={c.companyId}>{c.companyName}</div>)}
    </div>
  );
}
export default AdminDashboard;
