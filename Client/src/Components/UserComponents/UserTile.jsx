// this should be the tiles youll see in the user page like just name and avatar and when you click on the user tile it should open up the user profile card that will contain a button for view library & send email to the user
// user tile css can be in the same scss files to save space
import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserTile({ user }) {
  
  const navigate = useNavigate();

    const handleUserClick = () => {
            // Check if the user object and _id property are defined before navigating
    if (user && user._id) {
      navigate(`/UsersViewLibrary/${user._id}`, { state: { user } });
    } else {
      console.error("Invalid user object or missing _id property:", user);
    }
    };

  return user && user._id ? (
    
    <div onClick={handleUserClick} className="User-tile">
    <img 
    className="User-tile-img" 
    src="../../public/images/user avatar.png" 
    alt={`${user.firstName} ${user.lastName}'s avatar` } 
    />
    <h1 className="User-name">{`${user.firstName} ${user.lastName}`}</h1>
    </div>
    
  ) : null;
}