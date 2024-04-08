import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import BookTile from "../../Components/BookProfileCard/BookTile";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@shadcn/components/ui/carousel";

// TODO implement logic to grab books, game, etc from data base. Might have to add a add book option and a return book option.

export default function MyLibrary() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("myLibrary");
  const [showAddBookPopup, setShowAddBookPopup] = useState(false);
  const [showAddGamePopup, setShowAddGamePopup] = useState(false);
  const [showAddMiscPopup, setShowAddMiscPopup] = useState(false);


  // for Adding a new book
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookIsbn, setNewBookIsbn] = useState("");

  // for adding a new game
  const [newGameName, setNewGameName] = useState("");
  const [newGameDescription, setNewGameDescription ] = useState("");

  // for adding misc. 
  const [newMiscName, setNewMiscName] = useState("");
  const [newMiscDescription, setNewMiscDescription] = useState("");


  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  // Adding book and closing book popup
  function handleAddBookClick() {
    setShowAddBookPopup(true);
  }

  function handleCloseBookPopup() {
    setShowAddBookPopup(false);
  }

  // adding and closing add game popup
  function handleAddGameClick() {
    setShowAddGamePopup(true);
  }

  function handleCloseGamePopup() {
    setShowAddGamePopup(false);
  }

  // adding and closing misc popup
  function handleAddMiscClick() {
    setShowAddMiscPopup(true);
  }

  function handleCloseMiscPopup() {
    setShowAddMiscPopup(false);
  }


  function handleNewBookSubmit(event) {
    event.preventDefault();
    // submit data to backend need to add logic
    // need to use fetch to make a POST request to backend API, will do this once everything is done and we merge with backend. 
    console.log("New book data:", newBookTitle, newBookAuthor, newBookIsbn);
    // reset input fields
    setNewBookTitle("");
    setNewBookAuthor("");
    setNewBookIsbn("");
    // close the pop-up
    setShowAddBookPopup(false);
  }

  // TODO do i need to add a submit logic in the function
  function handleNewGameSubmit(event) {
    event.preventDefault();
    // send data to database
    console.log("New game data:", newGameName, newGameDescription);

    // reset input fields
    setNewGameName("");
    setNewGameDescription("");
    // close the popup
    setShowAddGamePopup(false);
  }

  function handleNewMiscSubmit(event) {
    event.preventDefault();
    // send data to database
    console.log("New misc data:", newMiscName, newMiscDescription);
    // reset input fields
    setNewMiscName("");
    setNewMiscDescription("");
    // Close the popup
    setShowAddMiscPopup(false);
  }


  return (
    <main className="my-library-page">
      <PageTemplate toggleMenu={toggleMenu} pageTitle="My Library">
        {isMenuOpen && <MenuPopup/>}
           {/* tab buttons */}
      <div className="tabs">
        <div className={activeTab === "myLibrary" ? "active" : ""} onClick={() => handleTabChange("myLibrary")}> My Library </div>

        <div className={activeTab === "borrowed" ? "active" : ""} onClick={() => handleTabChange("borrowed")}> Borrowed </div>

        <div className={activeTab === "lent" ? "active" : ""} onClick={() => handleTabChange("lent")}> Lent </div>
      </div>  
      
      {/* shelves for library */}
      <div className="Library-display-container" >
        {activeTab === "myLibrary" && (
          <>
            <div className="display-shelf-headers">
              <h3>Books in My Library</h3>
              <button className="view-books-btn">View All</button>
            </div>
           
            <div className="display-shelf books">
        
              {/* button to add new book */}
              <button className="add-new-btn" onClick={handleAddBookClick}> Add New Book + </button>
              
            </div>

            {/* next row */}
            <div className="display-shelf-headers">
              <h3>Board Games in My Library</h3>
              <button className="view-games-btn">View All</button>
            </div>
            <div className="display-shelf boardgames">
            
              {/* button to add new book */}
              <button className="add-new-btn" onClick={handleAddBookClick}> Add New Board Game + </button> 
                          
            </div>

            {/* next row */}
            <div className="display-shelf-headers">
              <h3>Miscellaneous Items in My Library</h3>
              <button className="view-items-btn">View All</button>
            </div>
            <div className="display-shelf items">
              
              {/* button to add new book */}
              <button className="add-new-btn" onClick={handleAddBookClick}> Add New Misc. + </button>
              
             
            </div> 
          </>
        )}

        {activeTab === "borrowed" && (
          <>
            <div className="Library-shelf-headers">
              <h3>Books Borrowed</h3>
              <button className="view-books-btn">View All</button>
            </div>
            <div className="display-shelf books" ></div>
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

        {/* Popups for adding new book */}
        { showAddBookPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2> Add NewBook + </h2>
                <form onSubmit={handleNewBookSubmit}> 
                <label htmlFor="newBookTitle"> Title: </label>
                <input 
                type="text" 
                placeholder="Enter your new book title " id="NewBookTitle"  
                value={newBookTitle} 
                onChange={(e) => setNewBookTitle(e.target.value)} required 
                />
            <br />
            
                <label htmlFor="newBookAuthor"> Author: </label>
                <input 
                type="text" 
                placeholder="Enter author first and last name" 
                id="newBookAuthor" 
                value={newBookAuthor} 
                onChange={(e) => setNewBookAuthor(e.target.value)}
                required
                />
            <br />
  
                <label htmlFor="newBookIsbn"> ISBN: </label>
                <input 
                type="text" 
                placeholder="Enter your books isbn" id="newBookIsbn" 
                 value={newBookIsbn} 
                 onChange={(e) => setNewBookIsbn(e.target.value)} 
                 required/>
            <br />
            <button type="submit"> Add Book </button>
            <button onClick={handleCloseBookPopup}> Close </button>
            </form>
               </div> 
          </div>
          
        )}
      </div>
      </PageTemplate>
    </main>
  );
}
