export default function ReplyPopup({onYes, onClose}) {
  return (
    <div className="InboxPopup">
      <div className="inbox-popup-content">
        <button className="replyClose" onClick={onClose}><i class="fa-solid fa-xmark"></i></button>
        <h2>Do you accept <em>User's Name</em> request for <em>Item</em>?</h2>
        <div className="inbox-buttons">
        <button className="yes-button" onClick={onYes}>Accept</button>
        <button className="no-button" >Decline</button>
        </div>
      </div>
    </div>
  );
}
