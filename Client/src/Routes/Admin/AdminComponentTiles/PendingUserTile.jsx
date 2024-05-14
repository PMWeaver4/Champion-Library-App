import { getToken } from "../../../localStorage";
import config from "../../../config.json";

export default function PendingUserTile({ user }) {
  // Function to update user status
  const updateUserStatus = async (newStatus) => {
    try {
      const response = await fetch(`${config.backend_url}user/adminUpdate/${user.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ approved: newStatus }), // Send the new status in the request body
      });

      if (response.status !== 200) {
        throw new Error("Failed to update user status");
      }

      // Optionally, fetch updated user data or trigger a re-render/update in parent component
      alert(`User has been ${newStatus.toLowerCase()}`); // Notify the admin of the change
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user status."); // Show an error message
    }
  };
  return (
    <div className="admin-users-container">
      <div className="admin-user-tile">
        <p className="admin-username">
          <em>
            {user.firstName} {user.lastName}
          </em>
        </p>
        <p className="admin-email">{user.email}</p>

        <div className="admin-action-buttons">
          <button className="admin-accept" onClick={() => updateUserStatus("Accepted")}>
            Accept
          </button>
          <button className="admin-decline" onClick={() => updateUserStatus("Declined")}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
