import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { getToken } from "../../localStorage";
// when you click a tile on home page itll open this page and display the library card
export default function GameProfileCardPage() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
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
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch game:", error.message);
      }
    }
    fetchGame();
  }, [gameId]);

  return !game ? (
    <div className="GameProfileCardPage">
      <PageTemplate>Game is loading</PageTemplate>
    </div>
  ) : (
    <div className="GameProfileCardPage">
      <PageTemplate>
        <div className="game-profile-card-background">
          <div className="game-profile-card">
            <div className="card-overlay">
              <button className="close-btn">
                {/* If using a router, you may want to go back or navigate elsewhere */}
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <div className="overlay-content">
                <div className="game-placeholder"><img src={game.img} /></div>
                <div className="card-headers">
                  <h1 className="card-title">{game.itemName}</h1>
                  <h2 className="card-author">{game.description}</h2>
                  <button className="borrow-btn">Borrow</button>
                </div>
              </div>
            </div>
            <div className="about-section">
              <h3>Details</h3>
              <div className="about-content">
                <div className="game-card-information">
                  <ul>
                    <li className="game-owner">
                      <em>Owned By:</em> {game.user.firstName + " " + game.user.lastName}
                    </li>
                    <li className="itemName">
                      <em>Game:</em> {game.itemName}
                    </li>
                    <li className="description">
                      <em>Description:</em> {game.description}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
    </div>
  );
}
