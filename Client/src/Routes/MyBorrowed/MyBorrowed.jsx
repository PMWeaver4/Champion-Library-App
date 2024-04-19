import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@shadcn/components/ui/carousel";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import MyBorrowedBooks from "../../Components/PopupsForLibrary/BorrowedPopups/BorrowedBooks";
import MyBorrowedGames from "../../Components/PopupsForLibrary/BorrowedPopups/BorrowedGames";
import MyBorrowedItems from "../../Components/PopupsForLibrary/BorrowedPopups/BorrowedItems";

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

  return (
    <main className="borrowed-page">
      <PageTemplate pageTitle="Borrowed">
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
        {borrowedPopupState !== MyBorrowedPopupsEnum.None && getCurrentOpennedPopup()}
      </PageTemplate>
    </main>
  );
}
