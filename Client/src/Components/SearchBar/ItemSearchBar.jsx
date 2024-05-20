import { useState } from "react";
import config from "../../config.json";
import { getToken } from "../../localStorage";
import OtherTile from "../../Components/ItemTIles/OtherTile";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the user input
  const [other, setOther] = useState([]); // State to hold the search results
  const [showResultsPopup, setShowResultsPopup] = useState(false); // State to control popup visibility

  function closeResults() {
    setShowResultsPopup(false);
    setSearchTerm("");
  }

  // Function to fetch items based on the search term
  const searchOthers = async (event) => {
    event.preventDefault();
    // Will make an API request to the search endpoint
    const response = await fetch(config.backend_url + `item/other/searchThrough?q=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await response.json(); // Parse the JSON response
    setOther(data); // Set the items state to the received data
    setShowResultsPopup(true); // Show the results popup
  };

  return (
    <div className="search-bar-component">
      <form className="search-form" onSubmit={searchOthers}>
        <input
          id="searchbar-input"
          type="text"
          placeholder="Search by name, or description of item"
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
          {other.length > 0 ? (
            other.map(
              (
                other,
                index // Map through games and display them
              ) => (
                <div className="search-result-book-tile" key={index}>
                  <OtherTile other={other} />
                </div>
              )
            )
          ) : (
            <p>No items found matching your search criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}
