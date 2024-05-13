import AdminGameTile from "../AdminComponentTiles/AdminGameTile";
import { useEffect, useState } from "react";
import config from "../../../config.json";
import { getToken } from "../../../localStorage";

export default function AllGames({ onCloseWidget }) {
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

  return (
    <div className="admin-popup">
      <button onClick={onCloseWidget} className="exit-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h1>All Games</h1>
      <div className="admin-popup-body">
        {gameItems.map((game) => (
          <AdminGameTile key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
}
