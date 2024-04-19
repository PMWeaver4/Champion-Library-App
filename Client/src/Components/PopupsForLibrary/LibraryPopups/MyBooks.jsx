import { useState } from "react";
import AddBooks from "../../LibraryAddItemPopup/AddBooks";
import PageTemplate from "../../PageTemplate/PageTemplate";

export default function MyBooks({ onClose, handleAddBookClick }) {
  const [showAddBookPopup, setShowAddBookPopup] = useState(false);

  // Adding book and closing book popup
  function handleAddBookClick() {
    setShowAddBookPopup(true);
  }

  function handleCloseBookPopup() {
    setShowAddBookPopup(false);
  }

  return (
    <div className="my-popups-page">
      {/* <PageTemplate pageTitle="Books"> */}
      <div className="my-popups-body">
        <div className="view-all-headers">
          <button onClick={onClose}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="library-popup-msg">All My Books</div>
          <button className="add-item-btn" onClick={handleAddBookClick}>
            <i className="fa-solid fa-square-plus"></i>
          </button>
        </div>
        <div className="view-all-grid">
          <div>Hello</div>
          <div>How</div>
          <div>Are</div>
          <div>You</div>
        </div>
      </div>
      {showAddBookPopup && <AddBooks onClosePopup={handleCloseBookPopup} />}
      {/* </PageTemplate> */}
    </div>
  );
}
