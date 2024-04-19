import { useState } from "react";

export default function AddGames({ onClosePopup }) {
  // for adding a new game
  const [newGameTitle, setNewGameTitle] = useState("");
  const [newGameDescription, setNewGameDescription] = useState("");

  // TODO do i need to add a submit logic in the function
  function handleNewGameSubmit(event) {
    event.preventDefault();
    // send data to database
    console.log("New game data:", newGameTitle, newGameDescription);

    // reset input fields
    setNewGameTitle("");
    setNewGameDescription("");
    // close the popup
    setShowAddGamePopup(false);
  }

  return (
    <div className="popup-background">
    <div className="popup">
      <div className="popup-inner">
        <h2 className="title"> Add New Game 🎲</h2>

        <form className="popup-form" onSubmit={handleNewGameSubmit}>
          <label className="form-label" htmlFor="newGameTitle">
            {" "}
            Title:{" "}
          </label>

          <input
            type="text"
            placeholder="Enter your new Game Title: "
            id="newGameTitle"
            value={newGameTitle}
            onChange={(e) => setNewGameTitle(e.target.value)}
            required
          />

          <label className="form-label" htmlFor="newGameDescription">
            {" "}
            Description{" "}
          </label>
          <input
            className="input-description"
            type="text"
            placeholder="Enter Game Description"
            id="newGameDescription"
            value={newGameDescription}
            onChange={(e) => setNewGameDescription(e.target.value)}
            required
          />

          <button className="popup-btn" type="submit">
            {" "}
            Add Game{" "}
          </button>
        </form>
        <button className="popup-btn" onClick={onClosePopup}>
          {" "}
          Close{" "}
        </button>
      </div>
    </div>
    </div>
  );
}
