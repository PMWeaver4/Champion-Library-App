import { useState } from "react";
import PageTemplate from "../../PageTemplate/PageTemplate";
import AddItems from "../../LibraryAddItemPopup/AddItems";

export default function MyItems({ onClose }) {
  // TODO logic will be extension of current tab
  // TODO logic for popups to submit and add new item

  const [showAddMiscPopup, setShowAddMiscPopup] = useState(false);

  // adding and closing misc popup
  function handleAddMiscClick() {
    setShowAddMiscPopup(true);
  }

  function handleCloseMiscPopup() {
    setShowAddMiscPopup(false);
  }

  return (
    <div className="my-popups-page">
      <div className="my-popups-body">
        <div className="view-all-headers">
          <button onClick={onClose}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="library-popup-msg">All My Items</div>
          <button className="add-item-btn" onClick={handleAddMiscClick}>
            <i className="fa-solid fa-square-plus"></i>
          </button>
        </div>
        <div className="view-all-grid"></div>
      </div>
      {showAddMiscPopup && <AddItems onClosePopup={handleCloseMiscPopup} />}
    </div>
  );
}
