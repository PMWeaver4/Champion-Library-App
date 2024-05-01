import React, { useState } from 'react';


export default function NotificationTile({ ObjectId, firstName, lastName, text, createdAt, bookTitle, itemName, }) {
  // Format date
  const date = new Date(createdAt).toLocaleDateString();
  const time = new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const [notifications, setNotifications] = useState([]);

  const handleDelete = () => {
    Delete(ObjectId);
  };

  async function deleteNotification(id) {
    try {
      const response = await fetch(`${config.backend_url}notifications/delete/${ObjectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        onDelete(Objectid);
      } else {
        console.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  }


  return (
    <div className="component_notification-tile">
      <div className="notification-content">
        <div className="notification-header">
          <h1 className="notification-username">
            {firstName} {lastName}
          </h1>
          <h2>
            {date} {time}
          </h2>
        </div>
        <div className="notification-body">
          {bookTitle && (
            <p>
              {text} {bookTitle}{" "}
            </p>
          )}
          {itemName && (
            <p>
              {text} {itemName}
            </p>
          )}
        </div>
        <div className="reply-div">
          <button className="delete-notif-btn"onClick={handleDelete} ><i class="fa-regular fa-trash-can"></i></button>
          <button className="reply-btn">Reply</button>
        </div>
      </div>
    </div>
  );
}
