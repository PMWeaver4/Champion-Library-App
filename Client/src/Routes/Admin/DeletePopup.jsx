export default function DeletePopup({ book, onConfirmDelete, onCancel }) {
    return (

      <div className="InboxPopup">
        <div className="inbox-popup-content">
          <h2>Delete '{book.title}' from database?</h2>
          <div className="inbox-buttons">
          <button className="yes-button" onClick={onConfirmDelete}>Yes</button>
          <button className="no-button" onClick={onCancel}>No</button>
          </div>
        </div>
      </div>

    );
  }