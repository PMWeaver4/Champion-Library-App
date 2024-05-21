import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, getUserId } from "../../localStorage";
import config from "../../config.json";
import EditDeleteItem from "../EditDeleteBookItem/EditDeleteItem";

export default function OtherProfileCard({ item, onBorrow, onReturn }) {
  // maximum characters
  const MAX_CHAR = 30;

  const navigate = useNavigate();

  const [owner, setOwner] = useState("");

  async function returnItem() {
    const response = await fetch(`${config.backend_url}notifications/updateReturn`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        item: item._id,
        newRequestStatus: "Pending",
      }),
    });
    if (response.status !== 200) {
      return alert("ERROR WHILE RETURNING");
    }
    alert("RETURN STARTED");
    onReturn();
  }

  async function borrowItem() {
    //do the create notification, config notifications/create, with a key of book: book._id or item: item._id
    setOwner(item.user);
    // Construct book data from state
    const requestData = {
      item: item._id,
    };
    if (item.hasPendingRequest) {
      alert("this item already has a pending request");
      throw new Error("This item already has a pending request");
    }
    // Fetch configuration
    const response = await fetch(config.backend_url + `notifications/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(requestData),
    });
    if (response.status !== 200) {
      return alert("Failed to create the notification.");
    }
    onBorrow();
    alert(`${item.itemName} has been requested.`);
  }

  const canBorrow = !item.hasPendingRequest && item.checkedout === false;
  const canReturn = !item.hasPendingRequest && item.rentedUser == getUserId();

  return (
    <div className="ItemProfileCard">
      <div className="blue-card-overlay">
        <NavLink onClick={() => navigate(-1)} className="ItemCard-back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </NavLink>
        <img src={item.img} />
        <div className="ItemCard-header">
          <h1>{item.itemName.length > MAX_CHAR ? item.itemName.substring(0, MAX_CHAR) + "..." : item.itemName}</h1>
          {canBorrow && (
            <button className="borrow-button" onClick={borrowItem}>
              Borrow
            </button>
          )}
          {canReturn && (
            <button className="return-button" onClick={returnItem}>
              Return
            </button>
          )}
        </div>
      </div>
      <div className="white-card-overlay">
        <h2>About</h2>
        <h3>{item.description}</h3>
        <p>
          <em>Owned By:</em> {item.user.firstName + " " + item.user.lastName}
        </p>
      </div>
      <EditDeleteItem />
    </div>
  );
}
