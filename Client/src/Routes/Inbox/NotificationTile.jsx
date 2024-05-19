import { useState } from "react";

export default function NotificationTile({ onReply, onDelete, firstName, lastName, key, createdAt, message, requestingUser }) {
  // Format date
  const date = new Date(createdAt).toLocaleDateString();
  const time = new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="component_notification-tile">
      <div className="notification-content">
        <div className="notification-header">
          <h1 className="notification-username">From: {requestingUser ? `${requestingUser.firstName} ${requestingUser.lastName}` : "South Meadow's Lending Library"}</h1>
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
