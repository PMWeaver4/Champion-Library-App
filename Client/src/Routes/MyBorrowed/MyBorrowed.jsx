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
  const [books, setBooks] = useState([]); // State to store borrowed books
  const [otherItems, setOtherItems] = useState([]); // State to store borrowed items
  const [games, setGames] = useState([]); // State to store borrowed games

  // Function to open the appropriate popup
  function openBorrowedPopup(newState) {
    setBorrowedPopupState(newState);
  }

  // Function to return the currently opened popup component
  function getCurrentOpenedPopup() {
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

  // Function to close the popup
  function closeBorrowedPopup() {
    setBorrowedPopupState(MyBorrowedPopupsEnum.None);
  }

  // Fetch borrowed books
  const fetchBorrowedBooks = async () => {
    try {
      const response = await fetch(config.backend_url + `library/borrowedBooks/${getUserId()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status !== 200){
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setBooks(data.books);
    } catch (error) {
      console.error("Failed to fetch borrowed books:", error);
    }
  } 

  // Fetch borrowed items
  const fetchBorrowedItems = async () => {
    try {
      const response = await fetch(config.backend_url + `library/borrowedItems/${getUserId()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();
      setOtherItems(data.items);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };

  // Fetch borrowed games
  const fetchBorrowedGames = async () => {
    try {
      const response = await fetch(config.backend_url + `library/borrowedGames/${getUserId()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      const data = await response.json();
      setGames(data.games);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  // useEffect hooks to fetch data when the component mounts
  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  useEffect(() => {
    fetchBorrowedItems();
  }, []);

  useEffect(() => {
    fetchBorrowedGames();
  }, []);

  return (
    <main className="borrowed-page">
      <PageTemplate pageTitle="Borrowed">
        {borrowedPopupState === MyBorrowedPopupsEnum.None && (
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
                <h3>Borrowed Games</h3>
                <button className="view-btn view-boardgames-btn" onClick={() => openBorrowedPopup(MyBorrowedPopupsEnum.AllGames)}>
                  View all
                </button>
              </div>
              <Carousel className="w-8/12 self-center">
                <CarouselContent>
                  {games.map((game, index) => (
                    <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
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
                <h3>Borrowed Items</h3>
                <button className="view-btn view-others-btn" onClick={() => openBorrowedPopup(MyBorrowedPopupsEnum.AllOther)}>
                  View all
                </button>
              </div>
              <Carousel className="w-8/12 self-center">
                <CarouselContent>
                  {otherItems.map((other, index) => (
                    <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                      <OtherTile other={other} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        )}
        {borrowedPopupState !== MyBorrowedPopupsEnum.None && getCurrentOpenedPopup()}
      </PageTemplate>
    </main>
  );
}
