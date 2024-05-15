import React, { useState, useEffect} from "react";
import config from "../../config.json";
import { getToken } from "../../localStorage";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

export default  function EditDeleteGame ( ) {
    const [game, setGame] = useState(null);
    const { gameId } = useParams();
    const [deletePopup, setDeletePopup] = useState(false);
    const token = getToken();
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const nav = useNavigate();
    const [editGame, setEditGame] = useState({
        itemName: "",
        description: "",
      });

    useEffect(() => {
        async function fetchGame() {
          try {
            const response = await fetch(`${config.backend_url}item/item/${gameId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setGame(data);
              // populate edit game with fetched data
              setEditGame({
                itemName: data.itemName,
                description: data.description,
              });
            } catch (error) {
              console.error("Failed to fetch game:", error.message);
            }
          };
          fetchGame();
        }, [gameId, token]);
      

        const handleGameUpdate = async (event) => {
            event.preventDefault();
            try {
              const response = await fetch(`${config.backend_url}item/update/${game._id}`, {
                method: "PUT",
                body: JSON.stringify(editGame),
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });
              if (response.ok) {
                alert("Game data updated successfully");
                // Update local storage with new game data
                saveTitle(editGame.itemName);
                saveDescription(editGame.description);
                // Close the edit popup after successful update
                setEditPopupVisible(false);
              } else {
                alert("Unable to update game information");
              }
            } catch (error) {
              console.error("Error updating game data:", error);
            }
          };
        
          const cancelGameUpdate = () => {
            // Hide edit popup
            setEditPopupVisible(false);
          };
          
          const handleEditGame = () => {
            setEditPopupVisible(true);
        };

        // delete game
          const confirmDelete = async () => {
            try {
              const response = await fetch(`${config.backend_url}item/delete/${game._id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (response.ok) {
                alert("Game deleted successfully");
                setTimeout(() => {
                  // Close the edit popup after successful update
              setDeletePopup(false);
                  nav("/home");
                }, 3000);
              } else {
                alert("Unable to delete game");
              }
            } catch (error) {
              console.error("Error deleting game:", error);
            }
          };
        
          const handleDeleteGame = () => {
            // Show delete popup
            setDeletePopup(true);
          };
        
          const cancelDeleteGame = () => {
            // Hide delete popup
            setDeletePopup(false);
          };
        
          // Function to save description to local storage
          const saveDescription = (description) => {
            localStorage.setItem("description", description);
          };
        
          // Function to save title to local storage
          const saveTitle = (title) => {
            localStorage.setItem("title", title);
          };
        
          return (
            <main>
              {game ? (
                <div>
                  {/* Edit and Delete buttons */}
                  <button className="edit-button" onClick={handleEditGame}>Edit</button>
                  <button className="delete-button" onClick={handleDeleteGame}>Delete</button>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              {deletePopup && (
                <div className="delete-Book-popup">
                  <h1> Are you sure you want to delete this Game? </h1>
                  <button className="yes-delete-btn" onClick={confirmDelete}>
                    Yes
                  </button>
                  <button className="no-delete-btn" onClick={cancelDeleteGame}>
                    No
                  </button>
                </div>
              )}
              {editPopupVisible && (
                <div className="edit-Game-popup">
                  {/* Form to edit game details */}
                  <h1>Edit Game Information</h1>
                  <form className="Form" onSubmit={handleGameUpdate}>
                    <label className="title-3" htmlFor="title">Title:</label>
                    <input
                      required={true}
                      type="text"
                      id="itemName"
                      name="itemName"
                      value={editGame.itemName}
                      onChange={(e) => setEditGame({ ...editGame, itemName: e.target.value })}
                    />
                    <label className="description-3" htmlFor="description">Description:</label>
                    <textarea
                      required={true}
                      id="description"
                      name="description"
                      value={editGame.description}
                      onChange={(e) => setEditGame({ ...editGame, description: e.target.value })}
                    />
                    {/* Input fields for game details */}
                    <button className="save-changes-btn3" type="submit">Save Changes</button>
                    <button className="cancel-changes-btn3" onClick={cancelGameUpdate}>Cancel</button>
                  </form>
                </div>
              )}
            </main>
          );
        }