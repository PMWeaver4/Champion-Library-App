import { NavLink } from "react-router-dom";
import BookTile from "../../Components/ItemTIles/BookTile";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import SearchBar from "../../Components/SearchBar/SearchBar";

export default function AllBooks() {
  return (
    <main className="all-books-page">
      <PageTemplate pageTitle="BOOKS">
        <div className="all-books-body">
          <div className="view-all-headers">
            <NavLink to="/home">
              <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
            <h1>BOOKS</h1>
          </div>
          <SearchBar />
          <div className="view-all-grid">{/* display all the available books */}
          <BookTile/>
          <BookTile/>
          <BookTile/>
          </div>
        </div>
      </PageTemplate>
    </main>
  );
}
