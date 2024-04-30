export default function NotificationTile({ firstName, lastName, text, createdAt, bookTitle, itemName }) {
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
          <button className="reply-btn">Reply</button>
        </div>
      </div>
    </div>
  );
}
