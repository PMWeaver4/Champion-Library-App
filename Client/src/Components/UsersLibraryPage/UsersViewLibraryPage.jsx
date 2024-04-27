import React from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { getToken, getUserId } from "../../localStorage";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import BookTile from "../../Components/ItemTIles/BookTile";
import GameTile from "../../Components/ItemTIles/GameTile";
import OtherTile from "../../Components/ItemTIles/OtherTile";
import { useLocation } from "react-router-dom";
import BookProfileCard from "../../Components/ItemProfileCard/BookProfileCard";
import GamesProfileCard from "../../Components/ItemProfileCard/GamesProfileCard";
import OtherProfileCard from "../../Components/ItemProfileCard/OtherProfileCard";
import { NavLink, Navigate } from "react-router-dom";


export default function UsersViewLibraryPage() {
  const [selectedUser, setSelectedUser] = useState(null); 
  const [selectedBook, setSelectedBook] = useState(null); // will contain the array of books
  // const [items, setItems] = useState([]);
  const [gameItems, setGameItems] = useState([]);
  const [otherItems, setOtherItems] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const user = location.state.user;

    
  
    useEffect(() => {
      // Fetch user data when the component mounts or when the user prop changes
      fetchUserData(user._id);
      // Fetch user's items when the component mounts or when the user prop changes
      fetchUserBooks(user._id);
      getAvailableItems(user._id);
    }, [user]);
  
  //  Function to fetch user data based on the user ID
   async function fetchUserData(user) {
    try {
      const token = getToken();
      const response = await fetch(`${config.backend_url}user/${user._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      selectedUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // Function to fetch user's items based on the user ID
  async function fetchUserBooks(user) {
    try {
      const token = getToken();
      const response = await fetch(`${config.backend_url}library/availablebooks/${user._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const booksData = await response.json();
        console.log("Books Data:", booksData);
        setBooks(booksData);
      } else {
        console.error("Failed to fetch user's books");
      }
    } catch (error) {
      console.error("Error fetching user's books:", error);
    }
  }

    function handleBookClick(bookId) {
      fetchTheBook(bookId);
    }

    async function getAvailableItems(user) {
      try {
      const token = getToken();
      const response = await fetch(`${config.backend_url}library/availableitems/${user._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       if (response.ok) {
        const itemData = await response.json();
        setOtherItems(itemData.Results.filter((item) => item.itemType === "other"));
        setGameItems(itemData.Results.filter((item) => item.itemType === "game"));
      } else {
        console.error("Failed to fetch items");
      }
    } catch (error) {
      console.error("Error fetching available items:", error);
    } finally {
      setLoading(false);
    }
  }
  
      return (
<main className="users-viewAll-page">
  <PageTemplate pageTitle="User's Library">
    <div className="users-viewAll-body">
      <div className="home-banner">
      <h1 className="welcome-msg">Welcome to {user && `${user.firstName} ${user.lastName}'s`} library 📚 </h1>
      </div>
      {/* Render user's items */}
      {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="user-items">
              {/* Render items dynamically based on their type */}
              {books.map((book) => (
                  <div key={book._id} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                <BookTile  book={book} onClick={() => handleBookClick(book._id)} />
                </div>
              ))}
              {gameItems.map((game) => (
                <div key={game._id} className="basis-1/3 md:basis-1/4 lg:basis-1/5"> 
                <GameTile game={game} />
                </div>
              ))}
              {otherItems.map((other) => (
               <div key={other._id} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                <OtherTile other={other} />
                </div>
              ))}
            </div>
          )}
    </div>    
    {selectedBook && <BookProfileCard book={selectedBook} onClose={() => setSelectedBook(null)} />}
  </PageTemplate>
</main>
)}
    

              {/* {bookItems.map((book) => {
                switch (book.type) {
                  case "book":
                    return <BookTile key={book._id} book={book} />;
                  case "game":
                    return <GameTile key={game._id} game={game} />;
                  case "other":
                    return <OtherTile key={other._id} other={other} />;
                  default:
                    return null;
                }
              } */}



{/* will need to make book profile card open when book tile is clicked same format will be done for item tile */}
    // {selectedBook && <BookProfileCard book={selectedBook} onClose={() => setSelectedBook(null)} />}







  
  