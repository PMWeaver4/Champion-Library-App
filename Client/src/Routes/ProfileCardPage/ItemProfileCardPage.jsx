import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { getToken } from "../../localStorage";
import OtherProfileCard from "../../Components/ItemProfileCard/OtherProfileCard";
// when you click a tile on home page itll open this page and display the library card
export default function ItemProfileCardPage() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  async function fetchItem() {
    try {
      const response = await fetch(`${config.backend_url}item/item/${itemId}`, {
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
      setItem(data);
    } catch (error) {
      console.error("Failed to fetch item:", error.message);
    }
  }
  useEffect(() => {
    fetchItem();
  }, [itemId]);

  return !item ? (
    <div className="ItemProfileCardPage">Item is loading</div>
  ) : (
    <div className="ItemProfileCardPage">
      <div className="card-container">
        <OtherProfileCard item={item} onBorrow={fetchItem} onReturn={fetchItem} />
      </div>
    </div>
  );
}
