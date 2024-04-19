import PageTemplate from "../../PageTemplate/PageTemplate";

export default function MyBorrowedItems({ onClose }) {
  return (
    <div className="my-popups-page">
      <div className="my-popups-body">
        <div className="view-all-headers">
          <button onClick={onClose}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="library-popup-msg">All Borrowed Items</div>
        </div>
        <div className="view-all-grid"></div>
      </div>
    </div>
  );
}
