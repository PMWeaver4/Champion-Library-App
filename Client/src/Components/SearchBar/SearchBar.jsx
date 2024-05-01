import { useState } from "react";
import config from "../../config.json";
import { getToken } from "../../localStorage";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the user input
  const [books, setBooks] = useState([]); // State to hold the search results
  const [showResultsPopup, setShowResultsPopup] = useState(false); // State to control popup visibility

  function closeResults() {
    setShowResultsPopup(false);
    setSearchTerm("");
  }

  // Function to fetch books based on the search term
  const searchBooks = async (event) => {
    event.preventDefault();
    // Will make an API request to the search endpoint
    const response = await fetch(config.backend_url + `book/searchThrough?q=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
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
        <button className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <button onClick={closeResults} className="reset">
        Reset Search
      </button>
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
                  <p>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Genre: </strong> {book.genre}
                  </p>
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
