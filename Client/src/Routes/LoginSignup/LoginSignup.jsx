// Import dependencies
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import config from "../../config.json";
import { isLoggedIn, setEmail, setFirstName, setLastName, setToken, setUserId, setIsAdmin, setApproved } from "../../localStorage";

//TODO, Sign up and login WORK WOOOHOOO.✅
// TODO Browser displays a message notifying user needs to be approved✅
// TODO deleted confirm password was having issues in the browser ✅
// TODO need to check on password assistance. ✅
// TODO add required attribute  ✅
// Todo error message for incorrect password and email  ✅

// Component for login page
export default function LoginSignup() {
  // state variables
  const [activeTab, setActiveTab] = useState("login");

  const [SignupInputs, setSignupInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  // const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [signupPending, setSignupPending] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate(); // you get a reference to the navigation function like this

  // event handler for handling input change
  const handleSignupInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSignupInputs((prevState) => ({ ...prevState, [name]: value }));

    // resets password match error
    // if (name === "password" || name === "confirmPassword") {
    //   setPasswordMatchError(false);
    // }
  };

  const handleLoginInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${config.backend_url}user/create`, {
        method: "POST",
        body: JSON.stringify(SignupInputs),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setSignupPending(true);
        setSignupError("");
      } else {
        const data = await response.json();
        setSignupError(data.message);
      }
    } catch (err) {
      console.error("Error occurred:", err);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${config.backend_url}user/login`, {
        method: "POST",
        body: JSON.stringify(loginInputs),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status == 200) {
        // handle successful login
        console.log("User LoggedIn Successfully");
        // const data = await response.json();
        //data are never store anywhereohbruh
        setEmail(data.User.email);
        setToken(data.Token);
        setFirstName(data.User.firstName);
        setLastName(data.User.lastName);
        setUserId(data.User._id);
        setIsAdmin(data.User.isAdmin);
        setApproved(data.User.approved);
        navigate("/home");
        return;
      } else {
        setLoginError("Email or Password credentials are incorrect. Please try again.");
        console.log("Login Error:", data.message); // Log error message to console
      }
    } catch (error) {
      console.log("User Login Failed");
      console.error("Error occurred:", error);
      // Handle other errors if any
    }
  };

  // if user is loggedin allow render of the homepage
  return isLoggedIn() ? (
    <Navigate to="/home" replace />
  ) : (
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
        {/* approval message */}
        <div>
          {signupPending && (
            <div className="Approval-message">
              <p>Thank you for signing up! We've received your request and are currently reviewing it.</p>
            </div>
          )}
          {signupError && <p>{signupError}</p>}
        </div>
        <div id="loginForm" className="tabContent" style={{ display: activeTab === "login" ? "block" : "none" }}>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="email">Email</label>

            <input
              type="email"
              placeholder="Enter a email address"
              className="email"
              id="email"
              name="email"
              value={loginInputs.email}
              onChange={handleLoginInputChange}
              autoComplete="email"
              required
            />

            <label htmlFor="password">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="password"
              id="password"
              name="password"
              value={loginInputs.password}
              onChange={handleLoginInputChange}
              required
            />

            <button className="login-button" type="submit">
              Login
            </button>
            {/* Render error message if loginError is not empty */}
            {/* {loginError && <p className="error-message"> Email or Password credentials are incorrect. Please try again.</p>} */}
          </form>
          {loginError && <p>{loginError}</p>}
          <NavLink to="/forgotPassword" className="password-recovery">
            Forgot Password?
          </NavLink>
        </div>

        <div id="signupForm" className="tab-content" style={{ display: activeTab === "signup" ? "block" : "none" }}>
          <form onSubmit={handleSignupSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="firstName"
              id="firstName"
              name="firstName"
              value={SignupInputs.firstName}
              onChange={handleSignupInputChange}
              required
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="lastName"
              id="lastName"
              name="lastName"
              value={SignupInputs.lastName}
              onChange={handleSignupInputChange}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter a email address"
              className="email"
              id="Signup-email"
              name="email"
              value={SignupInputs.email}
              onChange={handleSignupInputChange}
              autoComplete="email"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              className="password"
              id="Signup-password"
              name="password"
              value={SignupInputs.password}
              onChange={handleSignupInputChange}
              required
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
