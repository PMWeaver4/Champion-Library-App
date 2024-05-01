import { useEffect, useState } from "react";
import { getToken } from "../../localStorage";
import config from "../../config.json";
export default function DropDownMenu() {
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

  const handleChangeSelectedUser = (event) => {
    setSelectedUser(event.target.value);
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${config.backend_url}user/all/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const { Created: usersArray } = await response.json();
        // Extract users from the 'Created' key
        setUsers(usersArray);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error: display error message to the user, log the error, etc.
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <label htmlFor="dropdown">To: </label>
      <select name="dropdown" value={selectedUser} onChange={handleChangeSelectedUser}>
        <option value=""> Select User </option>
        {users.map((user) => (
          <option value={user.email}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>
    </div>
  );
}
