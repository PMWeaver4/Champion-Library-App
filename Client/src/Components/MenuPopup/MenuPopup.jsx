import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { clearStorage, getIsAdmin } from "../../localStorage";

export default function MenuPopup() {

  const navigate = useNavigate();
  const isAdmin = JSON.parse(getIsAdmin());

  function onLogout() {
    clearStorage();
    navigate("/");
  }

  return (
    <nav className="menu-popup">
      <ul>
        <li className="menu-btns-container home">
          <NavLink to="/home">
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
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
            <p>Library</p>
          </NavLink>
        </li>
        <li className="menu-btns-container users">
          <NavLink to="/users">
            <i className="fa-solid fa-users"></i>
            <p>Users</p>
          </NavLink>
        </li>
        {isAdmin && <li className="menu-btns-container admin">
          <NavLink to="/admin">
            <i className="fa-solid fa-user-tie"></i>
            <p>Admin</p>
          </NavLink>
        </li>}
        <li className="menu-btns-container profile">
          <NavLink to="/account">
            <i className="fa-solid fa-address-card"></i>
            <p>Account</p>
          </NavLink>
        </li>
        <li className="menu-btns-container logout" onClick={onLogout}>
          <button>
            <i className="fa-solid fa-right-from-bracket"></i>
            <p>Logout</p>
          </button>
        </li>
      </ul>
    </nav>
  );
}
