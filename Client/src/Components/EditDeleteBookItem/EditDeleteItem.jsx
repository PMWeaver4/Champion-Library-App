import { useState, useEffect} from "react";
import config from "../../config.json";
// import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { getToken, clearStorage, getTitle, getDescription} from "../../localStorage";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
// import GamesProfileCard from "../../Components/ItemProfileCard/GamesProfileCard";
// import OtherProfileCard from "../../Components/ItemProfileCard/OtherProfileCard";

export default  function EditDeleteItem ( ) {
    const [item, setItem] = useState(null);
    const {itemId } = useParams();
    const [DeletePopup, setDeletePopup] = useState(false);
    const token = getToken();
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const nav = useNavigate();
    const [editItem, setEditItem] = useState({
        Title: getTitle(),
        Description: getDescription(),
      });


    useEffect(() => {
        // Fetch user data from the backend when the component mounts
        const fetchUserData = async () => {
          try {
            // Retrieve token from local storage or wherever it's stored
            const token = getToken(); 
            const response = await fetch(`${config.backend_url}user`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
            } else {
              console.error("Error fetching user data:", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUserData();
      }, [token]);

    useEffect(() => {
        async function fetchItem() {
          try {
            const response = await fetch(`${config.backend_url}item/item/${item._id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
              },
            });
            if (response.status !== 200) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setItem(data);
            console.log(data)
          } catch (error) {
            console.error("Failed to fetch item:", error.message);
          }
        }
        fetchItem();
      }, [itemId]);

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
            saveTitle(editBook.Title);
            saveDescription(editBook.Description);
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
              nav("/home" || "/my-library");
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
              <button className="no-delete-btn" onClick={cancelDeleteItem}> No </button>
            </div>
          )}
          {editPopupVisible && (
            <div className="edit-Item-popup">
              {/* Form to edit book details */}
              <h1>Edit Book Information</h1>
              <form className="Form" onSubmit={handleItemUpdate}>
                <label htmlFor="title">Title:</label>
                <input
                  required={true}
                  type="text"
                  id="title"
                  name="title"
                  value={editItem.Title}
                  onChange={(e) => setEditItem({ ...editItem, Title: e.target.value })}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                  required={true}
                  id="description"
                  name="description"
                  value={editItem.Description}
                  onChange={(e) => setEditItem({ ...editItem, Description: e.target.value })}
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