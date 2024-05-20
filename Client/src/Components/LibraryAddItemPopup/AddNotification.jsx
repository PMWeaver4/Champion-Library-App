import { useState } from "react";
import { getToken, getUserId } from "../../localStorage";
import config from "../../config.json";

export default function AddNotification({  }) {

   // State variables for each input
  const [owner, setOwner] = useState("");
  const [requestingUser, setRequestingUser] = useState("");
  const [requestedBook, setRequestedBook] = useState("");
  const [requestedItem, setRequestedItem] = useState("");

  function handleNewNotification(event) {
    event.preventDefault();
    
//send in props?
setOwner("thatguy");
setRequestingUser(getUserId());
setRequestedBook("thatbook");
setRequestedItem("thatthing");

    // Construct notification data from state
    const notificationData = {
      owner,
      requestingUser,
      requestedBook,
      requestedItem,
    };

    // Fetch configuration
    fetch(config.backend_url + `notification/create/`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,  
      },
      body: JSON.stringify(notificationData),
    })
    .then(response => response.json())
    .then(data => {
      alert(`${notificationData.owner.firstName} + ${notificationData.owner.lastName} has been notified of your request for ${requestedBook}${requestedItem}!`);
      
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Failed to add the notification.");
    });
  } 

  return (
    handleNewNotification()
  );
}
