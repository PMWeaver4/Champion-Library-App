import { NavLink } from "react-router-dom";

export default function MenuPopup() {
  return (
    <nav className="menu-popup">
      <ul>
        
        <li className="menu-btns-container dashboard">
          <NavLink to="/home">
            <i className="fa-solid fa-house"></i>
            <p>Dashboard</p>
          </NavLink>
        </li>
        <li className="menu-btns-container inbox">
          <NavLink to="/inbox">
            <i className="fa-solid fa-inbox"></i>
            <p>Inbox</p>
          </NavLink>
        </li>
        <li className="menu-btns-container my-library">
          <NavLink to="/my-library">
            <i className="fa-solid fa-book-bookmark"></i>
            <p>My Library</p>
          </NavLink>
        </li>
        <li className="menu-btns-container users">
          <NavLink to="/users">
            <i className="fa-solid fa-users"></i>
            <p>Users</p>
          </NavLink>
        </li>
        <li className="menu-btns-container profile">
          <NavLink to="/my-profile">
            <i className="fa-solid fa-address-card"></i>
            <p>My Profile</p>
          </NavLink>
        </li>
        <li className="menu-btns-container logout">
          <NavLink to="/">
            <i className="fa-solid fa-right-from-bracket"></i>
            <p>Logout</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
