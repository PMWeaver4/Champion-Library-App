import { useState, useEffect } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import config from "../../config.json";
import {
  getToken,
  getFirstName,
  getLastName,
  getEmail,
  setEmail as saveEmail,
  setFirstName as saveFirstName,
  setLastName as saveLastName,
  clearStorage,
  getUserId,
} from "../../localStorage";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navigate, useNavigate, NavLink } from "react-router-dom";

// TODO: config.backend_url + then your route/url for logic.✅
// TODO: can update and user info in DB✅
// TODO: displays message for updating successfully✅
// TODO: can delete account ✅
// TODO Popup asking are you sure you want to delete?✅
// TODO: display success or fail message ✅
// TODO redirect to login ✅
// TODO finish styling ✅

export default function MyProfile() {
  // State variables for user data
  const [inputs, setInputs] = useState({
    lastName: getLastName(),
    firstName: getFirstName(),
    email: getEmail(),
    password: "",
  });
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [message, setMessage] = useState("");
  // added get Token to be able to update user info and delete account.
  const token = getToken();
  const nav = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${config.backend_url}user/update`, {
        method: "PUT",
        body: JSON.stringify(inputs),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setMessage("User data updated successfully"); // Set success message
        saveEmail(inputs.email);
        saveFirstName(inputs.firstName);
        saveLastName(inputs.lastName);
      } else {
        setMessage("Unable to update user information"); // Set error message
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setMessage("Unable to update user information"); // Set error message
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  // shows popup
  const handleDeleteAccount = () => {
    setShowDeletePopup(true);
  };

  // function to handle account deletion
  const confirmDeleteAccount = async () => {
    try {
      const response = await fetch(`${config.backend_url}user/delete/${getUserId()}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setMessage("User account deleted successfully");
        clearStorage(); // Clear local storage
        // Navigate to login/signup page
        setTimeout(() => {
          setMessage("");
          nav("/login");
        }, 3000);
      } else {
        setMessage("Unable to delete user account");
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
      setMessage("Unable to delete user account");
    }
    setShowDeletePopup(false);
  };

  // function to cancel account
  const cancelDeleteAccount = () => {
    setShowDeletePopup(false);
  };

  return (
    <main className="my-profile-page">
      <PageTemplate>
        <div className={`my-profile-body ${showDeletePopup ? "popup-clicked" : ""}`}>
          {/* <div className="settings-title-container">  */}

          {/* <div className="title-image">
          <p className="p-tag">User Settings </p><img  src="/images/settings.png" alt="settings Image"/> 
          </div> */}

          {/* <h1 className="settings-title"> ACCOUNT SETTINGS</h1> */}
          <h2 className="second-title"> Account Information </h2>
          {/* message to let user know update was successful */}
          {message && <p>{message}</p>}
          <form className="Form" onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
              className="settings-firstName"
              required={true}
              type="text"
              id="firstName"
              name="firstName"
              value={inputs.firstName}
              placeholder="FirstName"
              onChange={handleInputChange}
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              className="Settings-lastName"
              required={true}
              type="text"
              id="lastName"
              name="lastName"
              value={inputs.lastName}
              placeholder="Last Name"
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              className="settings-email"
              required={true}
              type="email"
              id="email"
              name="email"
              value={inputs.email}
              placeholder="email"
              onChange={handleInputChange}
            />
            <label htmlFor="password">New Password:</label>
            <input
              className="settings-password"
              required={false}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={inputs.password}
              onChange={handleInputChange}
            />
            <button className="settings-btn" type="submit">
              Update
            </button>
          </form>
          <button className="settings-del-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>
          {/* <div>
        <NavLink to="/" className="Logout">
         <i className="fa-solid fa-right-from-bracket"> Logout</i>
        </NavLink> 
          </div> */}

          {/* delete account popup */}
          {showDeletePopup && (
            <div className="delete-account-popup">
              <h1> We are sad to see you go. Are you sure you want to delete your account? </h1>
              <button className="yes-delete-btn" onClick={confirmDeleteAccount}>
                {" "}
                Yes{" "}
              </button>
              <button className="no-delete-btn" onClick={cancelDeleteAccount}>
                {" "}
                No{" "}
              </button>
            </div>
          )}
          {message && <p>{message}</p>}
        </div>
      </PageTemplate>
    </main>
  );
}
