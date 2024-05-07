export default function CurrentUserTile() {
    return (
        <div className="admin-users-container">
          <div className="admin-user-tile">
            <p className="admin-username">
              <em>Genessi Barot</em>
            </p>
            <p className="admin-email">genn0900@gmail.com</p>
            <div className="admin-action-buttons">
              <button className="admin-edit">Edit</button>
              <button className="admin-delete">Delete</button>
            </div>
          </div>
        </div>
    );
  }