import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./StudentRegister.css";

// States and districts mapping
const statesList = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
  "Puducherry"
];

// Example districts mapping (expand as needed)
const districtsMap = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati"],
  "Karnataka": ["Bangalore", "Mysore", "Mangalore"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Delhi": ["Central Delhi", "South Delhi", "North Delhi"]
};

function StudentRegister() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  // Page 1: Personal Details
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

  // Page 2: Education Details
  const [education, setEducation] = useState({
    tenthSchool: "",
    tenthPercentage: "",
    interCollege: "",
    interPercentage: "",
    degreeUniversity: "",
    degreeCollege: "",
    degreePercentage: "",
  });

  const [resume, setResume] = useState(null);

  const handlePersonalChange = (e) => {
    setPersonal({ ...personal, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const savePersonal = () => {
    if (personal.password !== personal.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setPage(2);
  };

  const saveEducation = () => setPage(3);

  const handleSubmit = async () => {
    if (!resume) {
      alert("Please upload resume");
      return;
    }

    const formData = new FormData();
    const data = { ...personal, ...education };

    formData.append(
      "student",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    formData.append("resume", resume);

    try {
      await API.post("/student/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registered Successfully");
      navigate("/student/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Student Registration</h2>

        {/* Page 1: Personal Details */}
        {page === 1 && (
          <>
            <div className="row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={personal.firstName}
                onChange={handlePersonalChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={personal.lastName}
                onChange={handlePersonalChange}
                required
              />
            </div>

            <div className="row">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={personal.email}
                onChange={handlePersonalChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={personal.password}
                onChange={handlePersonalChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={personal.confirmPassword}
                onChange={handlePersonalChange}
                required
              />
            </div>

            <div className="row">
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={personal.mobile}
                onChange={handlePersonalChange}
                required
              />
              <select
                name="gender"
                value={personal.gender}
                onChange={handlePersonalChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                {/* <option value="Other">Other</option> */}
              </select>
              <input
                type="date"
                name="dob"
                value={personal.dob}
                onChange={handlePersonalChange}
                required
              />
            </div>

            <div className="row">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={personal.address}
                onChange={handlePersonalChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={personal.city}
                onChange={handlePersonalChange}
                required
              />
            </div>

            <div className="row">
              {/* State dropdown */}
              <select
                name="state"
                value={personal.state}
                onChange={(e) => {
                  handlePersonalChange(e);
                  setPersonal({ ...personal, district: "" }); // reset district
                }}
                required
              >
                <option value="">Select State</option>
                {statesList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {/* District dropdown */}
              <select
                name="district"
                value={personal.district}
                onChange={handlePersonalChange}
                required
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
                onChange={handlePersonalChange}
                required
              />
            </div>

            <button type="button" onClick={savePersonal}>
              Next: Education Details
            </button>
          </>
        )}

        {/* Page 2: Education Details */}
        {page === 2 && (
          <>
            <div className="row">
              <input
                type="text"
                name="tenthSchool"
                placeholder="10th School Name"
                value={education.tenthSchool}
                onChange={handleEducationChange}
                required
              />
              <input
                type="number"
                step="0.01"
                name="tenthPercentage"
                placeholder="10th Percentage"
                value={education.tenthPercentage}
                onChange={handleEducationChange}
                required
              />
            </div>

            <div className="row">
              <input
                type="text"
                name="interCollege"
                placeholder="Inter College Name"
                value={education.interCollege}
                onChange={handleEducationChange}
                required
              />
              <input
                type="number"
                step="0.01"
                name="interPercentage"
                placeholder="Inter Percentage"
                value={education.interPercentage}
                onChange={handleEducationChange}
                required
              />
            </div>

            <div className="row">
              <input
                type="text"
                name="degreeUniversity"
                placeholder="BTECH University Name"
                value={education.degreeUniversity}
                onChange={handleEducationChange}
                required
              />
              <input
                type="text"
                name="degreeCollege"
                placeholder="BTECH College Name"
                value={education.degreeCollege}
                onChange={handleEducationChange}
                required
              />
              <input
                type="number"
                step="0.01"
                name="degreePercentage"
                placeholder="BTECH Percentage / CGPA"
                value={education.degreePercentage}
                onChange={handleEducationChange}
                required
              />
            </div>

            <div className="button-group">
              <button type="button" onClick={() => setPage(1)}>
                Previous
              </button>
              <button type="button" onClick={saveEducation}>
                Next: Resume Upload
              </button>
            </div>
          </>
        )}

        {/* Page 3: Resume Upload */}
        {page === 3 && (
          <>
            <div className="row">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                required
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={() => setPage(2)}>
                Previous
              </button>
              <button type="button" onClick={handleSubmit}>
                Submit Registration
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentRegister;
