import { useState } from "react";
import config from "../../config.json";
import { getToken } from "../../localStorage";
import GameTile from "../../Components/ItemTIles/GameTile";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the user input
  const [game, setGame] = useState([]); // State to hold the search results
  const [showResultsPopup, setShowResultsPopup] = useState(false); // State to control popup visibility

  function closeResults() {
    setShowResultsPopup(false);
    setSearchTerm("");
  }

  // Function to fetch books based on the search term
  const searchGames = async (event) => {
    event.preventDefault();
    // Will make an API request to the search endpoint
    const response = await fetch(config.backend_url + `item/searchThrough?q=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await response.json(); // Parse the JSON response
    setGame(data); // Set the games state to the received data
    setShowResultsPopup(true); // Show the results popup
  };

  return (
    <div className="search-bar-component">
      <form className="search-form" onSubmit={searchGames}>
        <input
          id="searchbar-input"
          type="text"
          placeholder="Search by name, or description of game"
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
          {game.length > 0 ? (
            game.map(
              (
                game,
                index // Map through games and display them
              ) => (
                <div className="search-result-book-tile" key={index}>
                  <GameTile game={game} />
                </div>
              )
            )
          ) : (
            <p>No games found matching your search criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}
