import { useEffect, useState } from "react";
import config from "../../../config.json";
import { getToken } from "../../../localStorage";
import CurrentUserTile from "../AdminComponentTiles/CurrentUserTile";

export default function CurrentUsers({ onCloseWidget }) {

  const [currentUsers, setCurrentUsers] = useState([]);

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
          <CurrentUserTile key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}
