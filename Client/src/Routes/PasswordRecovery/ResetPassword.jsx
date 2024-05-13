export default function ResetPassword() {
  return (
    <main className="PasswordPage">
      <div className="_banner"></div>
      <div className="_background">
        <div className="password-content">
          <img src="/images/web-security.png" />
          <h1>Reset Password</h1>
          <h2>Enter and confirm your new password.</h2>
          <form>
            <div>
              <i className="fa-solid fa-lock"></i>
              <input type="password" placeholder="Password"></input>
            </div>
            <div>
              <i className="fa-solid fa-lock"></i>
              <input type="password" placeholder="Confirm Password"></input>
            </div>
            <button className="password-submit-btn">Enter</button>
          </form>
          {/* <p className="password-error">Error Message Here</p>
          <p className="password-success">Success Message Here</p> */}
        </div>
      </div>
    </main>
  );
}
