import AdminGameTile from "../AdminComponentTiles/AdminGameTile";
import { useEffect, useState } from "react";
import config from "../../../config.json";
import { getToken } from "../../../localStorage";
import EditItemPopup from "../AdminComponentTiles/EditItemPopup";
import DeletePopup from "../DeletePopup";


export default function AllGames({ onCloseWidget }) {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const [gameItems, setGameItems] = useState([]);
  const [items, setItems] = useState([]);

  async function getAvailableItems() {
    const response = await fetch(config.backend_url + "item/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const itemData = await response.json(); // the response is directly an array of items
    if (response.status !== 200) {
      console.error("Failed to fetch items");
      return;
    }
    setItems(itemData);
    setGameItems(itemData.Results.filter((item) => item.itemType === "game"));
  }

  useEffect(() => {
    getAvailableItems();
  }, []);

  const initiateDeleteGame = (game) => {
    setSelectedGame(game);
    setShowDeletePopup(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${config.backend_url}item/delete/${selectedGame._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`, // Ensure you import getToken and config
        },
      });
      if (response.status !== 200) {
        throw new Error("Failed to delete the game");
      }
      setGameItems(gameItems.filter((game) => game._id !== selectedGame._id));
      setShowDeletePopup(false);
      alert("Successfully deleted!");
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setSelectedGame(null);
  };

const initiateEditGame = (game) => {
  setSelectedGame(game);
  setShowEditPopup(true);
}



  return (
    <div className="admin-popup">
      <button onClick={onCloseWidget} className="exit-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h1>All Games</h1>
      <div className="admin-popup-body">
        {gameItems.map((game) => (
          <AdminGameTile key={game._id} game={game} onDeleteGame={()=> initiateDeleteGame(game)} onEditGame={()=> initiateEditGame(game)} />
        ))}
      </div>
      {showDeletePopup && <DeletePopup onConfirmDelete={handleDelete} onCancel={handleCancelDelete} game={selectedGame} />}
      {showEditPopup && <EditItemPopup game={selectedGame} />}
    </div>
  );
}
