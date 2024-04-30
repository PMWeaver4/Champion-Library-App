import { NavLink } from "react-router-dom";

export default function GamesProfileCard({ game }) {
  // maximum characters
  const MAX_CHAR = 30;
  return (
    <div className="ItemProfileCard">
      <div className="blue-card-overlay">
        <NavLink to="/home" className="ItemCard-back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </NavLink>
        <img src={game.img} />
        <div className="ItemCard-header">
          <h1>{game.itemName.length > MAX_CHAR ? game.itemName.substring(0, MAX_CHAR) + "..." : game.itemName}</h1>
          <button className="borrow-button">Borrow</button>
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
