// import { useState, useEffect } from "react";
// import React from "react";
// import { NavLink, useNavigate, Navigate } from "react-router-dom";
// import { getToken, getUserId } from "../../localStorage";
// import  config  from "../../config.json";

// export default function UserProfileCard( { user }) {
//   const nav = useNavigate(); 


//   const handleViewLibraryButtonClick = () => {
//     nav(`/UsersViewLibrary/user/${getUserId}`);

//   };

//   const handleBackButtonClick = () => {
//     nav("/users");
//   };

//   if (!user) {
//     // Render loading indicator while user data is being fetched
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="user-profile-card-background">
//       <div className="user-profile-card">
//         <div className="user-card-overlay">
//           {/*  Back button */}
//           {/* <div onClick={handleBackButtonClick} className="user-close-btn">
//             <i className="fa-solid fa-arrow-left"></i>
//           </div> */}
//            <div onClick={handleBackButtonClick} className="user-close-btn">
//              <NavLink to="/users">
//              <i  className="fa-solid fa-arrow-left"></i> 
//              </NavLink>
//            </div>
//           {/* User avatar and name */}
//           <div className="user-overlay-content">
          
//              <img className="user-placeholder" src="../../public/images/user avatar.png" /> 
//             <h1 className="user-card-title">{`${user.firstName} ${user.lastName}`}</h1>
//           </div>
//         </div>
//         {/* Buttons */}
//         <div className="user-profile-btns">
//           <NavLink to="/UsersViewLibrary/user:_id" onClick={handleViewLibraryButtonClick}>View Library</NavLink>
//         </div>
//       </div>
//     </div>
//   );
// }

