import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@shadcn/components/ui/carousel";

// import BookProfileCard from "../../Components/BookProfileCard/BookProfileCard";

import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import BookTile from "../../Components/BookProfileCard/BookTile";
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    // home page that contains the "dashboard or main page once logged in"
    <main className="home-page">
      <PageTemplate toggleMenu={toggleMenu} pageTitle="HOME">
        <div className="home-body">
          <div className="home-banner">
            <h1 className="welcome-msg">Welcome to South Meadow's Lending Library!</h1>
            <h2 className="slogan">Neighborhood Book Sharing Made Easy</h2>
          </div>
          <div className="home-section">
            <div className="books-container">
              <div className="view-container">
                <h3>BOOKS</h3>
                <button className="view-btn view-books-btn">View all</button>
              </div>
              <Carousel className="w-8/12 self-center">
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
            </div>
            <div className="board-games-container">
              <div className="view-container">
                <h3>GAMES</h3>
                <button className="view-btn view-boardgames-btn">View all</button>
              </div>
              <Carousel className="w-8/12 self-center">
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
            </div>
            <div className="others-container">
              <div className="view-container">
                <h3>OTHER</h3>
                <button className="view-btn view-others-btn">View all</button>
              </div>
              <Carousel className="w-8/12 self-center">
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
            </div>
          </div>
        </div>
      </PageTemplate>
      {isMenuOpen && <MenuPopup />}
      {/* <BookProfileCard /> */}
      {/* will need to make book profile card open when book tile is clicked same format will be done for item tile */}
    </main>
  );
}
