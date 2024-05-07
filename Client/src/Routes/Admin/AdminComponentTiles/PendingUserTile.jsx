export default function PendingUserTile() {
  return (
      <div className="admin-users-container">
        <div className="admin-user-tile">
          <p className="admin-username">
            <em>Genessi Barot</em>
          </p>
          <p className="admin-email">genn0900@gmail.com</p>
          <div className="admin-action-buttons">
            <button className="admin-accept">Accept</button>
            <button className="admin-decline">Decline</button>
          </div>
        </div>
      </div>
  );
}
