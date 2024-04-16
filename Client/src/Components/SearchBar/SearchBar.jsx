import { useState } from "react";
import config from "../../config.json";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the user input
  const [books, setBooks] = useState([]); // State to hold the search results
  const [showResultsPopup, setShowResultsPopup] = useState(false); // State to control popup visibility

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWJmY2QzMzcwODdmNGM0ZjNlODNmYyIsImlhdCI6MTcxMzIzMjI2OSwiZXhwIjoxNzEzMzE4NjY5fQ._oWH1WzFRk7p9KEQiC1psEAPK-gCMKDcSfr90u4snHU";
  // Function to fetch books based on the search term
  const searchBooks = async (event) => {
    event.preventDefault();
    // Will make an API request to the search endpoint
    const response = await fetch(config.backend_url + `book/searchThrough?q=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json(); // Parse the JSON response
    setBooks(data); // Set the books state to the received data
    setShowResultsPopup(true); // Show the results popup
  };

  return (
    <div className="search-bar-component">
      <form className="search-form" onSubmit={searchBooks}>
        <input
          id="searchbar-input"
          type="text"
          placeholder="Search by genre, title, or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
        />
        <button className="search-btn">Search</button>
      </form>
      {/* Button to trigger the search */}
      {showResultsPopup && (
        <div className="search-results-popup">
          {/* Conditional rendering of the popup */}
          {books.length > 0 ? (
            books.map(
              (
                book,
                index // Map through books and display them
              ) => (
                <div className="search-result-book-tile" key={index}>
                  <img src={book.img} />
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                  <p>Genre: {book.genre}</p>
                </div>
              )
            )
          ) : (
            <p>No books found matching your search criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}
