import { useState } from "react";

export default function IsbnEntry({ onClosePopup }) {
  const [newBookIsbn, setNewBookIsbn] = useState("");

  function handleNewBookSubmit(event) {
    event.preventDefault();
    // submit data to backend need to add logic
    // need to use fetch to make a POST request to backend API, will do this once everything is done and we merge with backend.
    console.log("New book data:", newBookIsbn);
    // reset input fields
    setNewBookIsbn("");
    // close the pop-up
    setShowAddBookPopup(false);
  }
  return (
    <div className="popup-background">
      <div className="popup">
        <div className="popup-inner">
          <h2 className="title"> Add New Book 📚</h2>
          <form className="popup-form" onSubmit={handleNewBookSubmit}>
            <label className="form-label" htmlFor="newBookIsbn">
              {" "}
              ISBN:{" "}
            </label>

            <input
              type="text"
              placeholder="Enter your books isbn"
              id="newBookIsbn"
              value={newBookIsbn}
              onChange={(e) => setNewBookIsbn(e.target.value)}
              required
            />
            <button className="popup-btn" type="submit">
              Add Book
            </button>
          </form>
          <button className="close-popup" onClick={onClosePopup}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
