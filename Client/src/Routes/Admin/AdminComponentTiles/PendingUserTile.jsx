export default function PendingUserTile({user}) {
  return (
      <div className="admin-users-container">
        <div className="admin-user-tile">
          <p className="admin-username">
            <em>{user.firstName} {user.lastName}</em>
          </p>
          <p className="admin-email">{user.email}</p>
          <div className="admin-action-buttons">
            <button className="admin-accept">Accept</button>
            <button className="admin-decline">Decline</button>
          </div>
        </div>
      </div>
  );
}
