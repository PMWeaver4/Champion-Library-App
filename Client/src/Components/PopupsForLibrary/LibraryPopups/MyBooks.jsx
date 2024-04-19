
import PageTemplate from "../../PageTemplate/PageTemplate";

export default function MyBooks({ onClose }) {
  return (
    <main className="my-popups-page">
      <PageTemplate pageTitle="Books">
        <div className="my-popups-body">
          <div className="view-all-headers">
            <button onClick={onClose}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="library-popup-msg">All My Books</div>
          </div>
          <div className="view-all-grid"></div>
        </div>
      </PageTemplate>
    </main>
  );
}
