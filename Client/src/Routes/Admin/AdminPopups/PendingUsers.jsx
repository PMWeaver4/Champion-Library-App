import PendingUserTile from "../AdminComponentTiles/PendingUserTile";

export default function PendingUsers({ onCloseWidget }) {
  return (
    <div className="admin-popup">
      <div className="admin-popup-body">
        <button onClick={onCloseWidget} className="exit-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>Pending Users</h1>
        <h2>New users await your response...</h2>
        <PendingUserTile/>
      </div>
    </div>
  );
}
