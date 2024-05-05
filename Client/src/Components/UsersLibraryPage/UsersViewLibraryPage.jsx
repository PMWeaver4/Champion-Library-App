import React from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@shadcn/components/ui/carousel";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { getToken, getUserId } from "../../localStorage";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import BookTile from "../../Components/ItemTIles/BookTile";
import GameTile from "../../Components/ItemTIles/GameTile";
import OtherTile from "../../Components/ItemTIles/OtherTile";
import { useLocation } from "react-router-dom";
import BookProfileCard from "../../Components/ItemProfileCard/BookProfileCard";
import { NavLink,Navigate } from "react-router-dom";


export default function UsersViewLibraryPage() {
  const [selectedBook, setSelectedBook] = useState(null); // will contain the array of books
  const [gameItems, setGameItems] = useState([]);
  const [items, setItems] = useState([]);
  const [otherItems, setOtherItems] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const user = location.state.user;

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await fetch(config.backend_url + `library/availablebooks/${user._id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });
          if (!response.status === 200) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setBooks(data.Results);
        } catch (error) {
          console.error("Failed to fetch books:", error);
        }
      };
  
      fetchBooks();
    }, []);


  async function getAllUsersItems() {
    const response = await fetch(config.backend_url + `library/availableitems/${user._id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const itemData = await response.json(); // the response is directly an array of items
    if (response.status !== 200) {
      console.error("Failed to fetch items");
      return;
    }
    setItems(itemData);
    setOtherItems(itemData.Results.filter((item) => item.itemType === "other"));
    setGameItems(itemData.Results.filter((item) => item.itemType === "game"));
  }

  useEffect(() => {
    getAllUsersItems();
  }, []);


return (
<main className="users-viewAll-page">
  <PageTemplate pageTitle="User's Library">
    <div className="users-viewAll-body">
      <div className="home-banner">
      <h1 className="welcome-msg">{user && `${user.firstName} ${user.lastName}'s Library`} <i className="fa-solid fa-book-bookmark"></i>   </h1>
      </div>
      <div>
      <NavLink to="/users" className="back-button">
                <i to="/users" className="fa-solid fa-arrow-left"></i>
                   </NavLink>
                   </div>
      {/* <NavLink to="/users" className="back-button">&#8592; Users </NavLink> */}
      {/* Render user's items */}
      <div className="User-section">
      <div className="books-container">
              <div className="view-container">
                <h3>BOOKS</h3>
              </div>
               <Carousel className="w-8/12 self-center">
                <CarouselContent>
                  {books.map((book, index) => (
                    <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                      <BookTile book={book} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              </div>
             

            <div className="board-games-container">
              <div className="view-container">
                <h3>GAMES</h3>
                {/* <button className="view-btn view-boardgames-btn" onClick={() => openLibraryPopup(MyLibraryPopupsEnum.AllGames)}>
                  View all
                </button> */}
              </div>
              <Carousel className="w-8/12 self-center">
                <CarouselContent>
                  {gameItems.map((game) => (
                    <CarouselItem key={game._id} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                      <GameTile game={game} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="others-container">
              <div className="view-container">
                <h3>OTHER</h3>
                {/* <button className="view-btn view-others-btn" onClick={() => openLibraryPopup(MyLibraryPopupsEnum.AllOther)}>
                  View all
                </button> */}
              </div>
              <Carousel className="w-8/12 self-center">
                <CarouselContent>
                  {otherItems.map((other) => (
                    <CarouselItem key={other._id} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                      <OtherTile other={other} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
          </div>
      </div>
    </div>    
    {selectedBook && <BookProfileCard book={selectedBook} onClose={() => setSelectedBook(null)} />}
  </PageTemplate>
</main>
)};
    







  
  