import { NavLink } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <main className="PasswordPage">
      <div className="_banner"><p>South Meadow's Lending Library</p></div>
      <div className="_background">
        <div className="password-content">
          <img src="/images/mobile-password-forgot.png" />
          <h1>Forgot Password</h1>
          <h2>Enter your email and we'll send you a link to reset your password.</h2>
          <form>
            <div>
              <i className="fa-solid fa-envelope"></i>
              <input placeholder="Email"></input>
            </div>

            <button className="password-submit-btn">Submit</button>
          </form>
          {/* <p className="password-error">Error Message Here</p>
          <p className="password-success">Success Message Here</p> */}
          <NavLink to="/">
            <i className="fa-solid fa-chevron-left"></i> Back to Login
          </NavLink>
        </div>
      </div>
    </main>
  );
}
