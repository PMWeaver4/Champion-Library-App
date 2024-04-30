import { useNavigate } from "react-router-dom";
//have to use "other" for "item" input
export default function OtherTile({other}) {
    const MAX_CHAR = 12;
  const navigate = useNavigate();
  const handleItemClick = () => {
    navigate(`/item-profile/${other._id}`); // Navigate to the profile page with the item's ID
  };
  return (
    <div onClick={handleItemClick} className="item-tile">
      <img className="tile-img" src={other.img} />
      { <h1 className="item-title">{other.itemName.length > MAX_CHAR ? other.itemName.substring(0, MAX_CHAR) + "..." : other.itemName}</h1> }
    </div>
  );
}

