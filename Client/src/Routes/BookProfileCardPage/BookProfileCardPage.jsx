import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { getToken } from "../../localStorage";
// when you click a tile on home page itll open this page and display the library card
export default function BookProfileCardPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`${config.backend_url}book/book/${bookId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book:", error.message);
      }
    }
    fetchBook();
  }, [bookId]);

  return !book ? (
    <div className="BookProfileCardPage">
      <PageTemplate>Book is loading</PageTemplate>
    </div>
  ) : (
    <div className="BookProfileCardPage">
      <PageTemplate>
        <div className="book-profile-card-background">
          <div className="book-profile-card">
            <div className="card-overlay">
              <button className="close-btn">
                {/* If using a router, you may want to go back or navigate elsewhere */}
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <div className="overlay-content">
                <div className="book-placeholder"><img src={book.img} /></div>
                <div className="card-headers">
                  <h1 className="card-title">{book.title}</h1>
                  <h2 className="card-author">by {book.author}</h2>
                  <button className="borrow-btn">Borrow</button>
                </div>
              </div>
            </div>
            <div className="about-section">
              <h3>Details</h3>
              <div className="about-content">
                <h4>Description</h4>
                <details>
                  <summary>Read More</summary>
                  <p>{book.description}</p>
                </details>
                <div className="book-card-information">
                  <ul>
                    <li className="book-owner">
                      <em>Owned By:</em> {book.ownerName}
                    </li>
                    <li className="Title">
                      <em>Title:</em> {book.title}
                    </li>
                    <li className="author">
                      <em>Author:</em> {book.author}
                    </li>
                    <li className="genre">
                      <em>Genre:</em> {book.genre}
                    </li>
                    <li className="publisher">
                      <em>Publisher:</em> {book.publisher}
                    </li>
                    <li className="pages">
                      <em>Pages:</em> {book.pages}
                    </li>
                    <li className="isbn">
                      <em>ISBN:</em> {book.isbn}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
    </div>
  );
}
