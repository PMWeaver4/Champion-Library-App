// For My Library
import { useState } from "react";
import { NavLink } from "react-router-dom";
import BookTile from "../../Components/ItemTIles/BookTile";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import CameraScanner from "../../Components/CameraScanner/CameraScanner";
import config from "../../config.json";
const ScanningStateEnum = {
  AddingBookFailed: -1,
  None: 0,
  ScanningBook: 1,
  AddingBookInProgress: 2,
  AddingBookSuccess: 3,
};

// TODO logic will be extension of current tab
// TODO logic for popups to submit and add new item
export default function ViewAll_LibraryBooks() {
  const [showAddBookPopup, setShowAddBookPopup] = useState(false);
  const [isBarcodeScannerOpen, setIsBarcodeScannerOpen] = useState(false);

  // for Adding a new book
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookIsbn, setNewBookIsbn] = useState("");
  const [newBookDescription, setNewBookDescription] = useState("");

  // status and error display for adding books through scanner
  const [addingBookState, setAddingBookState] = useState(ScanningStateEnum.None);

  // Adding book and closing book popup
  function handleAddBookClick() {
    setShowAddBookPopup(true);
  }

  function handleCloseBookPopup() {
    setShowAddBookPopup(false);
  }

  // barcode scanner popup
  function openBarcodeScannerPopup() {
    setAddingBookState(ScanningStateEnum.ScanningBook);
  }
  // const token for testing purposes only
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWJmY2QzMzcwODdmNGM0ZjNlODNmYyIsImlhdCI6MTcxMzExMDIyNywiZXhwIjoxNzEzMjgzMDI3fQ.OqOhnLlzsCRF9fBTzT3KyXTN4Kie_qQsucDOoQGt4VY";
  // decode and close barcode scanner
  async function handleBarcodeResult(isbn) {
    console.log(isbn);
    setAddingBookState(ScanningStateEnum.AddingBookInProgress);
    const response = await fetch(config.backend_url + `fetch/bookSubmit/${isbn}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status !== 200) {
      //error state
      setAddingBookState(ScanningStateEnum.AddingBookFailed);
      return;
    }

    setAddingBookState(ScanningStateEnum.AddingBookSuccess);
    handleCloseBookPopup();
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

  return (
    <main className="all-books-page">
      <PageTemplate pageTitle=" MY BOOKS">
        <div className="all-books-body">
          <div className="view-all-headers">
            <NavLink to="/my-library">
              <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
            <h1> MY BOOKS</h1>
          </div>
          <button className="add-new-btn" onClick={handleAddBookClick}>
            {" "}
            Add New Book +{" "}
          </button>
          <div className="view-all-grid">
            <BookTile />
            <BookTile />
            <BookTile />
            <BookTile />
            <BookTile />
            <BookTile />
            <BookTile />
            <BookTile />
            <BookTile />
            <BookTile />
            <BookTile />
            <BookTile />
            <BookTile />
            <BookTile />
            <BookTile />
          </div>
        </div>

        {/* Popup overlay */}

        {/* Popup for adding new book */}
        {showAddBookPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2 className="title"> Add New Book 📚 </h2>
              <form className="popup-form" onSubmit={handleNewBookSubmit}>
                <label className="form-label" htmlFor="newBookTitle">
                  {" "}
                  Title:{" "}
                </label>

                <input
                  type="text"
                  placeholder="Enter your new book title "
                  id="newBookTitle"
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  required
                />

                <label className="form-label" htmlFor="newBookAuthor">
                  {" "}
                  Author:{" "}
                </label>

                <input
                  type="text"
                  placeholder="Enter author first and last name"
                  id="newBookAuthor"
                  value={newBookAuthor}
                  onChange={(e) => setNewBookAuthor(e.target.value)}
                  required
                />

                <label className="form-label" htmlFor="newBookIsbn">
                  {" "}
                  ISBN:{" "}
                </label>

                <input
                  type="text"
                  placeholder="Enter your books isbn"
                  id="newBookIsbn"
                  value={newBookIsbn}
                  onChange={(e) => setNewBookIsbn(e.target.value)}
                  required
                />

                <label className="form-label" htmlFor="newBookDescription">
                  {" "}
                  Description:{" "}
                </label>

                <input
                  className="input-description"
                  type="text"
                  placeholder="Enter book description"
                  id="newBookDescription"
                  value={newBookDescription}
                  onChange={(e) => setNewBookDescription(e.target.value)}
                  required
                />

                <button className="popup-btn" type="submit">
                  {" "}
                  Add Book{" "}
                </button>
              </form>
              <button className="popup-btn" onClick={openBarcodeScannerPopup}>
                {" "}
                Barcode scanner{" "}
              </button>

              <button className="popup-btn" onClick={handleCloseBookPopup}>
                {" "}
                Close{" "}
              </button>
            </div>
          </div>
        )}
        {addingBookState === ScanningStateEnum.ScanningBook && <CameraScanner onDetected={handleBarcodeResult} />}
      </PageTemplate>
    </main>
  );
}
