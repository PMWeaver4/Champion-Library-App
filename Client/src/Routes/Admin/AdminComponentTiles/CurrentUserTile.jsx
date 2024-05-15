export default function CurrentUserTile({ user, onDelete, onEdit }) {
  return (
      <div className="admin-users-container">
          <div className="admin-user-tile">
              <p className="admin-username">
                  <em>{user.firstName} {user.lastName}</em>
              </p>
              <p className="admin-email">{user.email}</p>
              <div className="admin-action-buttons">
                  <button className="admin-edit" onClick={() => onEdit(user)}>Edit</button>
                  <button className="admin-delete" onClick={() => onDelete(user._id)}>Delete</button>
              </div>
          </div>
      </div>
  );
}
