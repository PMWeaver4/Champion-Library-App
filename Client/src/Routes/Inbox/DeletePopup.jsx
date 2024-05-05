export default function DeletePopup({onConfirm, onNo}) {
    return (
      <div className="InboxPopup">
        <div className="inbox-popup-content">
          <h2>Delete this notification from your inbox?</h2>
          <div className="inbox-buttons">
          <button className="yes-button" onClick={onConfirm}>Yes</button>
          <button className="no-button" onClick={onNo}>No</button>
          </div>
        </div>
      </div>
    );
  }