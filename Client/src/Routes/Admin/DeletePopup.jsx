export default function DeletePopup({ book, game, other, onConfirmDelete, onCancel }) {
  let title = "";
  if (book) {
    title = book.title;
  }else if (game) {
    title = game.itemName;
  }else if (other) {
    title = other.itemName;
  }
  
  return (

      <div className="InboxPopup">
        <div className="inbox-popup-content">
          <h2>Delete '{title}' from database?</h2>
          <div className="inbox-buttons">
          <button className="yes-button" onClick={onConfirmDelete}>Yes</button>
          <button className="no-button" onClick={onCancel}>No</button>
          </div>
        </div>
      </div>

    );
  }