import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@shadcn/components/ui/carousel";
// import BookProfileCard from "../../Components/BookProfileCard/BookProfileCard";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import BookTile from "../../Components/ItemTIles/BookTile";
import { NavLink } from "react-router-dom";
import GameTile from "../../Components/ItemTIles/GameTile";
import OtherTile from "../../Components/ItemTIles/OtherTile";

export default function Home() {

// this state will store the book data in frontend (initially will be an empty array)
const [books, setBooks] = useState([]);

useEffect(() => {
  const fetchBooks = async () => {
    try {
      // get request for the books
      const response = await fetch(config.backend_url +'book/allavailable');
      const bookData = await response.json();
      setBooks(bookData); // update the state with the fetched books
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };
  fetchBooks(); // im calling the fetchBooks function
}, []); // empty array this effect should run once when the component mounts

  return (
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
                  {/* this will map over the books array and create a carousel item for each book */}
                  
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                  
                  </CarouselItem>
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
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    
                  </CarouselItem>
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
