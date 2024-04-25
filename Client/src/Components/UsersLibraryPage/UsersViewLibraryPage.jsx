import React from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { getToken } from "../../localStorage";



export default function UsersViewLibraryPage( { user }) {
    const [items, setItems] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // State to store selected user
    const [loading, setLoading] = useState(true);
    const token = getToken();


    useEffect(() => {
        const fetchUserItems = async () => {
          try {
            const response = await fetch(`${config.backend_url}library/availablebooks/`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
    
            if (!response.ok) {
              throw new Error("Failed to fetch user items");
            }
    
            const data = await response.json();
            setItems(data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching user items:", error);
            setLoading(false);
          }
        };
        fetchUserItems();
    }, [user, token]);

    const handleUserSelection = (user) => {
        setSelectedUser(user);
      };

      return (
        <main className="users-viewAll-page">
          <PageTemplate pageTitle="User's Library">
            {loading ? (
              <p>Loading...</p>
            ) : items.length === 0 ? (
              <p>No items found.</p>
            ) : (
              <div className="items-grid">
                {/* Render items here */}
                {items.map((item) => (
                  // Render each item as a card, grid item, or list item
                  <div key={item.id} className="item-card">
                    <h2>{item.title}</h2>
                    {/* Add additional item details */}
                  </div>
                ))}
              </div>
            )}
          </PageTemplate>
        </main>
      );
    }
    
  