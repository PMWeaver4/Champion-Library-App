import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { getToken } from "../../localStorage";
// when you click a tile on home page itll open this page and display the library card
export default function ItemProfileCardPage() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
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
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch item:", error.message);
      }
    }
    fetchItem();
  }, [itemId]);

  return !item ? (
    <div className="ItemProfileCardPage">
      <PageTemplate>Item is loading</PageTemplate>
    </div>
  ) : (
    <div className="ItemProfileCardPage">
      <PageTemplate>
        <div className="item-profile-card-background">
          <div className="item-profile-card">
            <div className="card-overlay">
              <button className="close-btn">
                {/* If using a router, you may want to go back or navigate elsewhere */}
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <div className="overlay-content">
                <div className="item-placeholder"><img src={item.img} /></div>
                <div className="card-headers">
                  <h1 className="card-title">{item.itemName}</h1>
                  <h2 className="card-author">{item.description}</h2>
                  <button className="borrow-btn">Borrow</button>
                </div>
              </div>
            </div>
            <div className="about-section">
              <h3>Details</h3>
              <div className="about-content">
                <div className="item-card-information">
                  <ul>
                    <li className="item-owner">
                      <em>Owned By:</em> {item.user.firstName + " " + item.user.lastName}
                    </li>
                    <li className="itemName">
                      <em>Item:</em> {item.itemName}
                    </li>
                    <li className="description">
                      <em>Description:</em> {item.description}
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
