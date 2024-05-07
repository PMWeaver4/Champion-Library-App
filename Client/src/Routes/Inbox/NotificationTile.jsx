import { useState } from "react";

export default function NotificationTile({ onReply, onDelete, firstName, lastName, createdAt, message }) {
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
          Authorization: `Bearer ${token}`,
        },
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
        <div className="notification-body">{message}</div>
        <div className="reply-div">
          <button onClick={onDelete} className="delete-notif-btn">
            <i className="fa-regular fa-trash-can"></i>
          </button>
          <button onClick={onReply} className="reply-btn">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
