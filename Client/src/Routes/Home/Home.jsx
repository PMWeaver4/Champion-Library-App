// import BookProfileCard from "../../Components/BookProfileCard/BookProfileCard";

import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import Navbar from "../../Components/Navbar/Navbar";
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    // home page that contains the "dashboard or main page once logged in"
    <main className="home-page">
      <Navbar toggleMenu={toggleMenu} pageTitle="Dashboard" />
      {isMenuOpen && <MenuPopup/>}
      {/* <BookProfileCard/> */}
      {/* will need to make book profile card open when book tile is clicked same format will be done for item tile */}
      <div className="home-banner">
        <h1 className="welcome-msg">Welcome to South Meadow's Lending Library!</h1>
        <h2 className="slogan">Building Community Beyond Books</h2>
      </div>
      <div className="dashboard-display-container">
        <div className="display-shelf-headers">
          <h3>Books</h3>
          <button className="view-books-btn">View All</button>
        </div>
        <div className="display-shelf books"></div>
        <div className="display-shelf-headers">
          <h3>Board Games</h3>
          <button className="view-games-btn">View All</button>
        </div>
        <div className="display-shelf boardgames"></div>
        <div className="display-shelf-headers">
          <h3>Miscellaneous Items</h3>
          <button className="view-items-btn">View All</button>
        </div>
        <div className="display-shelf items"></div>
      </div>
    </main>
  );
}
