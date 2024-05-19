import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import config from "../../config.json";

const formStateEnum = {
  Validation: 0,
  ResetPasswordForm: 1,
  Done: 2,
};

export default function ResetPassword() {
  const [resetToken, setResetToken] = useState("");
  const [email, setEmail] = useState("");
  const [updatePasswordData, setUpdatePasswordData] = useState({
    password: "",
    validatePassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentFormState, setCurrentFormState] = useState(formStateEnum.Validation);
  const formRef = useRef();

  useEffect(() => {
    const validateCredentials = async () => {
      const searchParams = new URLSearchParams(location.search);
      const email = searchParams.get("email");
      const resetToken = searchParams.get("resetToken");

      if (!email || !resetToken) {
        setErrorMessage(
          "This link is invalid. Please verify that it was copied properly from email or please request another reset password link to continue."
        ); // this has a text
        setSuccessMessage("");
        // display error message. Missing email or reset token
        return;
      }

      const response = await fetch(config.backend_url + "user/validateResetCredentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          resetToken: resetToken,
        }),
      });

      if (response.status !== 200) {
        setErrorMessage("This link is either invalid or expired. Please request another reset password link to continue."); // this has a text
        setSuccessMessage(""); //this stays empty
        return;
      }
      setSuccessMessage(""); //empty
      setErrorMessage(""); //empty
      setEmail(email);
      setResetToken(resetToken);
      setCurrentFormState(formStateEnum.ResetPasswordForm);
    };

    validateCredentials();
  }, []);

  const handleUpdatePasswordData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdatePasswordData((values) => ({ ...values, [name]: value }));
  };

  async function updatePassword(event) {
    event.preventDefault();
    if (formRef.current == null) {
      return;
    }

    const isValid = updatePasswordData.password === updatePasswordData.validatePassword;
    formRef.current.reportValidity(isValid);
    if (!isValid) {
      return;
    }
    const response = await fetch(config.backend_url + "user/resetPassword", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: updatePasswordData.password,
        resetToken: resetToken,
      }),
    });

    if (response.status !== 200) {
      //display an error message. Expired while finishing
      setSuccessMessage(""); //empty
      setErrorMessage("Link is no longer valid, please request a new one to continue.");
      return;
    }
    // Display the reset password inputs
    setSuccessMessage("Password successfully updated.");
    setErrorMessage(""); //empty
    setUpdatePasswordData({
      password: "",
      validatePassword: "",
    });
    setCurrentFormState(formStateEnum.Done);
  }

  function ValidationElement() {
    if (errorMessage) {
      return <></>;
    }
    return <h2>Please wait while we verify your credentials</h2>;
  }

  function ResetPasswordFormElement() {
    return (
      <>
        <h2>Enter and confirm your new password.</h2>
        <form ref={formRef} onSubmit={updatePassword}>
          <div>
            <i className="fa-solid fa-key"></i>
            <input
              type="password"
              name="password"
              value={updatePasswordData.password}
              onChange={handleUpdatePasswordData}
              placeholder="Password"
            ></input>
          </div>
          <div>
            <i className="fa-solid fa-key"></i>
            <input
              type="password"
              name="validatePassword"
              value={updatePasswordData.validatePassword}
              onChange={handleUpdatePasswordData}
              placeholder="Confirm Password"
            ></input>
          </div>
          <button className="password-submit-btn">Enter</button>
        </form>
      </>
    );
  }

  return (
    <main className="PasswordPage">
      <div className="_banner">
        <p>South Meadow's Lending Library</p>
      </div>
      <div className="_background">
        <div className="password-content">
          <img src="/images/web-security.png" />
          <h1>Reset Password</h1>
          {currentFormState === formStateEnum.Validation && <ValidationElement errorMessage={errorMessage} />}
          {currentFormState === formStateEnum.ResetPasswordForm && <ResetPasswordFormElement />}
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
