import React, { useState, useEffect} from "react";
import config from "../../config.json";
import { getToken, clearStorage} from "../../localStorage";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

export default  function EditDeleteItem ( ) {
    const [item, setItem] = useState(null);
    const {itemId } = useParams();
    const [DeletePopup, setDeletePopup] = useState(false);
    const token = getToken();
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const nav = useNavigate();
    const [editItem, setEditItem] = useState({
        title: "",
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
            // If the itemType is "game", set gameItems
            if (data.itemType === "game") {
              setGameItems(data);
          }
            // populate edit game/item with fetched data
            setEditItem({
              title: data.title,
              description: data.description,
            });
            console.log(data)
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
            // Set success message
            setMessage("Item data updated successfully"); 
            // Update local storage with new book data
            saveTitle(editItem.title);
            saveDescription(editItem.description);
          } else {
            // Set error message
            setMessage("Unable to update Item information"); 
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
            setMessage("Item deleted successfully");
            clearStorage(); // Clear local storage
            
            setTimeout(() => {
              setMessage("");
              nav("/home");
            }, 3000);
          } else {
            setMessage("Unable to delete Item");
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
    const cancelDeleteItem = () => {
        // Hide delete popup
        setDeletePopup(false);
    };

    return (
        <main>
        {item ? (
            <div>
              {/* Edit and Delete buttons */}
              <button onClick={handleEditItem}>Edit</button>
              <button onClick={handleDeleteItem}>Delete</button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          {DeletePopup && (
            <div className="delete-Item-popup">
              <h1> Are you sure you want to delete this Item? </h1>
              <button className="yes-delete-btn" onClick={handleDeleteItem}> Yes </button>
              <button className="no-delete-btn" onClick={confirmDelete}> No </button>
            </div>
          )}
          {editPopupVisible && (
            <div className="edit-Item-popup">
              {/* Form to edit book details */}
              <h1>Edit Item Information</h1>
              <form className="Form" onSubmit={handleItemUpdate}>
                <label htmlFor="title">Title:</label>
                <input
                  required={true}
                  type="text"
                  id="title"
                  name="title"
                  value={editItem.title}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                  required={true}
                  id="description"
                  name="description"
                  value={editItem.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                />
                {/* Input fields for book details */}
                <button type="submit">Save Changes</button>
                <button onClick={cancelItemUpdate}> Cancel</button>
              </form>
              {message && <p>{message}</p>}
            </div>
          )}
        </main>
    );
}