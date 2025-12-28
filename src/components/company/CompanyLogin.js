import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "../student/StudentLogin.css";


function CompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/company/login", { email, password });

      if (res.data) {
        // Set role as COMPANY
        localStorage.setItem("role", "COMPANY");
        localStorage.setItem("companyId", res.data.companyId);
        localStorage.setItem("companyName", res.data.name); // optional

        // Navigate to company dashboard
        navigate("/company/dashboard");
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
        <h2>Company Login</h2>

        <input
          type="email"
          placeholder="Company Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <p onClick={() => navigate("/company/register")}>
          New company? Register here
        </p>
      </div>
    </div>
  );
}

export default CompanyLogin;
