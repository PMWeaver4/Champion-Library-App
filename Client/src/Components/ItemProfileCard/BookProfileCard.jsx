import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import EditDeleteBook from "../EditDeleteBookItem/EditDeleteBook";

// import EditDeleteBook from "../EditDeleteBookItem/EditDeleteBook";

import { getToken } from "../../localStorage";
import config from "../../config.json";

export default function BookProfileCard({ book, onBorrow }) {
  // maximum characters
  const MAX_CHAR = 30;

  const navigate = useNavigate();

  async function borrowBook() {
    try {
      // Construct book data from state
      if (book.hasPendingRequest) {
        alert("this book already has a pending request");
        console.error("this book already has a pending request");
      }

      //do the create notification, config notifications/create, with a key of book: book._id or item: item._id
      const requestData = {
        book: book._id,
      };
      // Fetch configuration
      const response = await fetch(config.backend_url + `notifications/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(requestData),
      });
      if (response.status !== 200) {
        return alert(`${book.title} has failed to be requested.`);
      }
      alert(`${book.title} has been requested.`);
      onBorrow();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="ItemProfileCard">
      <div className="blue-card-overlay">
        <NavLink onClick={() => navigate(-1)} className="ItemCard-back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </NavLink>
        <img src={book.img} />
        <div className="ItemCard-header">
          <h1>{book.title.length > MAX_CHAR ? book.title.substring(0, MAX_CHAR) + "..." : book.title}</h1>
          {!book.hasPendingRequest && (
            <button className="borrow-button" onClick={borrowBook}>
              Borrow
            </button>
          )}
        </div>
      </div>
      <div className="white-card-overlay">
        <h2>About</h2>
        <details>
          <summary>Read Description</summary>
          <h3>{book.description}</h3>
        </details>

        <p>
          <em>Owned By:</em> {book.user.firstName + " " + book.user.lastName}
        </p>
        <p>
          <em>Title:</em> {book.title}
        </p>
        <p>
          <em>Author:</em> {book.author}
        </p>
        <p>
          <em>Genre:</em> {book.genre}
        </p>
        <p>
          <em>Publication Date:</em> {book.pubDate}
        </p>
        <p>
          <em>ISBN:</em> {book.isbn}
        </p>
      </div>
      <div>
        <EditDeleteBook />
      </div>
    </div>
  );
}
