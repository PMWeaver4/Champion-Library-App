import React, { useState, useEffect } from "react";
import config from "../../config.json";
import { useParams } from "react-router-dom";
import { getToken, getUserId } from "../../localStorage";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
// TODO make it only visible for owner of item

export default function EditDeleteBook() {
  const [book, setBook] = useState(null);
  const { bookId } = useParams();
  const [DeletePopup, setDeletePopup] = useState(false);
  const token = getToken();
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [editBook, setEditBook] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
  });
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`${config.backend_url}book/book/${bookId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
        // Populate edit book with fetched book data
        setEditBook({
          title: data.title,
          author: data.author,
          description: data.description,
          genre: data.genre,
        });
      } catch (error) {
        console.error("Failed to fetch book:", error.message);
      }
    }
    fetchBook();
  }, [bookId, token]);

  const handleEditBook = () => {
    setEditPopupVisible(true);
  };

  const cancelBookUpdate = () => {
    // Hide edit popup
    setEditPopupVisible(false);
  };

  // Function to save title to local storage
  const saveTitle = (title) => {
    localStorage.setItem("title", title);
  };

  // Function to save author to local storage
  const saveAuthor = (author) => {
    localStorage.setItem("author", author);
  };

  // Function to save description to local storage
  const saveDescription = (description) => {
    localStorage.setItem("description", description);
  };

  // Function to save genre to local storage
  const saveGenre = (genre) => {
    localStorage.setItem("genre", genre);
  };

  const handleBookUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${config.backend_url}book/update/${book._id}`, {
        method: "PUT",
        body: JSON.stringify(editBook),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert("Book information updated successfully");
        // Update local storage with new book data
        saveTitle(editBook.title);
        saveAuthor(editBook.author);
        saveDescription(editBook.description);
        saveGenre(editBook.genre);
        // Close the edit popup after successful update
        setEditPopupVisible(false);
      } else {
        // Set error message
        alert("Unable to update book information");
      }
    } catch (error) {
      console.error("Error updating book data:", error);
    }
  };

  // function to handle book deletion
  const confirmBookDelete = async () => {
    try {
      const response = await fetch(`${config.backend_url}book/delete/${book._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert("Book deleted successfully");

        setTimeout(() => {
          // Close the edit popup after successful update
          setDeletePopup(false);
          // Navigate back to the previous page (was having issues bc once user deletes a book they were being logged out and redirected to the login page)
          nav("/home");
        }, 3000);
      } else {
        alert("Unable to delete book");
      }
    } catch (error) {
      console.error("Error deleting Book:", error);
    }
  };

  //delete popup
  const handleDeleteBook = () => {
    console.log("Handling delete book");
    // Show delete popup
    setDeletePopup(true);
  };
  const cancelDeleteBook = () => {
    // Hide delete popup
    setDeletePopup(false);
  };

  return (
    <div>
      {book ? (
        <>
          { book.user._id === getUserId() && (
            <div className="first-btn-container">
              {/* Edit and Delete buttons */}

              <button className="edit-button" onClick={handleEditBook}>
                Edit
              </button>
              <button className="delete-button" onClick={handleDeleteBook}>
                Delete
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
      {/* delete */}
      {DeletePopup && (
        <div className="delete-Book-popup">
          <div>
          <h1> Are you sure you want to delete this book? </h1>
          <button className="yes-delete-btn" onClick={confirmBookDelete}>
            {" "}
            Yes{" "}
          </button>
          <button className="no-delete-btn" onClick={cancelDeleteBook}>
            {" "}
            No{" "}
          </button>
          </div>
        </div>
      )}
      {editPopupVisible && (
        <div className="edit-book-popup" style={{ display: editPopupVisible ? "block" : "none" }}>
          {/* Form to edit book details */}
          <h1>Edit Book Information</h1>
          <form className="Form" onSubmit={handleBookUpdate}>
            <label className="title-1" htmlFor="title">
              Title:
            </label>
            <input
              required={true}
              type="text"
              id="title"
              name="title"
              value={editBook.title}
              onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
            />
            <label className="author" htmlFor="author">
              Author:
            </label>
            <input
              required={true}
              type="text"
              id="author"
              name="author"
              value={editBook.author}
              onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
            />
            <label className="description" htmlFor="description">
              Description:
            </label>
            <textarea
              required={true}
              id="description"
              name="description"
              value={editBook.description}
              onChange={(e) => setEditBook({ ...editBook, description: e.target.value })}
            />
            <label className="genre" htmlFor="genre">
              Genre:
            </label>
            <textarea
              required={true}
              id="genre"
              name="genre"
              value={editBook.genre}
              onChange={(e) => setEditBook({ ...editBook, genre: e.target.value })}
            />
            {/* Input fields for book details */}
            <button className="save-changes-btn" type="submit">
              Save Changes
            </button>
            <button className="cancel-changes-btn" onClick={cancelBookUpdate}>
              {" "}
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// notes for commit
