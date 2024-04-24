// this should be the tiles youll see in the user page like just name and avatar and when you click on the user tile it should open up the user profile card that will contain a button for view library & send email to the user
// user tile css can be in the same scss files to save space
import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfileCard from "../../Components/UserComponents/UserProfileCard";
import { useState, useEffect } from "react";
// import { getToken } from "../../localStorage";
// import  config  from "../../config.json";

export default function UserTile({ user, onClick }) {
  // maximum characters
  const MAX_CHAR = 12;
  const [showProfileCard, setShowProfileCard] = useState(false);
  const navigate = useNavigate();
    const handleUserClick = () => {
        // navigate to users profile page
        // navigate(`/user/${user._id}`);
            onClick(user);

    setShowProfileCard(true); 
    };

    const handleCloseProfileCard = () => {
        setShowProfileCard(false);
      };

  return (
    <>
    <div onClick={handleUserClick} className="User-tile">
    <img className="User-tile-img" src="../../public/images/user avatar.png" alt={`${user.firstName} ${user.lastName}'s avatar`} />
    <h1 className="User-name">{`${user.firstName} ${user.lastName}`}</h1>

    </div>
    {showProfileCard && (
        <UserProfileCard user={user} onClose={handleCloseProfileCard} />
    )}
</>
  );
}