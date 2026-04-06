import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await API.post("/admin/login", { email, password });

      // ✅ Check 'success' from backend response
      if (res.data && res.data.success) {
        const admin = res.data.admin;

        // Save admin info and role
        localStorage.setItem("admin", JSON.stringify(admin));
        localStorage.setItem("role", "ADMIN");
        localStorage.setItem("id", admin.id);
        localStorage.setItem("adminName", admin.name); // optional

        // Navigate to admin dashboard
        navigate("/admin/dashboard");
      } else {
        alert(res.data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        alert(error.response.data?.message || "Invalid email or password");
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <p onClick={() => navigate("/admin/register")}>
          New Admin? Register here
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;