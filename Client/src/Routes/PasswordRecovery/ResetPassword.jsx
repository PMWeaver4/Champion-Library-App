import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import config from "../../config.json";
export default function ResetPassword() {
  const [resetToken, setResetToken] = useState("");
  const [email, setEmail] = useState("");
  const [updatePasswordData, setUpdatePasswordData] = useState({
    password: "",
    validatePassword: "",
  });
  const formRef = useRef();

  useEffect(() => {
    const validateCredentials = async () => {
      // ?email=genn0900@gmail.com&resetToken=c49174161666b24f6bc92bec8cdfd8aeca53aff5

      const searchParams = new URLSearchParams(location.search);
      const email = searchParams.get("email");
      const resetToken = searchParams.get("resetToken");

      if (!email || !resetToken) {
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
        //display an error message. Invalid credentials
        return;
      }
      // Display the reset password inputs
      console.log("Success");
      setEmail(email);
      setResetToken(resetToken);
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
      //display an error message. Invalid credentials
      return;
    }
    // Display the reset password inputs
    console.log("Success Update");
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
          {email ? (
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
          ) : (
            <h2>Please wait while we verify your credentials</h2>
          )}
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
