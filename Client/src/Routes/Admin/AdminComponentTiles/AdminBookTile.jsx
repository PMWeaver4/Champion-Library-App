export default function AdminBookTile({ book, onDeleteRequest, onEditRequest }) {
  const MAX_CHAR = 12;

  return (
    <div className="admin-item-container">
      <div className="admin-item-tile">
        <div className="admin-content">
          <div className="admin-img">
            <img src={book.img} alt={book.title} />
          </div>
          <div className="admin-header">
            <p className="admin-title">
              <em>{book.title.length > MAX_CHAR ? book.title.substring(0, MAX_CHAR) + "..." : book.title}</em>
            </p>
            <p className="admin-author">{book.author}</p>
          </div>
        </div>
        <div className="admin-action-buttons">
          <button className="admin-edit-item" onClick={() => onEditRequest(book)}>
            Edit
          </button>
          <button className="admin-delete-item" onClick={onDeleteRequest}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
