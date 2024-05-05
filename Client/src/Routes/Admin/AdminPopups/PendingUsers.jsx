export default function PendingUsers({onCloseWidget}) {
  return (
    <div className="admin-popup">
      <div className="admin-popup-body">
        <button onClick={onCloseWidget} className="exit-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>Pending Users</h1>
        <h2>New users await your response...</h2>
        <div className="pending-users-container">
          <div className="pending-user-tile">
            <p className="pending-username">
              <em>Genessi Barot</em>
            </p>
            <p className="pending-email">genn0900@gmail.com</p>
            <div className="pending-action-buttons">
              <button className="pending-accept">Accept</button>
              <button className="pending-decline">Decline</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
