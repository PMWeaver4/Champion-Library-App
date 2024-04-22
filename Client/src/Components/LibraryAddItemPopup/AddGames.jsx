import { useEffect, useState } from "react";
import config from "../../config.json"; // my fetch url to backend
import { getToken } from "../../localStorage";

export default function AddGames({ onClosePopup }) {
  // Adjusting the useState hooks to match the expected field names more closely
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");

  async function handleNewGameSubmit(event) {
    event.preventDefault();

    const gameData = {
      itemName,
      description,
      itemType: "game",
    };

    fetch(config.backend_url + `item/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("Something went wrong while adding a book");
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Game added:", data);
        alert(`${gameData.itemName} was successfully added!`);
        onClosePopup();
        setItemName("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add the game.");
      });
  }

  return (
    <div className="popup-background">
      <div className="popup">
        <div className="popup-inner">
          <h2 className="title">Add New Game 🎲</h2>
          <form className="popup-form" onSubmit={handleNewGameSubmit}>
            <label className="form-label" htmlFor="itemName">
              Title:
            </label>
            <input
              type="text"
              placeholder="Enter your new Game Title"
              id="itemName"
              value={itemName} // Changed from newGameTitle to itemName
              onChange={(e) => setItemName(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="description">
              Description:
            </label>
            <input
              className="input-description"
              type="text"
              placeholder="Enter Game Description"
              id="description"
              value={description} // Changed from newGameDescription to description
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button className="popup-btn" type="submit">
              Add Game
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
