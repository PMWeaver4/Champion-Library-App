import { useState } from "react";
import AddGames from "../../LibraryAddItemPopup/AddGames";
import PageTemplate from "../../PageTemplate/PageTemplate";

export default function MyGames({ onClose, handleAddGameClick }) {
  const [showAddGamePopup, setShowAddGamePopup] = useState(false);

  // adding and closing add game popup
  function handleAddGameClick() {
    setShowAddGamePopup(true);
  }

  function handleCloseGamePopup() {
    setShowAddGamePopup(false);
  }

  return (
    <div className="my-popups-page">
      <div className="my-popups-body">
        <div className="view-all-headers">
          <button onClick={onClose}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="library-popup-msg">All My Games</div>
          <button className="add-item-btn" onClick={handleAddGameClick}>
            <i className="fa-solid fa-square-plus"></i>
          </button>
        </div>
        <div className="view-all-grid"></div>
      </div>
      {showAddGamePopup && <AddGames onClosePopup={handleCloseGamePopup} />}
    </div>
  );
}
