import { NavLink } from "react-router-dom";
import { useState } from "react";
import GameTile from "../../Components/ItemTIles/GameTile";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

// TODO logic will be extension of current tab
// TODO logic for popups to submit and add new item

export default function ViewAll_LibraryGames() {
  const [showAddGamePopup, setShowAddGamePopup] = useState(false);

  // for adding a new game
  const [newGameTitle, setNewGameTitle] = useState("");
  const [newGameDescription, setNewGameDescription ] = useState("");

  // adding and closing add game popup
  function handleAddGameClick() {
    setShowAddGamePopup(true);
  }

  function handleCloseGamePopup() {
    setShowAddGamePopup(false);
  }

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
      <main className="all-games-page">
<PageTemplate pageTitle=" MY GAMES">
        <div className="all-games-body">
          <div className="view-all-headers">
            <NavLink to="/my-library" >
              <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
            <h1> MY GAMES </h1>
            <button className="add-new-btn" onClick={handleAddGameClick}> Add New Game + </button> 
            {/* adding game popup */}
        { showAddGamePopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2 className="title"> Add New Game ♟️ </h2>
           
              <form className="popup-form"  onSubmit={handleNewGameSubmit}>
                <label className="form-label" htmlFor="newGameTitle"> Title: </label>
              
                <input 
                type="text" 
                placeholder="Enter your new Game Title: " id="newGameTitle"  
                value={newGameTitle} 
                onChange={(e) => setNewGameTitle(e.target.value)} required 
                />
          
            
                <label  className="form-label" htmlFor="newGameDescription"> Description </label>
                <input className="input-description"
                type="text" 
                placeholder="Enter Game Description" 
                id="newGameDescription" 
                value={newGameDescription} 
                onChange={(e) => setNewGameDescription(e.target.value)}
                required
                />
          
                <button className="popup-btn" type="submit">  Add Game </button>
              
                <button className="popup-btn" onClick={handleCloseGamePopup}> Close </button>
             
                </form>
              </div> 
          </div>
        )}


          </div>

          <div className="view-all-grid">
            < GameTile />
            < GameTile />
            < GameTile />
            < GameTile />
            < GameTile />
            < GameTile />
            < GameTile />
            < GameTile />
            < GameTile />
            < GameTile />
            < GameTile />
            < GameTile />
            < GameTile />
            < GameTile />
            < GameTile />
          </div>
        </div>
        
      </PageTemplate>
      </main>
    )};