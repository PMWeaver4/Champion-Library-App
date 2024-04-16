// Import dependencies
import { NavLink } from "react-router-dom";
import { useState } from "react";
import config from "../../config.json";

//TODO, make buttons work and redirect to dashboard and implement logic for logging in and creating an account. [when i log in with current approved user it does not work]
// TODO check if passwords match when signing up. DONE********
// TODO store data in backend so user can return [Still not storing created user in backend]
// TODO when i try to create a user online it doesnt work, but works fine in postman. 

// Component for login page
export default function LoginSignup() {
  // state variables
  const [activeTab, setActiveTab] = useState("login");
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  // checks password when signing up
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [loginError, setLoginError] = useState("");

  // event handler for handling input change
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));

    // resets password match error
    if (name === "password" || name === "confirmPassword") {
      setPasswordMatchError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (inputs.password !== inputs.confirmPassword){
        setPasswordMatchError(true);
        return;
      }

      let endpoint = "";
      let requestBody = {};

      if (activeTab === "login") {
        // using config to avoid hardcoding URL and having issues
        endpoint = `${config.backend_url}/user/login`;

        requestBody = {
          email: inputs.email,
          password: inputs.password,
        };


      } else {
        endpoint = `${config.backend_url}/user/create`;
        requestBody = {
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          email: inputs.email,
          password: inputs.password,
          confirmPassword: inputs.confirmPassword,
        };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (activeTab === "login") {
          // save token in local storage
          localStorage.setItem("token", data.Token);
          // redirect to home page
          nav("/home");
        } else {
          // message for approval
          setLoginError("Your account is pending approval by the admin.");
        }
      } else {
        console.error("Login/Signup failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  

  return (
    <main className="login-signup-page">
      <div className="login-signup-content">
        <img className="LOGO" src="/images/LOGO.png" alt="Logo" />
        <div className="login-tabs">
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
              id="email"
              name="email"
              value={inputs.email}
              onChange={handleInputChange}
            />

            <label htmlFor="password">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="password"
              id="password"
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
              id="firstName"
              name="firstName"
              value={inputs.firstName}
              onChange={handleInputChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="lastName"
              id="lastName"
              name="lastName"
              value={inputs.lastName}
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter a email address"
              className="email"
              id="Signup-email"
              name="email"
              value={inputs.email}
              onChange={handleInputChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              className="password"
              id="Signup-password"
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
            />
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your new password"
              className="confirm_password"
              id="signup-password"
              name="confirm-signup-password"
              value={inputs.confirmPassword}
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
