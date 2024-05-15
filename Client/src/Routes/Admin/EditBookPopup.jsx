import { useState } from "react";

export default function EditBookPopup({ book, onSave, onCancel }) {
  const [title, setNewBookTitle] = useState(book.title);
  const [author, setNewBookAuthor] = useState(book.author);
  const [description, setNewBookDescription] = useState(book.description);
  const [genre, setNewBookGenre] = useState(book.genre);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...book,
      title,
      author,
      description,
      genre,
    });
  };
  return (
    <div className="popup-background">
      <div className="popup">
        <div className="popup-inner">
          <button onClick={onCancel} className="exit-btn">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="title"> Edit Book 📚</h2>
          <form className="popup-form" onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="title">
              {" "}
              Title:{" "}
            </label>

            <input
              type="text"
              placeholder="Enter book title "
              id="newBookTitle"
              value={title}
              onChange={(e) => setNewBookTitle(e.target.value)}
              required
            />

            <label className="form-label" htmlFor="author">
              {" "}
              Author:{" "}
            </label>

            <input
              type="text"
              placeholder="Enter author's fullname"
              id="newBookAuthor"
              value={author}
              onChange={(e) => setNewBookAuthor(e.target.value)}
              required
            />

            <label className="form-label" htmlFor="description">
              {" "}
              Description:{" "}
            </label>

            <textarea
              className="input-description"
              type="text"
              placeholder="Enter book description"
              id="newBookDescription"
              value={description}
              onChange={(e) => setNewBookDescription(e.target.value)}
              required
            />

            <label className="form-label" htmlFor="genre">
              {" "}
              Genre:{" "}
            </label>

            <input
              className="input-genre"
              type="text"
              placeholder="Enter book genre"
              id="newBookGenre"
              value={genre}
              onChange={(e) => setNewBookGenre(e.target.value)}
              required
            />

            <button className="popup-btn" type="submit">
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
