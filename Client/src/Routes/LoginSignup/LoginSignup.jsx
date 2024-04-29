// Import dependencies
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import config from "../../config.json";
<<<<<<< HEAD
import { isLoggedIn, setEmail, setFirstName, setLastName, setToken } from "../../localStorage";
import ForgotPassword from "./passwordrecovery.jsx";
=======
import { isLoggedIn, setEmail, setFirstName, setLastName, setToken, setUserId } from "../../localStorage";
>>>>>>> 4986741276a1e00aa222c902bb85cf9b642537a1

//TODO, Sign up and login WORK WOOOHOOO.✅
// TODO Browser displays a message notifying user needs to be approved✅
// TODO deleted confirm password was having issues in the browser ✅
// TODO need to check on password assistance.

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
    setSignupInputs((values) => ({ ...values, [name]: value }));

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
      if (response.status == 200) {
        // handle successful login
        console.log("User LoggedIn Successfully");
        const data = await response.json();
        console.log(data);
        //data are never store anywhereohbruh
        setEmail(data.User.email);
        setToken(data.Token);
        setFirstName(data.User.firstName);
        setLastName(data.User.lastName);
        setUserId(data.User._id);
        navigate("/home");
        return;
      }
      //handle wrong credentials
      setLoginError(data.message);
    } catch (error) {
      console.log("User Login Failed");
      console.error("Error occurred:", error);
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
            />

            <button className="login-button" type="submit">
              Login
            </button>
          </form>
          {loginError && <p>{loginError}</p>}
          <button className="ForgotPassword" element={<ForgotPassword/>}>Forgot Password?</button>
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
            />
            <button className="signUp-button" type="submit">
              Sign Up
            </button>
          </form>
          {signupPending && <p> Your account is pending approval by the admin.</p>}
          {signupError && <p>{signupError}</p>}
        </div>
      </div>
    </main>
  );
}
