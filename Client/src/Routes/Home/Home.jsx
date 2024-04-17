import { useState, useEffect } from "react";
import config from "../../config.json";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@shadcn/components/ui/carousel";
// import BookProfileCard from "../../Components/BookProfileCard/BookProfileCard";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import BookTile from "../../Components/ItemTIles/BookTile";
import { NavLink, Navigate } from "react-router-dom";
import { getToken, isLoggedIn } from "../../localStorage";

// SETTINGS CONSTANTS
const MAX_NUM_ELEMENTS_IN_CAROUSEL = 10;

// RANDOMIZE AN ARRAY
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

export default function Home() {
  // this state will store the book data in frontend (initially will be an empty array)
  const [books, setBooks] = useState([]);

  async function getAvailableBooks() {
    const response = await fetch(config.backend_url + "book/allavailable", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const bookData = await response.json(); // the response is directly an array of books
    if (response.status !== 200) {
      console.error("Failed to fetch books");
      return;
    }
    shuffle(bookData); // randomise the array
    setBooks(bookData.splice(0, Math.min(bookData.length, MAX_NUM_ELEMENTS_IN_CAROUSEL))); // keep only up to MAX_NUM_ELEMENTS_IN_CAROUSEL books
  }

  useEffect(() => {
    getAvailableBooks(); // im calling the fetchBooks function
  }, []); // empty array this effect should run once when the component mounts

  return !isLoggedIn() ? (
    <Navigate to="/" replace />
  ) : (
    // home page that contains the "dashboard or main page once logged in"
    <main className="home-page">
      <PageTemplate pageTitle="HOME">
        <div className="home-body">
          <div className="home-banner">
            <h1 className="welcome-msg">Welcome to South Meadow's Lending Library!</h1>
            <h2 className="slogan">Neighborhood Book Sharing Made Easy</h2>
          </div>
          <div className="home-section">
            <div className="books-container">
              <div className="view-container">
                <h3>BOOKS</h3>
                <NavLink to="/books" className="view-btn view-books-btn">
                  View all
                </NavLink>
              </div>
              <Carousel className="w-8/12 self-center">
                <CarouselContent>
                  {/* Map over books array and create a CarouselItem for each book */}
                  {books.map((book) => (
                    <CarouselItem key={book._id} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
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
                <NavLink to="/games" className="view-btn view-boardgames-btn">
                  View all
                </NavLink>
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
                <h3>OTHER</h3>
                <NavLink to="/others" className="view-btn view-others-btn">
                  View all
                </NavLink>
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
        </div>
      </PageTemplate>
      {/* <BookProfileCard /> */}
      {/* will need to make book profile card open when book tile is clicked same format will be done for item tile */}
    </main>
  );
}
