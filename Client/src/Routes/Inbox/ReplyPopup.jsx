export default function ReplyPopup({onYes, onNo}) {
  return (
    <div className="InboxPopup">
      <div className="inbox-popup-content">
        <h2>Do you accept <em>User's Name</em> request to borrow: <em>Item</em>?</h2>
        <div className="inbox-buttons">
        <button className="yes-button" onClick={onYes}>Yes</button>
        <button className="no-button" onClick={onNo}>No</button>
        </div>
      </div>
    </div>
  );
}
