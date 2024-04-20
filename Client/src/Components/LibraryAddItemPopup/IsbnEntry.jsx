import { useState } from "react";
import { getToken } from "../../localStorage";
import config from "../../config.json";

export default function IsbnEntry({ onClosePopup }) {
  const [newBookIsbn, setNewBookIsbn] = useState("");

  function handleNewBookSubmit(event) {
    event.preventDefault();

    // Use fetch to send a POST request to your backend
    fetch(config.backend_url + `fetch/bookSubmit/${newBookIsbn}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Book added:", data);
        // Reset the input field and close the popup after successful book addition
        setNewBookIsbn("");
        alert(`${data.Created.title} by ${data.Created.author} was successfully added!`);
        onClosePopup();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add the book");
      });
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
              inputMode="numeric"
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
