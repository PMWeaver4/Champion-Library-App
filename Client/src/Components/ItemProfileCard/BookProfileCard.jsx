import { NavLink, useNavigate } from "react-router-dom";
import EditDeleteBook from "../EditDeleteBookItem/EditDeleteBook";

export default function BookProfileCard({ book }) {
  // maximum characters
  const MAX_CHAR = 30;

const navigate = useNavigate();

  return (
    <div className="ItemProfileCard">
      <div className="blue-card-overlay">
        <NavLink onClick={()=> navigate(-1)} className="ItemCard-back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </NavLink>
        <img src={book.img} />
        <div className="ItemCard-header">
          <h1>{book.title.length > MAX_CHAR ? book.title.substring(0, MAX_CHAR) + "..." : book.title}</h1>
          <button className="borrow-button">Borrow</button>
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
        <EditDeleteBook />
    </div>
    
  );
}
