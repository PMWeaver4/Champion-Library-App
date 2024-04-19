import { NavLink } from "react-router-dom";
import BookTile from "../../Components/ItemTIles/BookTile";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { getToken } from "../../localStorage";
import config from "../../config.json";

export default function AllBooks() {
  const [books, setBooks] = useState([]);

  async function getAvailableBooks() {
    const response = await fetch(config.backend_url + "book/allavailable", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const bookData = await response.json(); // the response is directly an array of books
    if (response.status !== 200) {
      console.error("Failed to fetch books");
      return;
    }
    setBooks(bookData);
  }

  useEffect(() => {
    getAvailableBooks(); // im calling the fetchBooks function
  }, []); // empty array this effect should run once when the component mounts

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
          <div className="search-bar-container">
          <SearchBar />
          </div>
          <div className="view-all-grid">
            {/* display all the available books */}
            {books.map((book) => (
              <BookTile key={book._id} book={book} />
            ))}
          </div>
        </div>
      </PageTemplate>
    </main>
  );
}
