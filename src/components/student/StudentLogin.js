import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./StudentLogin.css";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/student/login", { email, password });

      if (res.data) {
        // Set role as STUDENT
        localStorage.setItem("role", "STUDENT");
        localStorage.setItem("studentId", res.data.studentId);
        localStorage.setItem("studentName", res.data.name); // optional

        // Navigate to dashboard
        navigate("/student/dashboard");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="page-title">
      Welcome to Placement Management System
      </h1>
      <div className="login-card">
        <h2>Student Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <p onClick={() => navigate("/student/register")}>
          New student? Register here
        </p>
      </div>
    </div>
  );
}

export default StudentLogin;
