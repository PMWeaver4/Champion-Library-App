
import React, { useState } from "react"
import DropDownMenu from "../../Components/DropDownMenu/DropDownMenu";
import config from "../../config.json"; 
import { getToken } from "../../localStorage";


export default function EmailPopup({ onClose}) {
  const [selectedUser, setSelectedUser ] = useState(null);
  const [message, setMessage ] = useState("");

  const handleUserChange = (user) => {
    setSelectedUser(user);
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  const handleSubmitMessage = async (event) => {
    event.preventDefault();
    if (selectedUser && message) {
      try {
        const response = await fetch(`${config.backend_url}user/sendEmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: selectedUser.email, message }),
        });
        if (response.ok) {
          alert("Email sent successfully");
        } else {
          alert("Failed to send email");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error sending email");
      }
    } else {
      alert("Please select a user and enter a message.");
    }
  };


  return (
    <div className="email-popup">
      <div className="email-popup-content">
        <button onClick={onClose} className="inbox-close-btn">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1>Send an Email</h1>
        <form onSubmit={sendMessage}>
          <div>
            <DropDownMenu />{" "}
          </div>
          <label htmlFor="emailTextarea">Message:</label>
          <textarea id="email-textarea" name="emailTextarea" required={true}></textarea>
          <button className="email-popup-btn">Send Email</button>
        </form>
      </div>
    </div>
  );
}
