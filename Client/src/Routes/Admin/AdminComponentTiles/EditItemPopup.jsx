import { useState } from "react";
import config from "../../../config.json";

export default function EditItemPopup({ game, onClose }) {
  const [itemName, setItemName] = useState(game.title);
  const [description, setDescription] = useState(game.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement update logic here, for example:
    const response = await fetch(config.backend_url`item/update/${game._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: itemName, description }),
    });
    if (response.ok) {
      alert("Game updated successfully!");
      onClose(); // Close the popup after successful update
    } else {
      alert("Failed to update game");
    }
  };

  return (
    <div className="EditUserModal">
      <button onClick={onClose} className="exit-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <form className="Form" onSubmit={handleSubmit}>
        <h2 className="edit-header">Update Item's Information</h2>
        <label className="form-label" htmlFor="itemName">
          Title:
        </label>
        <input
          type="text"
          placeholder="Item Name"
          id="itemName"
          value={itemName} // Changed from newGameTitle to itemName
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <label className="form-label" htmlFor="description">
          Description:
        </label>
        <textarea
          className="input-description"
          type="text"
          placeholder="Description"
          id="description"
          value={description} // Changed from newGameDescription to description
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
