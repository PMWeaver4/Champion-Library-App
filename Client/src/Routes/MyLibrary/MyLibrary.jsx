import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@shadcn/components/ui/carousel";
import { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import MyItems from "../../Components/PopupsForLibrary/LibraryPopups/MyItems";
import MyGames from "../../Components/PopupsForLibrary/LibraryPopups/MyGames";
import MyBooks from "../../Components/PopupsForLibrary/LibraryPopups/MyBooks";
import config from "../../config.json";
import { getToken, getUserId } from "../../localStorage";
import BookTile from "../../Components/ItemTIles/BookTile";
const MyLibraryPopupsEnum = {
  None: 0,
  AllBooks: 1,
  AllGames: 2,
  AllOther: 3,
};

export default function MyLibrary() {
  const [libraryPopupState, setLibraryPopupState] = useState(MyLibraryPopupsEnum.None);

  function openLibraryPopup(newState) {
    setLibraryPopupState(newState);
  }

  function getCurrentOpennedPopup() {
    switch (libraryPopupState) {
      case MyLibraryPopupsEnum.AllBooks:
        return <MyBooks onClose={closeLibraryPopup} />;
      case MyLibraryPopupsEnum.AllGames:
        return <MyGames onClose={closeLibraryPopup} />;
      case MyLibraryPopupsEnum.AllOther:
        return <MyItems onClose={closeLibraryPopup} />;
      default:
        return null;
    }
  }

  function closeLibraryPopup() {
    setLibraryPopupState(MyLibraryPopupsEnum.None);
  }

  //? -------------- All Users Books---------------
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(config.backend_url + `library/books/${getUserId()}`, {
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

  //? -------------- All Users Games---------------

  //? -------------- All Users Items---------------

  return (
    <main className="library-page">
      <PageTemplate pageTitle="Library">
        {libraryPopupState == MyLibraryPopupsEnum.None && (
          <div className="library-body">
            <div className="library-msg">Your Personal Library</div>
            <nav className="library-nav">
              <ul>
                <li className="selected">
                  <NavLink> Library</NavLink>
                </li>
                <li>
                  <NavLink to="/my-library/borrowed">Borrowed</NavLink>
                </li>
                <li className="not-selected">
                  <NavLink to="/my-library/loaned">Loaned</NavLink>
                </li>
              </ul>
            </nav>
            <div className="books-container">
              <div className="view-container">
                <h3>Books</h3>
                <button className="view-btn view-books-btn" onClick={() => openLibraryPopup(MyLibraryPopupsEnum.AllBooks)}>
                  View all
                </button>
              </div>
              <Carousel className="w-8/12 self-center">
                <CarouselContent>
                {books.map((book, index) => (
                  <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile book={book}/>
                  </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="board-games-container">
              <div className="view-container">
                <h3>Games</h3>
                <button className="view-btn view-boardgames-btn" onClick={() => openLibraryPopup(MyLibraryPopupsEnum.AllGames)}>
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
                <h3>Items</h3>
                <button className="view-btn view-others-btn" onClick={() => openLibraryPopup(MyLibraryPopupsEnum.AllOther)}>
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
        {libraryPopupState !== MyLibraryPopupsEnum.None && getCurrentOpennedPopup()}
      </PageTemplate>
    </main>
  );
}

// ! change ther navlink for view all to button tag and add onClick={() => openWidgetPopup(widgetPopupsEnum.PendingUsers)}
