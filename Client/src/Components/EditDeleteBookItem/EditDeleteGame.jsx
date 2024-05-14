import React, { useState, useEffect} from "react";
import config from "../../config.json";
import { getToken, clearStorage} from "../../localStorage";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

export default  function EditDeleteGame ( { game } ) {
    const [gameData, setGameData] = useState(null);
    const { gameId } = useParams();
    const [deletePopup, setDeletePopup] = useState(false);
    const token = getToken();
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const nav = useNavigate();
    const [editGame, setEditGame] = useState({
        title: "",
        description: "",
      });

    useEffect(() => {
        async function fetchData() {
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
              setGameData(data);
              // populate edit game with fetched data
              setEditGame({
                title: data.title,
                description: data.description,
              });
            } catch (error) {
              console.error("Failed to fetch game:", error.message);
            }
          }
          if (gameId) {
            fetchData();
          }
        }, [gameId, token]);
      

        const handleGameUpdate = async (event) => {
            event.preventDefault();
            try {
              const response = await fetch(`${config.backend_url}item/update/${gameId}`, {
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
                saveTitle(editGame.title);
                saveDescription(editGame.description);
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
        
          const confirmDelete = async () => {
            try {
              const response = await fetch(`${config.backend_url}item/delete/${gameId}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (response.ok) {
                alert("Game deleted successfully");
                clearStorage(); // Clear local storage
                setTimeout(() => {
                  navigate("/home");
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
              {gameData ? (
                <div>
                  {/* Edit and Delete buttons */}
                  <button onClick={() => setEditPopupVisible(true)}>Edit</button>
                  <button onClick={handleDeleteGame}>Delete</button>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              {deletePopup && (
                <div className="delete-Game-popup">
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
                    <label htmlFor="title">Title:</label>
                    <input
                      required={true}
                      type="text"
                      id="title"
                      name="title"
                      value={editGame.title}
                      onChange={(e) => setEditGame({ ...editGame, title: e.target.value })}
                    />
                    <label htmlFor="description">Description:</label>
                    <textarea
                      required={true}
                      id="description"
                      name="description"
                      value={editGame.description}
                      onChange={(e) => setEditGame({ ...editGame, description: e.target.value })}
                    />
                    {/* Input fields for game details */}
                    <button type="submit">Save Changes</button>
                    <button onClick={cancelGameUpdate}>Cancel</button>
                  </form>
                </div>
              )}
            </main>
          );
        }