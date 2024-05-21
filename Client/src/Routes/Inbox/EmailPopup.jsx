import React, { useState } from "react";
import DropDownMenu from "../../Components/DropDownMenu/DropDownMenu";
import config from "../../config.json";
import { getToken, getFirstName, getLastName, getEmail } from "../../localStorage"; 
export default function EmailPopup({ onClose }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState(""); 
  const senderFullname = `${getFirstName()} ${getLastName()}`;
  const senderEmail = `${getEmail()}`;
  const handleUserChange = (user) => {
    console.log("Selected user:", user); // Debugging log
    setSelectedUser(user); // Update selected user state
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value); // Update message state
  };

  const handleSubmitMessage = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log("Submitting message:", { selectedUser, message }); // Debugging log
    if (selectedUser && message) {
      // Ensure a user is selected and a message is provided
      try {
        const response = await fetch(`${config.backend_url}user/send-email`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`, 
          },
          body: JSON.stringify({
            recipient: selectedUser.email, // Send the recipient email
            sender_fullname: senderFullname, // Send the sender's full name
            sender_email: senderEmail, // Send the sender's email
            message: message, // Send the message
          }),
        });
        console.log("Response status:", response.status); // Debugging log
        if (response.ok) {
          alert("Email sent successfully"); // Notify user of success
          setSelectedUser(null);
          setMessage("");
          onClose();
        } else {
          alert("Failed to send email"); // Notify user of failure
        }
      } catch (error) {
        console.error("Error:", error); // Log error
        alert("Error sending email"); // Notify user of error
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
            <DropDownMenu onChange={handleUserChange} /> {/* Drop down to select user */}
          </div>
          <label htmlFor="emailTextarea">Message:</label>
          <textarea id="email-textarea" name="emailTextarea" required={true} onChange={handleMessageChange}></textarea>
          <button type="submit" className="email-popup-btn">
            Send Email
          </button>{" "}
          {/* Submit button */}
        </form>
      </div>
    </div>
  );
}
