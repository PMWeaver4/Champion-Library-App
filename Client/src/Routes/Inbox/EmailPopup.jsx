import { NavLink } from "react-router-dom";

export default function EmailPopup({ onClose }) {
  return (
    <div className="email-popup">
      <div className="email-popup-content">
        <button onClick={onClose} className="inbox-close-btn">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1>Send an Email</h1>
        <form>
          <div></div>
          <label htmlFor="emailTextarea">Message:</label>
          <textarea id="email-textarea" name="emailTextarea" required={true}></textarea>
          <button className="email-popup-btn">Send Email</button>
        </form>
      </div>
    </div>
  );
}
