import React, { useState, useEffect} from "react";
import config from "../../config.json";
import { getToken } from "../../localStorage";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

// TODO make it only visible for owner of item
export default  function EditDeleteItem ( ) {
    const [item, setItem] = useState(null);
    const {itemId } = useParams();
    const [deletePopup, setDeletePopup] = useState(false);
    const token = getToken();
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const nav = useNavigate();
    const [editItem, setEditItem] = useState({
        itemName: "",
        description: "",
      });

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(`${config.backend_url}item/item/${itemId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            if (response.status !== 200) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setItem(data);
            // populate edit game/item with fetched data
            setEditItem({
              itemName: data.itemName,
              description: data.description,
            });
          } catch (error) {
            console.error("Failed to fetch item:", error.message);
          }
        }
        if(itemId) { // Adding a null check for itemId
          fetchData();
          
      }
      }, [itemId, token]);

        // Function to save description to local storage
      const saveDescription = (description) => {
      localStorage.setItem("description", description);
      };

      // Function to save title to local storage
      const saveTitle = (title) => {
      localStorage.setItem("title", title);
      };

      const handleItemUpdate =  async(event) => {
        event.preventDefault();
        try {  
          const response = await fetch(`${config.backend_url}item/update/${item._id}`, {
            method: "PUT",       
             body: JSON.stringify(editItem),
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`
            },
          });
          if (response.ok) {
            alert("Item data updated successfully");
            // Update local storage with new book data
            saveTitle(editItem.itemName);
            saveDescription(editItem.description);
            // Close the edit popup after successful update
            setEditPopupVisible(false);
          } else {
            alert("Unable to update item information");
          }
        } catch (error) {
          console.error("Error updating Item data:", error);
        }
      };
      const handleEditItem = () => {
        setEditPopupVisible(true);
    };
    
    const cancelItemUpdate = () => {
        // Hide edit popup
        setEditPopupVisible(false);
    };

      // function to handle item deletion
      const confirmDelete = async () => {
        try {
          const response = await fetch(`${config.backend_url}item/delete/${item._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.ok) {
            alert("Item deleted successfully"); 
            setTimeout(() => {
              // Close the edit popup after successful update
              setDeletePopup(false);
              nav("/home");
            }, 3000);
          } else {
            alert("Unable to delete Item");
          }
        } catch (error) {
          console.error("Error deleting Item:", error);
        }
      };

      //delete popup
      const handleDeleteItem = () => {
        // Show delete popup
        setDeletePopup(true);
    };
    const cancelDeletePopup = () => {
        // Hide delete popup
        setDeletePopup(false);
    };

    return (
        <main>
        {item ? (
            <div>
              {/* Edit and Delete buttons */}
              <button className="edit-button" onClick={handleEditItem}>Edit</button>
              <button  className="delete-button" onClick={handleDeleteItem}>Delete</button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          {deletePopup && (
            <div className="delete-Book-popup">
              <h1> Are you sure you want to delete this Item? </h1>
              <button className="yes-delete-btn" onClick={confirmDelete}> Yes </button>
              <button className="no-delete-btn" onClick={cancelDeletePopup}> No </button>
            </div>
          )}
          {editPopupVisible && (
            <div className="edit-item-popup">
              {/* Form to edit book details */}
              <h1>Edit Item Information</h1>
              <form className="Form" onSubmit={handleItemUpdate}>
                <label className="title-2" htmlFor="title">Title:</label>
                <input
                  required={true}
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={editItem.itemName}
                  onChange={(e) => setEditItem({ ...editItem, itemName: e.target.value })}
                />
                <label className="description-2" htmlFor="description">Description:</label>
                <textarea
                  required={true}
                  id="description"
                  name="description"
                  value={editItem.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                />
                {/* Input fields for book details */}
                <button className="save-changes-btn2" type="submit">Save Changes</button>
                <button  className="cancel-changes-btn2" onClick={cancelItemUpdate}> Cancel</button>
              </form>
            </div>
          )}
        </main>
    );
}