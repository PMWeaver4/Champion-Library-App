import { useState } from "react";

export default function AddBooks({ onClosePopup }) {
  // for Adding a new book
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookIsbn, setNewBookIsbn] = useState("");
  const [newBookDescription, setNewBookDescription] = useState("");

  function handleNewBookSubmit(event) {
    event.preventDefault();
    // submit data to backend need to add logic
    // need to use fetch to make a POST request to backend API, will do this once everything is done and we merge with backend.
    console.log("New book data:", newBookTitle, newBookAuthor, newBookIsbn);
    // reset input fields
    setNewBookTitle("");
    setNewBookAuthor("");
    setNewBookIsbn("");
    // close the pop-up
    setShowAddBookPopup(false);
  }
// ! Need to add a popup that will return the book added successfully or failed
  return (
    <div className="popup-background">
    <div className="popup">
      <div className="popup-inner">
        <h2 className="title"> Add New Book 📚</h2>
        <form className="popup-form" onSubmit={handleNewBookSubmit}>
          <label className="form-label" htmlFor="newBookTitle">
            {" "}
            Title:{" "}
          </label>

          <input
            type="text"
            placeholder="Enter your new book title "
            id="newBookTitle"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            required
          />

          <label className="form-label" htmlFor="newBookAuthor">
            {" "}
            Author:{" "}
          </label>

          <input
            type="text"
            placeholder="Enter author first and last name"
            id="newBookAuthor"
            value={newBookAuthor}
            onChange={(e) => setNewBookAuthor(e.target.value)}
            required
          />

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

          <label className="form-label" htmlFor="newBookDescription">
            {" "}
            Description:{" "}
          </label>

          <input
            className="input-description"
            type="text"
            placeholder="Enter book description"
            id="newBookDescription"
            value={newBookDescription}
            onChange={(e) => setNewBookDescription(e.target.value)}
            required
          />

          <button className="popup-btn" type="submit">
            Add Book
          </button>
        </form>
        <button className="popup-btn" onClick={onClosePopup}>
          Close
        </button>
      </div>
    </div>
    </div>
  );
}
