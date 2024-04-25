import { useState, useEffect } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter and Routes
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import UserProfileCard from "../../Components/UserComponents/UserProfileCard";
import UserTile from "../../Components/UserComponents/UserTile";
import config from "../../config.json";
import { getToken } from "../../localStorage";


export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]); 
  const token = getToken();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`${config.backend_url}user/all/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        } 
        const data = await response.json();
        // Extract users from the 'Created' key
        const usersArray = data.Created || [];
        setUsers(usersArray);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error: display error message to the user, log the error, etc.
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersData();
  }, []);


  // function to handle clicks on user tile
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  

  return (
    <main className="users-page">
      <PageTemplate pageTitle="Users">
        <div className="users-body">
          {/* Check if users array is empty */}
          {isLoading ? (
            <p>Loading...</p>
          ) : users.length === 0 ? (
            <p>No users found</p>
          ) : (
             /* Render user tiles */
             users.map((user) => (
              <UserTile key={user._id} user={user} onClick={handleUserClick} />
            ))
          )}
        </div>
        {selectedUser && <UserProfileCard user={selectedUser} userId={selectedUser._id} />}
      </PageTemplate>
    </main>
  );
}
