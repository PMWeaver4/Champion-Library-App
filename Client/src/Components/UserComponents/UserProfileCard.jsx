import { useState, useEffect } from "react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken } from "../../localStorage";
import  config  from "../../config.json";

export default function UserProfileCard() {
  const navigate = useNavigate();
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showLibraryPopup, setShowLibraryPopup] = useState(false);
  const [user, setUser] = useState ({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    const fetchUserData = async () => {
      try {
        // Retrieve token from local storage or wherever it's stored
        const token = getToken(); 
        const response = await fetch(`${config.backend_url}user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  },[]);

    // function to handle email button click 
    const handleEmailButtonClick = () => {
      setShowEmailPopup(true);
    };

    // function to handle view library button click
  const handleViewLibraryButtonClick = () => {
    setShowLibraryPopup(true);
  };

  const handleBackButtonClick = () => {
    navigate("/users");
  };

  if (!user) {
    // Render loading indicator while user data is being fetched
    return <p>Loading...</p>;
  }

  return (
    <div className="user-profile-card-background">
      <div className="user-profile-card">
        <div className="user-card-overlay">
          {/*  Back button */}
          <div onClick={handleBackButtonClick} className="user-close-btn">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          {/* User avatar and name */}
          <div className="user-overlay-content">
          <img src={user.img} alt={`${user.firstName}${user.lastName}`} className="user-avatar" />
            <div className="user-placeholder"></div>
            <h1 className="user-card-title">{`${user.firstName} ${user.lastName}`}</h1>
          </div>
        </div>
        {/* Buttons */}
        <div className="user-profile-btns">
          <NavLink onClick={handleViewLibraryButtonClick}>View Library</NavLink>
          <button className="user-email-btn" onClick={handleEmailButtonClick} >Send Email</button>
        </div>
      </div>

      {/* POPUPS */}
      {/* Email Popup */}
      {showEmailPopup && (
        // Implement your email popup component here
        <div className="email-popup">
          {/* Email form */}
          {/* Implement your email form here */}
        </div>
      )}
      {/* Library Popup */}
      {showLibraryPopup && (
        // Implement your library popup component here
        <div className="library-popup">
          {/* Library content */}
          {/* Implement your library content here */}
        </div>
      )}
    </div>
  );
}

