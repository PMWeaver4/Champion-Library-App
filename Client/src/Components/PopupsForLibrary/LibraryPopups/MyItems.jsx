import { useEffect, useState } from "react";
import PageTemplate from "../../PageTemplate/PageTemplate";
import AddItems from "../../LibraryAddItemPopup/AddItems";
import OtherTile from "../../ItemTIles/OtherTile";
import { getToken, getUserId } from "../../../localStorage";
import config from "../../../config.json";
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
  // fetch misc items
  const [otherItems, setOtherItems] = useState([]);
  const [items, setItems] = useState([]);

  async function getAllUsersItems() {
    const response = await fetch(config.backend_url + `library/items/${getUserId()}`, {
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
    setOtherItems(itemData.Results.filter((item) => item.itemType === "other"));
  }

  useEffect(() => {
    getAllUsersItems();
  }, []);
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
        <div className="view-all-grid">
          {otherItems.map((other) => (
            <OtherTile key={other._id} other={other} />
          ))}
        </div>
      </div>
      {showAddMiscPopup && <AddItems onClosePopup={handleCloseMiscPopup} />}
    </div>
  );
}
