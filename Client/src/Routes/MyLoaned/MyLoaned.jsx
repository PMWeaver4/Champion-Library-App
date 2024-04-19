import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@shadcn/components/ui/carousel";
import { NavLink, Navigate } from "react-router-dom";
export default function MyLoaned() {
  return (
    <main className="loaned-page">
      <PageTemplate pageTitle="Loaned">
        <div className="loaned-body">
          <nav className="library-nav">
            <ul>
              <li className="not-selected">
                <NavLink to="/my-library"> My Library</NavLink>
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
              <NavLink to="" className="view-btn view-books-btn">
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
          <div className="board-games-container">
            <div className="view-container">
              <h3>Loaned Games</h3>
              <NavLink to="" className="view-btn view-boardgames-btn">
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
              <h3>Loaned Items</h3>
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
      </PageTemplate>
    </main>
  );
}
