import { useNavigate } from "react-router-dom";
export default function BookTile({ book }) {
  // maximum characters
  const MAX_CHAR = 12;
  const navigate = useNavigate();
  const handleBookClick = () => {
    navigate(`/book-profile/${book._id}`); // Navigate to the profile page with the book's ID
  };

  return (
    <div onClick={handleBookClick} className="book-tile">
      <img src={book.img} />
      <h1 className="book-title">{book.title.length > MAX_CHAR ? book.title.substring(0, MAX_CHAR) + "..." : book.title}</h1>
      <h2 className="book-author">{book.author.join(",")}</h2>
    </div>
  );
}
