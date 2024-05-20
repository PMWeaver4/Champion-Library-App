import { useEffect, useState } from "react";
import config from "../../../config.json";
import { getToken } from "../../../localStorage";

export default function EditItemPopup({ game, other, onCancel }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [itemId, setItemId] = useState("");

  // Effect to determine which item is being edited
  useEffect(() => {
    if (game) {
      setItemName(game.itemName || "");
      setDescription(game.description || "");
      setItemId(game._id);
    } else if (other) {
      setItemName(other.itemName || "");
      setDescription(other.description || "");
      setItemId(other._id);
    }
  }, [game, other]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `${config.backend_url}item/update/${itemId}`;
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemName, description }), // Ensure these keys match your backend model
    });
    if (response.status === 200) {
      alert("Item updated successfully!");
      onCancel(); // closes popup doesnt cancel any actions
    } else {
      alert("Failed to update item");
    }
  };

  return (
    <div className="EditUserModal">
      <button onClick={onCancel} className="exit-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <form className="Form" onSubmit={handleSubmit}>
        <h2 className="edit-header">Update Item Information</h2>
        <label className="form-label" htmlFor="itemName"></label>
        <input type="text" placeholder="Item Name" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        <label className="form-label" htmlFor="description">
          Description:
        </label>
        <textarea
          className="input-description"
          type="text"
          placeholder="Description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className="update" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
