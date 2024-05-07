import CurrentUserTile from "../AdminComponentTiles/CurrentUserTile";

export default function CurrentUsers({ onCloseWidget }) {
  return (
    <div className="admin-popup">
      <button onClick={onCloseWidget} className="exit-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h1>Current Users</h1>
      <h2>All Approved Users</h2>
      <div className="admin-popup-body">
        <CurrentUserTile />
      </div>
    </div>
  );
}
