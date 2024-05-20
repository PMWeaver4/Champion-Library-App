import React, { useState } from "react"
import DropDownMenu from "../../Components/DropDownMenu/DropDownMenu";
import config from "../../config.json"; 
import { getToken } from "../../localStorage";


export default function EmailPopup({ onClose}) {
  const [selectedUser, setSelectedUser ] = useState(null);
  const [message, setMessage ] = useState("");
  const token = getToken();

  const handleUserChange = (user) => {
    console.log("Selected user:", user); // Debugging log
    setSelectedUser(user);
  }

  const handleMessageChange = (event) => {
    console.log("Message changed:", event.target.value); // Debugging log
    setMessage(event.target.value);
  }

  const handleSubmitMessage = async (event) => {
    event.preventDefault();
    console.log("Submitting message:", { selectedUser, message }); // Debugging log
    if (selectedUser && message) {
      try {
        const response = await fetch(`${config.backend_url}user/notifications/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: selectedUser.email, message }),
        });
        console.log("Response status:", response.status); // Debugging log
        if (response.ok) {
          alert("Email sent successfully");
        } else {
          alert("Failed to send email");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error sending email");
      }
    } 
  };


  return (
    <div className="email-popup">
      <div className="email-popup-content">
        <button onClick={onClose} className="inbox-close-btn">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1>Send an Email</h1>
        <form onSubmit={handleSubmitMessage}>
          <div>
            <DropDownMenu onChange={handleUserChange} />
          </div>
          <label htmlFor="emailTextarea">Message:</label>
          <textarea
           id="email-textarea" 
           name="emailTextarea"
           required={true}
           onChange={handleMessageChange}
           ></textarea>
          <button className="email-popup-btn">Send Email</button>
        </form>
      </div>
    </div>
  );
}
