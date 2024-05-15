import { useEffect, useState } from "react";
import config from "../../../config.json";
import { getToken } from "../../../localStorage";
import CurrentUserTile from "../AdminComponentTiles/CurrentUserTile";

export default function CurrentUsers({ onCloseWidget }) {

  const [currentUsers, setCurrentUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);  // State to hold user to be potentially deleted

  useEffect(() => {
    async function fetchCurrentUsers() {
      try {
        const response = await fetch(`${config.backend_url}user/allAccepted`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (response.status !== 200) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setCurrentUsers(data.Created);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchCurrentUsers();
  }, []);

  const handleDelete = (userId) => {
    setUserToDelete(userId); // Set the user to delete
  };

  const onConfirmDelete = async () => {
    try {
      const response = await fetch(`${config.backend_url}user/delete/${userToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status !== 200) {
        throw new Error("Failed to delete user");
      }
      setCurrentUsers(currentUsers.filter(user => user._id !== userToDelete)); // Update UI
      setUserToDelete(null); // Reset deletion candidate
      alert("User successfully deleted.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user.")
    }
  };

  const onCancel = () => {
    setUserToDelete(null); // User decided not to delete
  };


  useEffect(() => {
    async function fetchCurrentUsers() {
      try {
        const response = await fetch(`${config.backend_url}user/allAccepted`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setCurrentUsers(data.Created);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error: display error message to the user, log the error, etc.
      }
    }
    fetchCurrentUsers();
  }, []);

  return (
    <div className="admin-popup">
      <button onClick={onCloseWidget} className="exit-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h1>Current Users</h1>
      <h2>All Approved Users</h2>
      <div className="admin-popup-body">
      {currentUsers.map((user) => (
          <CurrentUserTile key={user._id} user={user} onDelete={handleDelete} />
        ))}
      </div>
      {userToDelete && (
      <div className="InboxPopup">
        <div className="inbox-popup-content">
          <h2>Delete User from database?</h2>
          <div className="inbox-buttons">
          <button className="yes-button" onClick={onConfirmDelete}>Yes</button>
          <button className="no-button" onClick={onCancel}>No</button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
