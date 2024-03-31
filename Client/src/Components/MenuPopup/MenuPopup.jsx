import { NavLink } from "react-router-dom";

export default function MenuPopup() {
  return (
    <nav className="menu-popup">
      <div className="menu-btns-container dashboard">
        <NavLink to="/home"><i className="fa-solid fa-house"></i> Dashboard</NavLink>
      </div>
      <div className="menu-btns-container inbox">
        <NavLink to="/inbox"><i className="fa-solid fa-inbox"></i> Inbox</NavLink>
      </div>
      <div className="menu-btns-container my-library">
        <NavLink to="/my-library"><i className="fa-solid fa-book-bookmark"></i> My Library</NavLink>
      </div>
      <div className="menu-btns-container users">
        <NavLink to="/users"><i className="fa-solid fa-users"></i> Users</NavLink>
      </div>
      <div className="menu-btns-container settings">
        <NavLink to="/settings"><i className="fa-solid fa-gear"></i> Settings</NavLink>
      </div>
      <div className="menu-btns-container logout">
        <NavLink to="/"><i className="fa-solid fa-right-from-bracket"></i> Logout</NavLink>
      </div>
    </nav>
  );
}
