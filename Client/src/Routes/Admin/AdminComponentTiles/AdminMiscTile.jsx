export default function AdminMiscTile({other}) {
  const MAX_CHAR = 12;
  return (
    <div className="admin-item-container">
      <div className="admin-item-tile">
        <div className="admin-content">
          <div className="admin-img">
            <img src={other.img} />
          </div>

          <div className="admin-header">
            <p className="admin-title">
              <em>{other.itemName.length > MAX_CHAR ? other.itemName.substring(0, MAX_CHAR) + "..." : other.itemName}</em>
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
