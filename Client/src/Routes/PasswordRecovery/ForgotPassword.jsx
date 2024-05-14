import { NavLink } from "react-router-dom";
import config from "../../config.json";
import { useState } from "react";
export default function ForgotPassword() {
  const [resetPasswordData, setResetPasswordData] = useState({
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResetPasswordData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setResetPasswordData((values) => ({ ...values, [name]: value }));
  };

  async function resetPassword(event) {
    event.preventDefault();

    const response = await fetch(config.backend_url + "user/requestResetPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: resetPasswordData.email }),
    });
    setResetPasswordData({ email: "" });
    if (response.status !== 200) {
      // render error message
      setErrorMessage("oooo"); // this has a text
      setSuccessMessage(""); //this stays empty
      return;
    }
    // render success message
    setSuccessMessage("aaaa"); // this has a text
    setErrorMessage(""); //this stays empty
  }
  return (
    <main className="PasswordPage">
      <div className="_banner">
        <p>South Meadow's Lending Library</p>
      </div>
      <div className="_background">
        <div className="password-content">
          <img src="/images/mobile-password-forgot.png" />
          <h1>Forgot Password</h1>
          <h2>Enter your email and we'll send you a link to reset your password.</h2>
          <form onSubmit={resetPassword}>
            <div>
              <i className="fa-solid fa-envelope"></i>
              <input name="email" value={resetPasswordData.email} onChange={handleResetPasswordData} placeholder="Email"></input>
            </div>

            <button className="password-submit-btn">Submit</button>
          </form>

          {errorMessage && <p className="password-error">{errorMessage}</p>}
          {successMessage && <p className="password-success">{successMessage}</p>}

          <NavLink to="/">
            <i className="fa-solid fa-chevron-left"></i> Back to Login
          </NavLink>
        </div>
      </div>
    </main>
  );
}
