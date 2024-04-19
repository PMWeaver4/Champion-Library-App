import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@shadcn/components/ui/carousel";
import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import MyLoanedBooks from "../../Components/PopupsForLibrary/LoanedPopups/LoanedBooks";
import MyLoanedGames from "../../Components/PopupsForLibrary/LoanedPopups/LoanedGames";
import MyLoanedItems from "../../Components/PopupsForLibrary/LoanedPopups/LoanedItems";

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
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5"></CarouselItem>
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
