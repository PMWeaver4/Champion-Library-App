export default function ReplyPopup({ notification, onYes, onNo, onClose }) {
  return (
    <div className="InboxPopup">
      <div className="inbox-popup-content">
        <button className="replyClose" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2>
          Do you accept{" "}
          <em>
            {notification.requestingUser.firstName} {notification.requestingUser.lastName}'s
          </em>{" "}
          request for <em>{notification.request.book.title || notification.request.item.itemName}</em>?
        </h2>
        <div className="inbox-buttons">
          <button className="yes-button" onClick={onYes}>
            Accept
          </button>
          {notification.notificationType !== "Return" && (
            <button className="no-button" onClick={onNo}>
              Decline
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
