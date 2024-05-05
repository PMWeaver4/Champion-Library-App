import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@shadcn/components/ui/carousel";
import { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import MyLoanedBooks from "../../Components/PopupsForLibrary/LoanedPopups/LoanedBooks";
import MyLoanedGames from "../../Components/PopupsForLibrary/LoanedPopups/LoanedGames";
import MyLoanedItems from "../../Components/PopupsForLibrary/LoanedPopups/LoanedItems";
import config from "../../config.json";
import { getToken, getUserId } from "../../localStorage";
import BookTile from "../../Components/ItemTIles/BookTile";
import GameTile from "../../Components/ItemTIles/GameTile";
import OtherTile from "../../Components/ItemTIles/OtherTile";

const MyLoanedPopupsEnum = {
  None: 0,
  AllBooks: 1,
  AllGames: 2,
  AllOther: 3,
};

export default function MyLoaned() {
  const [loanedPopupState, setLoanedPopupState] = useState(MyLoanedPopupsEnum.None);

  function openLoanedPopup(newState) {
    setLoanedPopupState(newState);
  }

  function getCurrentOpennedPopup() {
    switch (loanedPopupState) {
      case MyLoanedPopupsEnum.AllBooks:
        return <MyLoanedBooks onClose={closeLoanedPopup} />;
      case MyLoanedPopupsEnum.AllGames:
        return <MyLoanedGames onClose={closeLoanedPopup} />;
      case MyLoanedPopupsEnum.AllOther:
        return <MyLoanedItems onClose={closeLoanedPopup} />;
      default:
        return null;
    }
  }

  function closeLoanedPopup() {
    setLoanedPopupState(MyLoanedPopupsEnum.None);
  }

    //? -------------- All Users LOANED Books---------------
    const [books, setBooks] = useState([]);
    useEffect(() => {
      const fetchLoanedBooks = async () => {
        try {
          const response = await fetch(config.backend_url + `library/loanedBooks/${getUserId()}`, {
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
          console.error("Failed to fetch loaned books:", error);
        }
      };
  
      fetchLoanedBooks();
    }, []);
  
    //? -------------- All users LOANED items---------------

    const [otherItems, setOtherItems] = useState([]);
  
    async function getAllUsersLoanedItems() {
      const response = await fetch(config.backend_url + `library/loanedItems/${getUserId()}`, {
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
      getAllUsersLoanedItems();
    }, []);
  
       //? -------------- All users LOANED games---------------

       const [games, setGames] = useState([]);
  
       //change get request or create separate for items and games?
       async function getAllUsersLoanedGames() {
         const response = await fetch(config.backend_url + `library/loanedGames/${getUserId()}`, {
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
         getAllUsersLoanedGames();
       }, []);

  return (
    <main className="loaned-page">
      <PageTemplate pageTitle="Loaned">
        {loanedPopupState == MyLoanedPopupsEnum.None && (
          <div className="loaned-body">
            <div className="library-msg">Loaned To Users</div>
            <nav className="library-nav">
              <ul>
                <li className="not-selected">
                  <NavLink to="/my-library">Library</NavLink>
                </li>
                <li className="not-selected">
                  <NavLink to="/my-library/borrowed">Borrowed</NavLink>
                </li>
                <li className="selected">
                  <NavLink to="/my-library/loaned">Loaned</NavLink>
                </li>
              </ul>
            </nav>
            <div className="books-container">
              <div className="view-container">
                <h3>Loaned Books</h3>
                <button className="view-btn view-books-btn" onClick={() => openLoanedPopup(MyLoanedPopupsEnum.AllBooks)}>
                  View all
                </button>
              </div>
              <Carousel className="w-8/12 self-center">
                <CarouselContent>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="board-games-container">
              <div className="view-container">
                <h3>Loaned Games</h3>
                <button className="view-btn view-boardgames-btn" onClick={() => openLoanedPopup(MyLoanedPopupsEnum.AllGames)}>
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
                <h3>Loaned Items</h3>
                <button className="view-btn view-others-btn" onClick={() => openLoanedPopup(MyLoanedPopupsEnum.AllOther)}>
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
        {loanedPopupState !== MyLoanedPopupsEnum.None && getCurrentOpennedPopup()}
      </PageTemplate>
    </main>
  );
}
