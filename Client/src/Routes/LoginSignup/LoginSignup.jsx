import { NavLink } from "react-router-dom";
// Import dependencies
import { useState } from "react";

//TODO, make buttons work and redirect to dashboard and implement logic for logging in and creating an account. check if passwords match when signing up.

// Component for login page
export default function LoginSignup() {
  const [activeTab, setActiveTab] = useState("login");
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // const [currentStatusMessage, currentStatusMessage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add login or signup logic
    if (activeTab === "login") {
      console.log("Login", inputs);
      // need to add logic to handle login
    } else {
      console.log("Sign up", inputs);
    }
  };

  return (
    <main className="login-signup-page">
      <div className="login-signup-content">
        <img className="LOGO" src="/images/LOGO.png" alt="Logo" />
        <div className="tabs">
          <div className={`tab ${activeTab === "login" ? "active" : ""}`} onClick={() => setActiveTab("login")}>
            <span className="login-header"> Login </span>
            <div className="indicator" style={{ backgroundColor: activeTab === "login" ? "#003366" : "transparent" }}></div>
          </div>
          <div className={`tab ${activeTab === "signup" ? "active" : ""}`} onClick={() => setActiveTab("signup")}>
            <span className="signup-header">Signup</span>
            <div className="indicator" style={{ backgroundColor: activeTab === "signup" ? "#003366" : "transparent" }}>
              {" "}
            </div>
          </div>
        </div>

        <div id="loginForm" className="tabContent" style={{ display: activeTab === "login" ? "block" : "none" }}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>

            <input
              type="email"
              placeholder="Enter a email address"
              className="email"
              name="email"
              value={inputs.email}
              onChange={handleInputChange}
            />

            <label htmlFor="password">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="password"
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
            />

            <button className="login-button" type="submit">
              Login
            </button>
          </form>
          <NavLink className="password-recovery">Forgot Password?</NavLink>
        </div>

        <div id="signupForm" className="tab-content" style={{ display: activeTab === "signup" ? "block" : "none" }}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="firstName"
              name="firstName"
              value={inputs.firstName}
              onChange={handleInputChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="lastName"
              name="lastName"
              value={inputs.lastName}
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter a email address"
              className="email"
              name="email"
              value={inputs.email}
              onChange={handleInputChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              className="password"
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
            />
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your new password"
              className="confirm_password"
              name="confirm_password"
              value={inputs.confirm_password}
              onChange={handleInputChange}
            />
            <button className="signUp-button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
