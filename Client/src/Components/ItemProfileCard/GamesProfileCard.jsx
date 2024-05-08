import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken } from "../../localStorage";
import config from "../../config.json";

export default function GamesProfileCard({ game }) {
  // maximum characters
  const MAX_CHAR = 30;

  const navigate = useNavigate();
  
  const [owner, setOwner] = useState("");
  const [item, setItem] = useState("");

function borrowGame() {
 //do the create notification, config notifications/create, with a key of book: book._id or item: item._id

setOwner(game.user)
setItem(game)
 // Construct book data from state
 const requestData = {
   item,
   owner
 };
 if(game.hasPendingRequest){
   alert ("this game already has a pending request");
   throw new Error ("This game already has a pending request")
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
 alert(`${game.itemName} has been requested.`);
}


  return (
    <div className="ItemProfileCard">
      <div className="blue-card-overlay">
        <NavLink onClick={()=> navigate(-1)} className="ItemCard-back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </NavLink>
        <img src={game.img} />
        <div className="ItemCard-header">
          <h1>{game.itemName.length > MAX_CHAR ? game.itemName.substring(0, MAX_CHAR) + "..." : game.itemName}</h1>
          <button className="borrow-button" onClick={() => borrowGame()}>Borrow</button>
        </div>
      </div>
      <div className="white-card-overlay">
        <h2>About</h2>
        <h3>{game.description}</h3>
        <p>
          <em>Owned By:</em> {game.user.firstName + " " + game.user.lastName}
        </p>
      </div>
    </div>
  );
}
