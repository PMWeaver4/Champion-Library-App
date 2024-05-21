import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { getToken } from "../../localStorage";
import GamesProfileCard from "../../Components/ItemProfileCard/GamesProfileCard";

// when you click a tile on home page itll open this page and display the library card
export default function GameProfileCardPage() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  async function fetchGame() {
    try {
      const response = await fetch(`${config.backend_url}item/item/${gameId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGame(data);
    } catch (error) {
      console.error("Failed to fetch game:", error.message);
    }
  }
  useEffect(() => {
    fetchGame();
  }, [gameId]);

  return !game ? (
    <div className="GameProfileCardPage">
      <PageTemplate>Game is loading</PageTemplate>
    </div>
  ) : (
    <div className="GameProfileCardPage">
      <div className="card-container">
        <GamesProfileCard game={game} onBorrow={fetchGame} onReturn={fetchGame} />
      </div>
    </div>
  );
}
