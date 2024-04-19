import { NavLink } from "react-router-dom";
import { useState } from "react";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import OtherTile from "../../Components/ItemTIles/OtherTile";

// TODO logic will be extension of current tab
// TODO logic for popups to submit and add new item

export default function ViewAll_LibraryGames() {
  const [showAddMiscPopup, setShowAddMiscPopup] = useState(false);

  // for adding misc. 
  const [newMiscTitle, setNewMiscTitle] = useState("");
  const [newMiscDescription, setNewMiscDescription] = useState("");

  // adding and closing misc popup
  function handleAddMiscClick() {
    setShowAddMiscPopup(true);
  }

  function handleCloseMiscPopup() {
    setShowAddMiscPopup(false);
  }

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
      <main className="all-others-page">
<PageTemplate pageTitle=" MY ITEMS">
        <div className="all-others-body">
          <div className="view-all-headers">
            <NavLink to="/my-library" >
              <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
            <h1> MY ITEMS </h1>
            <button className="add-new-btn" onClick={handleAddMiscClick}> Add New Misc. + </button>

          </div>
          <div className="view-all-grid">

          </div>
        </div>
        {/* adding misc popup */}
        {showAddMiscPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2 className="title"> New Misc. Item 💡</h2>
              <form className="popup-form" onSubmit={handleNewMiscSubmit}>
            
                <label className="form-label" htmlFor="newMiscTitle"> Title: </label>
          
                <input 
                type="text" 
                placeholder="Enter your new Misc. Title: " 
                id="newMiscTitle"  
                value={newMiscTitle} 
                onChange={(e) => setNewMiscTitle(e.target.value)} 
                required 
                />
        
                <label className="form-label" htmlFor="newMiscDescription"> Description: </label>
                
                <input className="input-description"
                type="text" 
                placeholder="Enter Misc. item Description" 
                id="newMiscDescription" 
                value={newMiscDescription} 
                onChange={(e) => setNewMiscDescription(e.target.value)}
                required
                />
            
                <button className="popup-btn" type="submit">  Add Item </button>
                
                <button className="popup-btn" onClick={handleCloseMiscPopup}> Close </button>
           
                </form>
            </div>
          </div>
        )}
      </PageTemplate>
      </main>
    )};