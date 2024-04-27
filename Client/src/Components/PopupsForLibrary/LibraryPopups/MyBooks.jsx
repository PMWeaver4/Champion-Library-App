import { useEffect, useState } from "react";
import AddBooks from "../../LibraryAddItemPopup/AddBooks";
import BookTile from "../../ItemTIles/BookTile";
import { getToken, getUserId } from "../../../localStorage";
import config from "../../../config.json";
export default function MyBooks({ onClose, handleAddBookClick }) {
  const [showAddBookPopup, setShowAddBookPopup] = useState(false);

  // Adding book and closing book popup
  function handleAddBookClick() {
    setShowAddBookPopup(true);
  }

  function handleCloseBookPopup() {
    setShowAddBookPopup(false);
  }
//? Fetching all users books
  const [books, setBooks] = useState([]);

  async function fetchBooks() {
    const response = await fetch(config.backend_url + `library/books/${getUserId()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const bookData = await response.json(); // the response is directly an array of books
    if (response.status !== 200) {
      console.error("Failed to fetch books");
      return;
    }
    setBooks(bookData.Results);
  }

  useEffect(() => {
    fetchBooks(); // im calling the fetchBooks function
  }, []); // empty array this effect should run once when the component mounts

  return (
    <div className="my-popups-page">
      <div className="my-popups-body">
        <div className="view-all-headers">
          <button onClick={onClose}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="library-popup-msg">All My Books</div>
          <button className="add-item-btn" onClick={handleAddBookClick}>
            <i className="fa-solid fa-square-plus"></i>
          </button>
        </div>
        <div className="view-all-grid">
        {books.map((book) => (
              <BookTile key={book._id} book={book} />
            ))}
        </div>
      </div>
      {showAddBookPopup && <AddBooks onClosePopup={handleCloseBookPopup} />}
    </div>
  );
}
