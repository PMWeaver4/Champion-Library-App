export default function NotificationTile({ onReply, onDelete, firstName, lastName, text, createdAt, bookTitle, itemName }) {
  // Format date
  const date = new Date(createdAt).toLocaleDateString();
  const time = new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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
          <button onClick={onDelete} className="delete-notif-btn">
            <i className="fa-regular fa-trash-can"></i>
          </button>
          <button onClick={onReply} className="reply-btn">Reply</button>
        </div>
      </div>
    </div>
  );
}
