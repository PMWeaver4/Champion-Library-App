export default function AdminBookTile() {
  return (
    <div className="admin-item-container">
      <div className="admin-item-tile">
        <div className="admin-content">
          <div className="admin-img">
            <img src="/images/books.png" />
          </div>

          <div className="admin-header">
            <p className="admin-title">
              <em>Divergent</em>
            </p>
            <p className="admin-author">Suzanne Collins</p>
          </div>
        </div>

        <div className="admin-action-buttons">
          <button className="admin-edit-item">Edit</button>
          <button className="admin-delete-item">Delete</button>
        </div>
      </div>
    </div>
  );
}
