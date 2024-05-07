import CurrentUserTile from "../AdminComponentTiles/CurrentUserTile";

export default function CurrentUsers({onCloseWidget}) {
  return (
    <div className="admin-popup">
      <div className="admin-popup-body">
        <button onClick={onCloseWidget} className="exit-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>Current Users</h1>
        <h2>All Approved Users</h2>
        <CurrentUserTile/>
      </div>
    </div>
  );
}
