import { useState } from "react";

export default function AddItems({ onClosePopup }) {
  // for adding misc.
  const [newMiscTitle, setNewMiscTitle] = useState("");
  const [newMiscDescription, setNewMiscDescription] = useState("");

  function handleNewMiscSubmit(event) {
    event.preventDefault();
    // send data to database
    console.log("New misc data:", newMiscName, newMiscDescription);
    // reset input fields
    setNewMiscName("");
    setNewMiscDescription("");
    // Close the popup
    setShowAddMiscPopup(false);
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2 className="title"> Add New Item 📦</h2>
        <form className="popup-form" onSubmit={handleNewMiscSubmit}>
          <label className="form-label" htmlFor="newMiscTitle">
            {" "}
            Title:{" "}
          </label>

          <input
            type="text"
            placeholder="Enter your new Misc. Title: "
            id="newMiscTitle"
            value={newMiscTitle}
            onChange={(e) => setNewMiscTitle(e.target.value)}
            required
          />

          <label className="form-label" htmlFor="newMiscDescription">
            {" "}
            Description:{" "}
          </label>

          <input
            className="input-description"
            type="text"
            placeholder="Enter Misc. item Description"
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
        <button className="popup-btn" onClick={onClosePopup}>
          {" "}
          Close{" "}
        </button>
      </div>
    </div>
  );
}
