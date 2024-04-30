
// import PageTemplate from "../../PageTemplate/PageTemplate";

// export default function MyBorrowedBooks({ onClose }) {
//   return (
//     <div className="my-popups-page">
//         <div className="my-popups-body">
//           <div className="view-all-headers">
//             <button onClick={onClose}>
//               <i className="fa-solid fa-arrow-left"></i>
//             </button>
//             <div className="library-popup-msg">All Borrowed Books</div>
    
//           </div>
//           <div className="view-all-grid"></div>
//         </div>
//     </div>
//   );
// }
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
//? Fetching all users borrowed books
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  async function fetchBorrowedBooks() {
    const response = await fetch(config.backend_url + `library/borrowedBooks/${getUserId()}`, {
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
    setBorrowedBooks(bookData.Results);
  }

  useEffect(() => {
    fetchBorrowedBooks(); // im calling the fetchBorrowedBooks function
  }, []); // empty array this effect should run once when the component mounts

  return (
    <div className="my-popups-page">
      <div className="my-popups-body">
        <div className="view-all-headers">
          <button onClick={onClose}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="library-popup-msg">All My Borrowed Books</div>
          <button className="add-item-btn" onClick={handleAddBookClick}>
            <i className="fa-solid fa-square-plus"></i>
          </button>
        </div>
        <div className="view-all-grid">
        {borrowedBooks.map((book) => (
              <BookTile key={book._id} book={book} />
            ))}
        </div>
      </div>
      {showAddBookPopup && <AddBooks onClosePopup={handleCloseBookPopup} />}
    </div>
  );
}
