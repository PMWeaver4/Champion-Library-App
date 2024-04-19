import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@shadcn/components/ui/carousel";
import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import MyItems from "../../Components/PopupsForLibrary/LibraryPopups/MyItems";
import MyGames from "../../Components/PopupsForLibrary/LibraryPopups/MyGames";
import MyBooks from "../../Components/PopupsForLibrary/LibraryPopups/MyBooks";

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
        return <MyBooks onClose={closeLibraryPopup}/>;
      case MyLibraryPopupsEnum.AllGames:
        return <MyGames onClose={closeLibraryPopup}/> ;
      case MyLibraryPopupsEnum.AllOther:
        return <MyItems onClose={closeLibraryPopup} />;
      default:
        return null;
    }
  }

  function closeLibraryPopup() {
    setLibraryPopupState(MyLibraryPopupsEnum.None);
  }

  return (
    <main className="library-page">
      <PageTemplate pageTitle="Library">
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
                <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5"></CarouselItem>
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
        {libraryPopupState !== MyLibraryPopupsEnum.None && getCurrentOpennedPopup()}
      </PageTemplate>
    </main>
  );
}

// ! change ther navlink for view all to button tag and add onClick={() => openWidgetPopup(widgetPopupsEnum.PendingUsers)}
