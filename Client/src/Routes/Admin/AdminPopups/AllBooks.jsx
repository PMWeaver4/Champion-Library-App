import config from "../../../config.json";
import { getToken } from "../../../localStorage";
import { useEffect, useState } from "react";
import AdminBookTile from "../AdminComponentTiles/AdminBookTile";
import DeletePopup from "../DeletePopup";
import EditBookPopup from "../EditBookPopup";

export default function AllBooks({ onCloseWidget }) {
  const [books, setBooks] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${config.backend_url}book/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data.Created);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const initiateDeleteBook = (book) => {
    setSelectedBook(book);
    setShowDeletePopup(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${config.backend_url}book/delete/${selectedBook._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`, // Ensure you import getToken and config
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete the book");
      }
      setBooks(books.filter((book) => book._id !== selectedBook._id));
      setShowDeletePopup(false);
      alert("Successfully deleted!");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setSelectedBook(null);
  };

  const initiateEditBook = (book) => {
    setSelectedBook(book);
    setShowEditPopup(true);
  };

  const handleUpdateBook = async (updatedBook) => {
    try {
      const response = await fetch(`${config.backend_url}book/update/${updatedBook._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      if (!response.ok) {
        throw new Error("Failed to update the book");
      }

      const updatedData = await response.json();
      setBooks((prevBooks) => prevBooks.map((book) => (book._id === updatedData._id ? updatedData : book)));
      setShowEditPopup(false);
      alert("Book successfully updated");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleCancelEdit = () => {
    setShowEditPopup(false);
    setSelectedBook(null);
  };

  return (
    <div className="admin-popup">
      <button onClick={onCloseWidget} className="exit-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h1>All Books</h1>
      <div className="admin-popup-body">
        {books.map((book) => (
          <AdminBookTile key={book._id} book={book} onDeleteRequest={() => initiateDeleteBook(book)} onEditRequest={() => initiateEditBook(book)} />
        ))}
      </div>
      {showDeletePopup && <DeletePopup onConfirmDelete={handleDelete} onCancel={handleCancelDelete} book={selectedBook} />}
      {showEditPopup && <EditBookPopup book={selectedBook} onSave={handleUpdateBook} onCancel={handleCancelEdit} />}
    </div>
  );
}
