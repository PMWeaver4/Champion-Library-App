import AdminMiscTile from "../AdminComponentTiles/AdminMiscTile";
import { useEffect, useState } from "react";
import config from "../../../config.json";
import { getToken } from "../../../localStorage";
import EditItemPopup from "../AdminComponentTiles/EditItemPopup";
import DeletePopup from "../DeletePopup";

export default function AllOther({ onCloseWidget }) {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [otherItems, setOtherItems] = useState([]);
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
    setOtherItems(itemData.Results.filter((item) => item.itemType === "other"));
  }

  useEffect(() => {
    getAvailableItems();
  }, []);

  const initiateDeleteItem = (other) => {
    setSelectedItem(other);
    setShowDeletePopup(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${config.backend_url}item/delete/${selectedItem._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`, // Ensure you import getToken and config
        },
      });
      if (response.status !== 200) {
        throw new Error("Failed to delete the item");
      }
      setOtherItems(otherItems.filter((other) => other._id !== selectedItem._id));
      setShowDeletePopup(false);
      alert("Successfully deleted Item!");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setSelectedItem(null);
  };

  const initiateEditItem = (other) => {
    setSelectedItem(other);
    setShowEditPopup(true);
  };

  const handleCancelEdit = () => {
    setShowEditPopup(false);
    setSelectedItem(null);
  };

  return (
    <div className="admin-popup">
      <button onClick={onCloseWidget} className="exit-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h1>All Misc Items</h1>
      <div className="admin-popup-body">
        {otherItems.map((other) => (
          <AdminMiscTile key={other._id} other={other} onDeleteItem={() => initiateDeleteItem(other)} onEditItem={() => initiateEditItem(other)} />
        ))}
      </div>
      {showDeletePopup && <DeletePopup onConfirmDelete={handleDelete} onCancel={handleCancelDelete} other={selectedItem} />}
      {showEditPopup && <EditItemPopup other={selectedItem} onCancel={handleCancelEdit} />}
    </div>
  );
}
