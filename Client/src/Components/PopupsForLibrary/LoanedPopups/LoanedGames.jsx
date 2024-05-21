import { useEffect, useState } from "react";
import AddGames from "../../LibraryAddItemPopup/AddGames";
import PageTemplate from "../../PageTemplate/PageTemplate";
import GameTile from "../../ItemTIles/GameTile";
import config from "../../../config.json";
import { getToken, getUserId } from "../../../localStorage";
export default function MyLoanedGames({ onClose, handleAddGameClick }) {
  const [showAddGamePopup, setShowAddGamePopup] = useState(false);

  // adding and closing add game popup
  function handleAddGameClick() {
    setShowAddGamePopup(true);
  }

  function handleCloseGamePopup() {
    setShowAddGamePopup(false);
  }

  // fetch game items
  const [loanedGames, setLoanedGames] = useState([]);
  async function getAllUsersLoanedGames() {
    const response = await fetch(config.backend_url + `library/loanedGames/${getUserId()}`, {
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
    setLoanedGames(itemData.games);
  }

  useEffect(() => {
    getAllUsersLoanedGames();
  }, []);

  return (
    <div className="my-popups-page">
      <div className="my-popups-body">
        <div className="view-all-headers">
          <button onClick={onClose}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="library-popup-msg">All My Loaned Games</div>
          <button className="add-item-btn" onClick={handleAddGameClick}>
            <i className="fa-solid fa-square-plus"></i>
          </button>
        </div>
        <div className="view-all-grid">
          {loanedGames.map((game) => (
            <GameTile key={game._id} game={game} />
          ))}
        </div>
      </div>
      {showAddGamePopup && <AddGames onClosePopup={handleCloseGamePopup} />}
    </div>
  );
}
