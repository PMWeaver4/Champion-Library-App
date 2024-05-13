import AdminMiscTile from "../AdminComponentTiles/AdminMiscTile";
import { useEffect, useState } from "react";
import config from "../../../config.json";
import { getToken } from "../../../localStorage";

export default function AllOther({ onCloseWidget }) {
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

  return (
    <div className="admin-popup">
      <button onClick={onCloseWidget} className="exit-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h1>All Misc Items</h1>
      <div className="admin-popup-body">
        {otherItems.map((other) => (
          <AdminMiscTile key={other._id} other={other} />
        ))}
      </div>
    </div>
  );
}
