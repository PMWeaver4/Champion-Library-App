export default function BookTile({ book }) {

// maximum characters
  const MAX_CHAR = 12;

  return (
    <div className="book-tile">
      <img src={book.img} />
      <h1 className="book-title">{book.title.length > MAX_CHAR ? book.title.substring(0, MAX_CHAR) + "..." : book.title}</h1>
      <h2 className="book-author">{book.author.join(",")}</h2>
    </div>
  );
}
