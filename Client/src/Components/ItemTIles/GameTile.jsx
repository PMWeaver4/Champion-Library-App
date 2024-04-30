import { useNavigate } from "react-router-dom";
export default function GameTile({ game }) {
    const MAX_CHAR = 12;
  const navigate = useNavigate();
  const handleGameClick = () => {
    navigate(`/game-profile/${game._id}`); // Navigate to the profile page with the book's ID
  };

  return (
    <div onClick={handleGameClick} className="game-tile">
      <img src={game.img} />
      <h1 className="game-title">{game.itemName}</h1>
    </div>
  );
}
