import DropDownMenu from "../../Components/DropDownMenu/DropDownMenu";

export default function EmailPopup({ onClose }) {
  function sendMessage(event) {
    event.preventDefault();
    // Make the request to send message here
  }

  return (
    <div className="email-popup">
      <div className="email-popup-content">
        <button onClick={onClose} className="inbox-close-btn">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1>Send an Email</h1>
        <form onSubmit={sendMessage}>
          <div>
            <DropDownMenu />{" "}
          </div>
          <label htmlFor="emailTextarea">Message:</label>
          <textarea id="email-textarea" name="emailTextarea" required={true}></textarea>
          <button className="email-popup-btn">Send Email</button>
        </form>
      </div>
    </div>
  );
}
