import React, { useState, useEffect} from "react";
import config from "../../config.json";
import { useParams } from "react-router-dom";
// import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { getToken, clearStorage, getTitle, getAuthor, getDescription, getGenre} from "../../localStorage";
import { Navigate, useNavigate, NavLink } from "react-router-dom";

// import BookProfileCard from "../../Components/ItemProfileCard/BookProfileCard";


export default  function EditDeleteBook () {
    const [book, setBook] = useState(null);
    const { bookId } = useParams();
    const [DeletePopup, setDeletePopup] = useState(false);
    const token = getToken();
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const nav = useNavigate();
    const [editBook, setEditBook] = useState({
        Title: getTitle(),
        Author: getAuthor(),
        Description: getDescription(),
        Genre: getGenre(),
      });

    useEffect(() => {
        // Fetch user data 
        const fetchUserData = async () => {
          try {
            // Retrieve token from local storage or wherever it's stored
            const token = getToken(); 
            const response = await fetch(`${config.backend_url}user`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
            } else {
              console.error("Error fetching user data:", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUserData();
      }, [token]);


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

const handleBookUpdate =  async(event) => {
    event.preventDefault();
    try {  
      const response = await fetch(`${config.backend_url}book/update/${book._id}`, {
        method: "PUT",       
         body: JSON.stringify(editBook),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      if (response.ok) {
        // Set success message
        setMessage("Book data updated successfully"); 
        // Update local storage with new book data
        saveTitle(editBook.Title);
        saveAuthor(editBook.Author);
        saveDescription(editBook.Description);
        saveGenre(editBook.Genre);
      } else {
        // Set error message
        setMessage("Unable to update book information"); 
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
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        setMessage("Book deleted successfully");
        clearStorage(); // Clear local storage
        
        setTimeout(() => {
          setMessage("");
          nav("/home" || "/my-library");
        }, 3000);
      } else {
        setMessage("Unable to delete book");
      }
    } catch (error) {
      console.error("Error deleting Book:", error);
    }
  };

    //delete popup
      const handleDeleteBook = () => {
        // Show delete popup
        setDeletePopup(true);
    };
    const cancelDeleteBook = () => {
        // Hide delete popup
        setDeletePopup(false);
    };

    return (
        <main>
          {book ? (
            <div>
              {/* Edit and Delete buttons */}
              <button onClick={handleEditBook}>Edit</button>
              <button onClick={handleDeleteBook}>Delete</button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          {DeletePopup && (
            <div className="delete-Book-popup">
              <h1> Are you sure you want to delete this book? </h1>
              <button className="yes-delete-btn" onClick={handleDeleteBook}> Yes </button>
              <button className="no-delete-btn" onClick={cancelDeleteBook}> No </button>
            </div>
          )}
          {editPopupVisible && (
            <div className="edit-book-popup">
              {/* Form to edit book details */}
              <h1>Edit Book Information</h1>
              <form className="Form" onSubmit={handleBookUpdate}>
                <label htmlFor="title">Title:</label>
                <input
                  required={true}
                  type="text"
                  id="title"
                  name="title"
                  value={editBook.Title}
                  onChange={(e) => setEditBook({ ...editBook, Title: e.target.value })}
                />
                <label htmlFor="author">Author:</label>
                <input
                  required={true}
                  type="text"
                  id="author"
                  name="author"
                  value={editBook.Author}
                  onChange={(e) => setEditBook({ ...editBook, Author: e.target.value })}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                  required={true}
                  id="description"
                  name="description"
                  value={editBook.Description}
                  onChange={(e) => setEditBook({ ...editBook, Description: e.target.value })}
                />
                {/* Input fields for book details */}
                <button type="submit">Save Changes</button>
                <button onClick={cancelBookUpdate}> Cancel</button>
              </form>
              {message && <p>{message}</p>}
            </div>
          )}
    </main>
      );
}