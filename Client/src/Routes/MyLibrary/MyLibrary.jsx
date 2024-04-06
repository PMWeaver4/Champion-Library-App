import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";


// TODO implement logic to grab books, game, etc from data base. Might have to add a add book option and a return book option.


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
      <Navigation toggleMenu={toggleMenu} pageTitle="My Library" />
      {isMenuOpen && <MenuPopup />}

      <div className="tabs">
        <div className={activeTab === "myLibrary" ? "active" : ""} onClick={() => handleTabChange("myLibrary")}> My Library </div>

        <div className={activeTab === "borrowed" ? "active" : ""} onClick={() => handleTabChange("borrowed")}> Borrowed </div>

        <div className={activeTab === "lent" ? "active" : ""} onClick={() => handleTabChange("lent")}> Lent </div>
      </div>  
      
      <div className="Library-display-container">
        {activeTab === "myLibrary" && (
          <>
            <div className="display-shelf-headers">
              <h3>Books in My Library</h3>
              <button className="view-books-btn">View All</button>
            </div>
            <div className="display-shelf books"></div>
            <div className="display-shelf-headers">
              <h3>Board Games in My Library</h3>
              <button className="view-games-btn">View All</button>
            </div>
            <div className="display-shelf boardgames"></div>
            <div className="display-shelf-headers">
              <h3>Miscellaneous Items in My Library</h3>
              <button className="view-items-btn">View All</button>
            </div>
            <div className="display-shelf items"></div>
          </>
        )}

        {activeTab === "borrowed" && (
          <>
            <div className="Library-shelf-headers">
              <h3>Books Borrowed</h3>
              <button className="view-books-btn">View All</button>
            </div>
            <div className="display-shelf books"></div>
            <div className="display-shelf-headers">
              <h3>Board Games Borrowed</h3>
              <button className="view-games-btn">View All</button>
            </div>
            <div className="display-shelf boardgames"></div>
            <div className="display-shelf-headers">
              <h3>Miscellaneous Items Borrowed</h3>
              <button className="view-items-btn">View All</button>
            </div>
            <div className="display-shelf items"></div>
          </>
        )}

        {activeTab === "lent" && (
          <>
            <div className="lent-shelf-headers">
              <h3>Books Lent</h3>
              <button className="view-books-btn">View All</button>
            </div>
            <div className="display-shelf books"></div>
            <div className="display-shelf-headers">
              <h3>Board Games Lent</h3>
              <button className="view-games-btn">View All</button>
            </div>
            <div className="display-shelf boardgames"></div>
            <div className="display-shelf-headers">
              <h3>Miscellaneous Items Lent</h3>
              <button className="view-items-btn">View All</button>
            </div>
            <div className="display-shelf items"></div>
          </>
        )}
      </div>
    </main>
  );
  }