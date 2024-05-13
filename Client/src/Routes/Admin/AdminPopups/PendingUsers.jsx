import { useEffect, useState } from "react";
import PendingUserTile from "../AdminComponentTiles/PendingUserTile";
import config from "../../../config.json";
import { getToken } from "../../../localStorage";

export default function PendingUsers({ onCloseWidget }) {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    async function fetchPendingUsers() {
      try {
        const response = await fetch(`${config.backend_url}user/allPending`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setPendingUsers(data.Created);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error: display error message to the user, log the error, etc.
      }
    }
    fetchPendingUsers();
  }, []);

  return (
    <div className="admin-popup">
      <button onClick={onCloseWidget} className="exit-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h1>Pending Users</h1>
      <h2>New users await your response...</h2>
      <div className="admin-popup-body">
        {pendingUsers.map((user) => (
          <PendingUserTile key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}
