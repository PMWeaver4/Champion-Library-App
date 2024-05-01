import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@shadcn/components/ui/carousel";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MyBorrowedBooks from "../../Components/PopupsForLibrary/BorrowedPopups/BorrowedBooks";
import MyBorrowedGames from "../../Components/PopupsForLibrary/BorrowedPopups/BorrowedGames";
import MyBorrowedItems from "../../Components/PopupsForLibrary/BorrowedPopups/BorrowedItems";
import config from "../../config.json";
import { getToken, getUserId } from "../../localStorage";
import BookTile from "../../Components/ItemTIles/BookTile";
import GameTile from "../../Components/ItemTIles/GameTile";
import OtherTile from "../../Components/ItemTIles/OtherTile";

const MyBorrowedPopupsEnum = {
  None: 0,
  AllBooks: 1,
  AllGames: 2,
  AllOther: 3,
};

export default function MyBorrowed() {
  const [borrowedPopupState, setBorrowedPopupState] = useState(MyBorrowedPopupsEnum.None);

  function openBorrowedPopup(newState) {
    setBorrowedPopupState(newState);
  }

  function getCurrentOpennedPopup() {
    switch (borrowedPopupState) {
      case MyBorrowedPopupsEnum.AllBooks:
        return <MyBorrowedBooks onClose={closeBorrowedPopup} />;
      case MyBorrowedPopupsEnum.AllGames:
        return <MyBorrowedGames onClose={closeBorrowedPopup} />;
      case MyBorrowedPopupsEnum.AllOther:
        return <MyBorrowedItems onClose={closeBorrowedPopup} />;
      default:
        return null;
    }
  }

  function closeBorrowedPopup() {
    setBorrowedPopupState(MyBorrowedPopupsEnum.None);
  }
    //? -------------- All Users BORROWED Books---------------
    const [books, setBooks] = useState([]);
    useEffect(() => {
      const fetchBorrowedBooks = async () => {
        try {
          const response = await fetch(config.backend_url + `library/borrowedBooks/${getUserId()}`, {
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
  
      fetchBorrowedBooks();
    }, []);
  
    //? -------------- All users BORROWED items---------------

    const [otherItems, setOtherItems] = useState([]);
  
    async function getAllUsersBorrowedItems() {
      const response = await fetch(config.backend_url + `library/borrowedItems/${getUserId()}`, {
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
      setOtherItems(itemData);

    }
  
    useEffect(() => {
      getAllUsersBorrowedItems();
    }, []);
  
       //? -------------- All users BORROWED games---------------

       const [games, setGames] = useState([]);
  
       //change get request or create separate for items and games?
       async function getAllUsersBorrowedGames() {
         const response = await fetch(config.backend_url + `library/borrowedGames/${getUserId()}`, {
           method: "GET",
           headers: {
             Authorization: `Bearer ${getToken()}`,
           },
         });
         const gameData = await response.json(); // the response is directly an array of items
         if (response.status !== 200) {
           console.error("Failed to fetch items");
           return;
         }
         setGames(gameData);
   
       }
     
       useEffect(() => {
         getAllUsersBorrowedGames();
       }, []);


  return (
    <main className="borrowed-page">
      <PageTemplate pageTitle="Borrowed">
        {borrowedPopupState == MyBorrowedPopupsEnum.None && (
          <div className="borrowed-body">
            <div className="library-msg"> Currently Borrowed</div>
            <nav className="library-nav">
              <ul>
                <li className="not-selected">
                  <NavLink to="/my-library">Library</NavLink>
                </li>
                <li className="selected">
                  <NavLink to="/my-library/borrowed">Borrowed</NavLink>
                </li>
                <li className="not-selected">
                  <NavLink to="/my-library/loaned">Loaned</NavLink>
                </li>
              </ul>
            </nav>
            <div className="books-container">
              <div className="view-container">
                <h3>Borrowed Books</h3>
                <button className="view-btn view-books-btn" onClick={() => openBorrowedPopup(MyBorrowedPopupsEnum.AllBooks)}>
                  View all
                </button>
              </div>
              <Carousel className="w-8/12 self-center">
                <CarouselContent>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5"></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="board-games-container">
              <div className="view-container">
                <h3>Borrowed Games</h3>
                <button className="view-btn view-boardgames-btn" onClick={() => openBorrowedPopup(MyBorrowedPopupsEnum.AllGames)}>
                  View all
                </button>
              </div>
              <Carousel className="w-8/12 self-center">
                <CarouselContent>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5"></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="others-container">
              <div className="view-container">
                <h3>Borrowed Items</h3>
                <button className="view-btn view-others-btn" onClick={() => openBorrowedPopup(MyBorrowedPopupsEnum.AllOther)}>
                  View all
                </button>
              </div>
              <Carousel className="w-8/12 self-center">
                <CarouselContent>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5"></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        )}
        {borrowedPopupState !== MyBorrowedPopupsEnum.None && getCurrentOpennedPopup()}
      </PageTemplate>
    </main>
  );
}
