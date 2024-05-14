import { NavLink, useNavigate } from "react-router-dom";
import MenuPopup from "../MenuPopup/MenuPopup";
import { useState } from "react";
import { clearStorage, getIsAdmin } from "../../localStorage";



export default function PageTemplate({ toggleMenu, pageTitle, children }) {
  const username = "Username";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const isAdmin = JSON.parse(getIsAdmin());
 

 console.log(isAdmin)
 
const navigate = useNavigate();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function onLogout(){
    clearStorage();
    navigate("/");
    }

    function onHome(){
      navigate("/home");
    }

  return (
    <>
      <div className="page-template">
        <div className="navigation-bar">
          <h1 className="page-title">{pageTitle}</h1>
          <button onClick={toggleMenu} className="menu-btn">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div className="navigation-side-bar">
          <nav className="menu-popup">
            <ul>
              <img onClick={onHome} className="nav-img" src="/images/south_Meadows.png" style={{cursor: "pointer"}} />
              <li className="menu-btns-container dashboard">
                <NavLink to="/home" exact="true" className={({ isActive }) => [isActive ? "active" : ""].join(" ")}>
                  <i className="fa-solid fa-house"></i>
                  <p>Home</p>
                </NavLink>
              </li>
              <li className="menu-btns-container inbox">
                <NavLink to="/inbox" className={({ isActive }) => [isActive ? "active" : ""].join(" ")}>
                  <i className="fa-solid fa-inbox"></i>
                  <p>Inbox</p>
                </NavLink>
              </li>
              <li className="menu-btns-container my-library">
                <NavLink to="/my-library" className={({ isActive }) => [isActive ? "active" : ""].join(" ")}>
                  <i className="fa-solid fa-book-bookmark"></i>
                  <p>My Library</p>
                </NavLink>
              </li>
              <li className="menu-btns-container users">
                <NavLink to="/users" className={({ isActive }) => [isActive ? "active" : ""].join(" ")}>
                  <i className="fa-solid fa-users"></i>
                  <p>Users</p>
                </NavLink>
              </li>
              {isAdmin && <li className="menu-btns-container admin">
                <NavLink to="/admin" className={({ isActive }) => [isActive ? "active" : ""].join(" ")}>
                <i className="fa-solid fa-user-tie"></i>
                  <p>Admin</p>
                </NavLink>
              </li>}
              <li className="menu-btns-container account">
                <NavLink to="/account" className={({ isActive }) => [isActive ? "active" : ""].join(" ")}>
                  <i className="fa-solid fa-address-card"></i>
                  <p>Account</p>
                </NavLink>
              </li>
              <li  className="menu-btns-container logout">
                <button className="logout-btn" onClick={onLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <p>Logout</p>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="page-body">{children}</div>
      </div>
      {isMenuOpen && <MenuPopup />}
    </>
  );
}
