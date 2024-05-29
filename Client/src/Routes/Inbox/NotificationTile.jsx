import { useState } from "react";

export default function NotificationTile({ notification, onReply, onDelete, firstName, lastName, createdAt, message, requestingUser, isPending }) {
  // Format date
  const date = new Date(createdAt).toLocaleDateString();
  const time = new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="component_notification-tile">
      <div className="notification-content">
        <div className="notification-header">
          <h1 className="notification-username">
            From:<br/> {requestingUser ? `${requestingUser.firstName} ${requestingUser.lastName}` : "Library"}
          </h1>
          <h2>
            {date} {time}
          </h2>
        </div>
        <div className="notification-body">{message}</div>
        <div className="reply-div">
          <button onClick={onDelete.bind(this, notification)} className="delete-notif-btn">
            <i className="fa-regular fa-trash-can"></i>
          </button>
          {isPending && (
            <button onClick={onReply.bind(this, notification)} className="reply-btn">
              Reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
