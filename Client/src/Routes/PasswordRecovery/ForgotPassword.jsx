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
    if (response.status === 404) {
      // render error message
      setErrorMessage("User not found, please try again or sign up."); // this has a text
      setSuccessMessage(""); //this stays empty
      return;
    }
    // render success message
    setSuccessMessage("Reset password instructions have been sent to your email. This may take up to 5 minutes to recieve.");
    setErrorMessage(""); //this stays empty
    setResetPasswordData({ email: "" });
  }
  return (
    <main className="PasswordPage">
      <div className="_banner">
        <p>South Meadow's Lending Library</p>
      </div>
      <div className="_background">
        <div className="password-content">
          <img src="/images/mobile-password-forgot.png" />
          {!successMessage && (
            <>
              <h1>Forgot Password</h1>
              <h2>Enter your email and we'll send you a link to reset your password.</h2>

              <form onSubmit={resetPassword}>
                <div>
                  <i className="fa-solid fa-envelope"></i>
                  <input name="email" value={resetPasswordData.email} onChange={handleResetPasswordData} placeholder="Email"></input>
                </div>

                <button className="password-submit-btn">Submit</button>
              </form>
            </>
          )}

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
