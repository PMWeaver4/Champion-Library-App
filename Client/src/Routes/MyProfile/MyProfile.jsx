import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

// TODO: config.backend_url + then your route/url for logic.
// TODO finish styling

export default function MyProfile() {
  // State variables for user data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Update user data on the server or local storage
  };

  // Function to handle account deletion
  const handleDeleteAccount = () => {
    // Delete user account on the server or local storage
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout action, such as clearing user session
  };

  return (
    <main className="my-profile-page">
      <PageTemplate pageTitle="My Profile">
        <div className="my-profile-body">
          <h2 className="settings-title"> Settings <i className="fa-solid fa-gear"></i> </h2>
          <h3 className="second-title"> Update user account information </h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
              className="settings-firstName"
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              className="Settings-astName"
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              className="settings-email"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">New Password:</label>
            <input
              className="settings-password"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="settings-btn" type="submit">
              Update
            </button>
          </form>
          <button className="settings-del-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>
          <button className="settings-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </PageTemplate>
    </main>
  );
}
