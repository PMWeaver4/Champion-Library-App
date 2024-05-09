export default function AdminGameTile({game}) {
  const MAX_CHAR = 12;
  return (
    <div className="admin-item-container">
      <div className="admin-item-tile">
        <div className="admin-content">
          <div className="admin-img">
            <img src={game.img} />
          </div>

          <div className="admin-header">
            <p className="admin-title">
              <em>{game.itemName.length > MAX_CHAR ? game.itemName.substring(0, MAX_CHAR) + "..." : game.itemName}</em>
            </p>
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