import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import BookTile from "../../Components/ItemTIles/BookTile";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@shadcn/components/ui/carousel";
import GameTile from "../../Components/ItemTIles/GameTile";
import OtherTile from "../../Components/ItemTIles/OtherTile";
import { NavLink } from "react-router-dom";

// TODO implement logic to grab books, game, etc from data base for my library. 
// TODO implement logic to grab books, game, etc from data base for borrowed.
// TODO implement logic to grab books, game, etc from data base for lent.

export default function MyLibrary() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("myLibrary");

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
  }


  return (
    <main className="my-library-page">
      <PageTemplate toggleMenu={toggleMenu} pageTitle="My Library">
        {isMenuOpen && <MenuPopup/>}
           {/* tab buttons */}
      <div className="tabs">
        <div className={activeTab === "myLibrary" ? " tab active" : "tab"} onClick={() => handleTabChange("myLibrary")}> My Library </div>

        <div className={activeTab === "borrowed" ? "tab active" : "tab"} onClick={() => handleTabChange("borrowed")}> Borrowed </div>

        <div className={activeTab === "lent" ? "tab active" : "tab"} onClick={() => handleTabChange("lent")}> Lent </div>
      </div>  
      
      {/* shelves for library */}

      {/* MY LIBRARY TAB  */}
      <div className="Library-display-container" >
        {activeTab === "myLibrary" && (
          <>
            <div className="MyLibrary-shelf-headers">
              <h3> My Books</h3>
              <NavLink to="/Books-MyLibrary" className="view-btn view-myBooks-btn" > View All </NavLink> 
            </div>
           
          <Carousel className="carousel-container">
            <CarouselContent>
              <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
             </Carousel>
             
            {/* next row */}
            <div className="MyLibrary-shelf-headers">
              <h3> My Games</h3>
              <NavLink to="/Games-MyLibrary" className="view-btn view-myGames-btn"> View All </NavLink>

            </div>

            <Carousel className="carousel-container">
            <CarouselContent>
              <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                      <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                   <GameTile />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
             </Carousel>
            
            <div className="MyLibrary-shelf-headers">
              <h3> My Items </h3>
              <NavLink to="/Items-MyLibrary" className="view-btn view-myItem-btn">View All</NavLink>
            </div>

            <Carousel className="carousel-container">
            <CarouselContent>
              <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
             </Carousel>
            </>
        )}

{/* BORROWED TAB */}
        {activeTab === "borrowed" && (
          <>
            <div className="borrowed-shelf-headers">
              <h3> Borrowed Books </h3>
              <NavLink to="/BorrowedBooks-MyLibrary" className="view-btn view-borrowedBooks-btn">View All </NavLink>
            </div>
            <Carousel className="carousel-container">
            <CarouselContent>
              <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
             </Carousel>
          
            <div className="borrowed-shelf-headers">
              <h3>Borrowed Games </h3>
              <NavLink to="/BorrowedGames-MyLibrary" className="view-btn view-borrowedGame-btn">View All</NavLink>
            </div>

            <Carousel className="carousel-container">
            <CarouselContent>
              <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
             </Carousel>
            
            <div className="borrowed-shelf-headers">
              <h3> Borrowed Items </h3>
              <NavLink to="/BorrowedItems-MyLibrary" className="view-btn view-borrowedItem-btn">View All</NavLink>
            </div>
            <Carousel className="carousel-container">
            <CarouselContent>
              <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
             </Carousel>
          
          </>
        )}


        {/* LENT TAB  */}
        {activeTab === "lent" && (
          <>
            <div className="lent-shelf-headers">
              <h3> Lent Books </h3>
              <NavLink to="/LentBooks-MyLibrary" className="view-btn view-lentBooks-btn">View All</NavLink>
            </div>
            <Carousel className="carousel-container">
            <CarouselContent>
              <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <BookTile />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
             </Carousel>
           
            <div className="lent-shelf-headers">
              <h3> Lent Games </h3>
              <NavLink to="/LentGames-MyLibrary" className="view-btn view-lentGames-btn">View All</NavLink>
            </div>
            <Carousel className="carousel-container">
            <CarouselContent>
              <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <GameTile />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
             </Carousel>
            
            <div className="lent-shelf-headers">
              <h3> Lent Items </h3>
              <NavLink to="/LentItems-MyLibrary" className="view-btn view-LentItems-btn">View All</NavLink>
            </div>
            <Carousel className="carousel-container">
            <CarouselContent>
              <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <OtherTile />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
             </Carousel>
          </>
        )}
      </div>
      </PageTemplate>
    </main>
  );
}
