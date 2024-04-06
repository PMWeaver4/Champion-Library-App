import BookTile from "../../Components/BookProfileCard/BookTile";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

export default function AllBooks() {
  return (
    <main className="all-books-page">
      <PageTemplate pageTitle="BOOKS">
        <div className="all-books-body">
          <div className="view-all-headers">
            <button><i className="fa-solid fa-arrow-left"></i></button>
            <h1>BOOKS</h1>
          </div>
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
      </PageTemplate>
    </main>
  );
}
