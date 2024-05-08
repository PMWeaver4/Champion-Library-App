import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken } from "../../localStorage";
import config from "../../config.json";

export default function OtherProfileCard({ item }) {
  // maximum characters
  const MAX_CHAR = 30;

  const navigate = useNavigate();

  const [owner, setOwner] = useState("");


  function borrowItem() {
    //do the create notification, config notifications/create, with a key of book: book._id or item: item._id
    setOwner(item.user)
    // Construct book data from state
    const requestData = {
      item,
      owner
    };
    if(item.hasPendingRequest){
      alert ("this item already has a pending request");
      throw new Error ("This item already has a pending request")
    }
    // Fetch configuration
    fetch(config.backend_url + `notifications/create/`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,  
      },
      body: JSON.stringify(requestData),
    })
    .then(response => response.json())
   
    .catch(error => {
      console.error('Error:', error);
      alert("Failed to create the notication.");
    });
    alert(`${item.itemName} has been requested.`);
   }
   

  return (
    <div className="ItemProfileCard">
      <div className="blue-card-overlay">
        <NavLink onClick={()=> navigate(-1)} className="ItemCard-back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </NavLink>
        <img src={item.img} />
        <div className="ItemCard-header">
          <h1>{item.itemName.length > MAX_CHAR ? item.itemName.substring(0, MAX_CHAR) + "..." : item.itemName}</h1>
          <button className="borrow-button" onClick={() => borrowItem()}>Borrow</button>
        </div>
      </div>
      <div className="white-card-overlay">
        <h2>About</h2>
        <h3>{item.description}</h3>
        <p>
          <em>Owned By:</em> {item.user.firstName + " " + item.user.lastName}
        </p>
      </div>
    </div>
  );
}
