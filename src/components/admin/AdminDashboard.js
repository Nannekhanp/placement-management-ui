import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    API.get("/admin/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error("Students error:", err));

    API.get("/admin/company")
      .then(res => setCompanies(res.data))
      .catch(err => console.error("Companies error:", err));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Students</h3>
      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        students.map(s => (
          <div key={s.studentId}>{s.name}</div>
        ))
      )}

      <h3>Companies</h3>
      {companies.length === 0 ? (
        <p>No companies found</p>
      ) : (
        companies.map(c => (
          <div key={c.companyId}>{c.companyName}</div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;