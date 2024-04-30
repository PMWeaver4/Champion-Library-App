import { NavLink } from "react-router-dom";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { getToken } from "../../localStorage";
import GameTile from "../../Components/ItemTIles/GameTile";

export default function AllGames() {
  // fetch items
  const [gameItems, setGameItems] = useState([]);
  const [items, setItems] = useState([]);
  async function getAvailableItems() {
    const response = await fetch(config.backend_url + "item/allavailable", {
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
    <main className="all-games-page">
      <PageTemplate pageTitle="GAMES">
        <div className="all-games-body">
          <div className="view-all-headers">
            <NavLink className="back-btn-home" to="/home">
              <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
            <h1>GAMES</h1>
          </div>
          <div className="view-all-grid">
            {gameItems.map((game) => (
              <GameTile key={game._id} game={game} />
            ))}
          </div>
        </div>
      </PageTemplate>
    </main>
  );
}
