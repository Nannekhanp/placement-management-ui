import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "../student/StudentLogin.css";

function CompanyRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    registrationNumber: "",
    companyType: "",
    industry: "",
    website: "",
    registeredAddress: "",
    contactNumber: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = { ...form };
    delete payload.confirmPassword;

    try {
      await API.post("/company/register", payload);
      alert("Company Registered Successfully");
      navigate("/company/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Company Registration</h2>

        <div className="row">
          <input
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <input
            type="email"
            name="email"
            placeholder="Company Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <input
            name="registrationNumber"
            placeholder="Registration Number"
            value={form.registrationNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <select
            name="companyType"
            value={form.companyType}
            onChange={handleChange}
            required
          >
            <option value="">Select Company Type</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
            <option value="Startup">Startup</option>
            <option value="MNC">MNC</option>
            <option value="Government">Government</option>
          </select>

          <input
            name="industry"
            placeholder="Industry"
            value={form.industry}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <input
            name="website"
            placeholder="Website"
            value={form.website}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <input
            name="registeredAddress"
            placeholder="Registered Address"
            value={form.registeredAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <input
            name="contactNumber"
            placeholder="Contact Number"
            value={form.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <button onClick={handleSubmit}>Submit Registration</button>
      </div>
    </div>
  );
}

export default CompanyRegister;
