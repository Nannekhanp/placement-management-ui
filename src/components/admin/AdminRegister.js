import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./Adminregister.css";

// States list
const statesList = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
  "Puducherry"
];

// Districts mapping
const districtsMap = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati"],
  "Karnataka": ["Bangalore", "Mysore", "Mangalore"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Delhi": ["Central Delhi", "South Delhi", "North Delhi"]
};

function AdminRegister() {
  const navigate = useNavigate();

  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    district: "",
    pincode: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setPersonal({ ...personal, [e.target.name]: e.target.value });
  };

  // Handle state change separately (reset district)
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setPersonal((prev) => ({
      ...prev,
      state: selectedState,
      district: "",
    }));
  };

  // Submit form
  const handleSubmit = async () => {
    // Validations
    if (!personal.firstName || !personal.email || !personal.password) {
      alert("Please fill required fields");
      return;
    }

    if (personal.password !== personal.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (personal.mobile.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    try {
      // ✅ Send JSON directly (no FormData)
      await API.post("/admin/register", personal);

      alert("Registered Successfully");
      navigate("/admin/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Admin Registration</h2>

        {/* Name */}
        <div className="row">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={personal.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={personal.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Email + Password */}
        <div className="row">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={personal.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={personal.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={personal.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {/* Mobile + Gender + DOB */}
        <div className="row">
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={personal.mobile}
            onChange={handleChange}
          />
          <select
            name="gender"
            value={personal.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            name="dob"
            value={personal.dob}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className="row">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={personal.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={personal.city}
            onChange={handleChange}
          />
        </div>

        {/* State + District + Pincode */}
        <div className="row">
          <select
            name="state"
            value={personal.state}
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            {statesList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            name="district"
            value={personal.district}
            onChange={handleChange}
            disabled={!personal.state}
          >
            <option value="">Select District</option>
            {personal.state &&
              districtsMap[personal.state]?.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
          </select>

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={personal.pincode}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
}

export default AdminRegister;