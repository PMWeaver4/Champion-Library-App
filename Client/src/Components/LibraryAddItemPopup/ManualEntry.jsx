import { useState } from "react";
import { getToken } from "../../localStorage";
import config from "../../config.json";
export default function ManualEntry({ onClosePopup }) {

   // State variables for each input
  const [title, setNewBookTitle] = useState("");
  const [author, setNewBookAuthor] = useState("");
  const [description, setNewBookDescription] = useState("");
  const [genre, setNewBookGenre] = useState("");

  function handleNewBookSubmit(event) {
    event.preventDefault();
    
    // Construct book data from state
    const bookData = {
      title,
      author,
      description,
      genre,
    };

    // Fetch configuration
    fetch(config.backend_url + `book/create/`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,  
      },
      body: JSON.stringify(bookData),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Book added:", data);
      alert("Book successfully added!");
      onClosePopup(); // Close the popup after successful submission
      // Reset form fields
      setNewBookTitle("");
      setNewBookAuthor("");
      setNewBookDescription("");
      setNewBookGenre("");
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Failed to add the book.");
    });
  } 

  return (
    <div className="popup-background">
      <div className="popup">
        <div className="popup-inner">
          <h2 className="title"> Add New Book 📚</h2>
          <form className="popup-form" onSubmit={handleNewBookSubmit}>
            <label className="form-label" htmlFor="title">
              {" "}
              Title:{" "}
            </label>

            <input
              type="text"
              placeholder="Enter book title "
              id="newBookTitle"
              value={title}
              onChange={(e) => setNewBookTitle(e.target.value)}
              required
            />

            <label className="form-label" htmlFor="author">
              {" "}
              Author:{" "}
            </label>

            <input
              type="text"
              placeholder="Enter author's fullname"
              id="newBookAuthor"
              value={author}
              onChange={(e) => setNewBookAuthor(e.target.value)}
              required
            />

            <label className="form-label" htmlFor="description">
              {" "}
              Description:{" "}
            </label>

            <input
              className="input-description"
              type="text"
              placeholder="Enter book description"
              id="newBookDescription"
              value={description}
              onChange={(e) => setNewBookDescription(e.target.value)}
              required
            />

            <label className="form-label" htmlFor="genre">
              {" "}
              Genre:{" "}
            </label>

            <input
              className="input-genre"
              type="text"
              placeholder="Enter book genre"
              id="newBookGenre"
              value={genre}
              onChange={(e) => setNewBookGenre(e.target.value)}
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
