import { useState } from "react";
import config from "../../config.json"; // my fetch url to backend
import { getToken } from "../../localStorage";
export default function AddItems({ onClosePopup }) {
  // for adding misc.
  const [newMiscTitle, setNewMiscTitle] = useState("");
  const [newMiscDescription, setNewMiscDescription] = useState("");

  async function handleNewItemSubmit(event) {
    event.preventDefault();

    const itemData = {
      itemName: newMiscTitle,
      description: newMiscDescription,
      itemType: "other",
    };

    fetch(config.backend_url + `item/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("Something went wrong while adding an item");
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        alert(`${itemData.itemName} was successfully added!`);
        onClosePopup();
        setNewMiscTitle("");
        setNewMiscDescription("");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add the item.");
      });
  }

  return (
    <div className="popup-background">
      <div className="popup">
        <div className="popup-inner">
          <h2 className="title"> Add New Item 📦</h2>
          <form className="popup-form" onSubmit={handleNewItemSubmit}>
            <label className="form-label" htmlFor="newMiscTitle">
              {" "}
              Title:{" "}
            </label>

            <input
              type="text"
              placeholder="Enter Item Name"
              id="newMiscTitle"
              value={newMiscTitle}
              onChange={(e) => setNewMiscTitle(e.target.value)}
              required
            />

            <label className="form-label" htmlFor="newMiscDescription">
              {" "}
              Description:{" "}
            </label>

            <textarea
              className="input-description"
              type="text"
              placeholder="Enter Item Description"
              id="newMiscDescription"
              value={newMiscDescription}
              onChange={(e) => setNewMiscDescription(e.target.value)}
              required
            />

            <button className="popup-btn" type="submit">
              {" "}
              Add Item{" "}
            </button>
          </form>
          <button className="close-popup" onClick={onClosePopup}>
            {" "}
            Close{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
