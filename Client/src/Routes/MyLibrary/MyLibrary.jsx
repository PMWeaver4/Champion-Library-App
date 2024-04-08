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
  const [newBookDescription, setNewBookDescription] = useState("");

  // for adding a new game
  const [newGameTitle, setNewGameTitle] = useState("");
  const [newGameDescription, setNewGameDescription ] = useState("");

  // for adding misc. 
  const [newMiscTitle, setNewMiscTitle] = useState("");
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
        <div className={activeTab === "myLibrary" ? " tab active" : "tab"} onClick={() => handleTabChange("myLibrary")}> My Library </div>

        <div className={activeTab === "borrowed" ? "tab active" : "tab"} onClick={() => handleTabChange("borrowed")}> Borrowed </div>

        <div className={activeTab === "lent" ? "tab active" : "tab"} onClick={() => handleTabChange("lent")}> Lent </div>
      </div>  
      
      {/* shelves for library */}
      <div className="Library-display-container" >
        {activeTab === "myLibrary" && (
          <>
            <div className="display-shelf-headers">
              <h3> My Books</h3>
              <button className="add-new-btn" onClick={handleAddBookClick}> Add New Book + </button>
              <button className="view-books-btn">View All</button>

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
            <div className="display-shelf-headers">
              <h3> My Games</h3>
              <button className="add-new-btn" onClick={handleAddGameClick}> Add New Game + </button> 
              <button className="view-games-btn">View All</button>

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
            
            <div className="display-shelf-headers">
              <h3> My Items </h3>
              <button className="add-new-btn" onClick={handleAddMiscClick}> Add New Misc. + </button>
              <button className="view-items-btn">View All</button>
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
            </>
        )}

{/* borrowed */}
        {activeTab === "borrowed" && (
          <>
            <div className="Library-shelf-headers">
              <h3> Borrowed Books </h3>
              <button className="view-books-btn">View All</button>
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
          
            <div className="display-shelf-headers">
              <h3>Borrowed Games </h3>
              <button className="view-games-btn">View All</button>
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
            
            <div className="display-shelf-headers">
              <h3> Borrowed Items </h3>
              <button className="view-items-btn">View All</button>
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
          
          </>
        )}

        {activeTab === "lent" && (
          <>
            <div className="lent-shelf-headers">
              <h3> Lent Books </h3>
              <button className="view-books-btn">View All</button>
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
           
            <div className="display-shelf-headers">
              <h3> Lent Games </h3>
              <button className="view-games-btn">View All</button>
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
            
            <div className="display-shelf-headers">
              <h3> Lent Items </h3>
              <button className="view-items-btn">View All</button>
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
          </>
        )}

{/* Popup overlay */}
{ (showAddBookPopup || showAddGamePopup || showAddMiscPopup) && (
  <div className="popup-overlay"></div>
)}
{/* Popup for adding new book */}
        { showAddBookPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2 className="title"> Add New Book 📚 </h2>
                <form className="popup-form"  onSubmit={handleNewBookSubmit}> 
                <br />
                <label className="form-label" htmlFor="newBookTitle"> Title: </label>
                <br />
                <input 
                type="text" 
                placeholder="Enter your new book title " id="newBookTitle"  
                value={newBookTitle} 
                onChange={(e) => setNewBookTitle(e.target.value)} required 
                />
            <br />
                <label className="form-label" htmlFor="newBookAuthor"> Author: </label>
                <br/>
                <input 
                type="text" 
                placeholder="Enter author first and last name" 
                id="newBookAuthor" 
                value={newBookAuthor} 
                onChange={(e) => setNewBookAuthor(e.target.value)}
                required
                />
            <br />
                <label className="form-label" htmlFor="newBookIsbn"> ISBN: </label>
                <br/>
                <input 
                type="text" 
                placeholder="Enter your books isbn"
                 id="newBookIsbn" 
                 value={newBookIsbn} 
                 onChange={(e) => setNewBookIsbn(e.target.value)} 
                 required/>
            <br />
                <label className="form-label" htmlFor="newBookDescription"> Description: </label>
                <br />
                 <input className="input-description"
                type="text"
                placeholder="Enter book description"
                id="newBookDescription"
                value={newBookDescription}
                onChange={(e) => setNewBookDescription(e.target.value)}
                required
            />
            <br />
            <button className="popup-btn" type="submit"> Add Book </button>
       
            <button className="popup-btn" >  ❙❙❚❘❚❙❘❚❘❚❘❘❘❚❘❘❚❘❘❘❚❚❘❘❘ </button>
    
            <button className="close-btn" onClick={handleCloseBookPopup}> ❎ </button>
            < br/>
            </form>
            </div> 
          </div>
        )}

{/* adding game popup */}
        {showAddGamePopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2 className="title"> Add New Game ♟️ </h2>
              <br />
              <form className="popup-form"  onSubmit={handleNewGameSubmit}>
                <label className="form-label" htmlFor="newGameTitle"> Title: </label>
                <br />
                <input 
                type="text" 
                placeholder="Enter your new Game Title: " id="newGameTitle"  
                value={newGameTitle} 
                onChange={(e) => setNewGameTitle(e.target.value)} required 
                />
            <br />
            
                <label  className="form-label" htmlFor="newGameDescription"> Description </label>
                <input className="input-description"
                type="text" 
                placeholder="Enter Game Description" 
                id="newGameDescription" 
                value={newGameDescription} 
                onChange={(e) => setNewGameDescription(e.target.value)}
                required
                />
            <br />
                <button className="popup-btn" type="submit">  Add Game </button>
              
                <button className="close-btn" onClick={handleCloseGamePopup}> ❎ </button>
                <br/>
                </form>
              </div> 
          </div>
        )}

{/* adding misc popup */}
        {showAddMiscPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2 className="title"> New Misc. Item 💡</h2>
              <form className="popup-form" onSubmit={handleNewMiscSubmit}>
                <br />
                <label className="form-label" htmlFor="newMiscTitle"> Title: </label>
                <br />
                <input 
                type="text" 
                placeholder="Enter your new Misc. Title: " 
                id="newMiscTitle"  
                value={newMiscTitle} 
                onChange={(e) => setNewMiscTitle(e.target.value)} 
                required 
                />
            <br />
                <label className="form-label" htmlFor="newMiscDescription"> Description: </label>
                <br />
                <input className="input-description"
                type="text" 
                placeholder="Enter Misc. item Description" 
                id="newMiscDescription" 
                value={newMiscDescription} 
                onChange={(e) => setNewMiscDescription(e.target.value)}
                required
                />
                <br />
                <button className="popup-btn" type="submit">  Add Item </button>
                
                <button className="close-btn" onClick={handleCloseMiscPopup}> ❎ </button>
                <br />
                </form>
            </div>
          </div>
        )}

      </div>
      </PageTemplate>
    </main>
  );
}
