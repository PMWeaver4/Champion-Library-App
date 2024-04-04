import { NavLink } from "react-router-dom";
export default function NavigationBar({ toggleMenu, pageTitle }) {
  const username = "Username";
  return (
    <div className="navigation-page">
      <div className="navigation-bar">
        <h1 className="page-title">{pageTitle}</h1>
        <button onClick={toggleMenu} className="menu-btn">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <div className="navigation-side-bar">
        <nav className="menu-popup">
          <ul>
            <img className="nav-img" src="/images/south_Meadows.png" />
            <li className="menu-btns-container dashboard">
              <NavLink to="/home" exact activeClassName="active">
                <i className="fa-solid fa-house"></i>
                <p>Home</p>
              </NavLink>
            </li>
            <li className="menu-btns-container inbox">
              <NavLink to="/inbox" activeClassName="active">
                <i className="fa-solid fa-inbox"></i>
                <p>Inbox</p>
              </NavLink>
            </li>
            <li className="menu-btns-container my-library">
              <NavLink to="/my-library" activeClassName="active">
                <i className="fa-solid fa-book-bookmark"></i>
                <p>My Library</p>
              </NavLink>
            </li>
            <li className="menu-btns-container users">
              <NavLink to="/users" activeClassName="active">
                <i className="fa-solid fa-users"></i>
                <p>Users</p>
              </NavLink>
            </li>
            <li className="menu-btns-container profile">
              <NavLink to="/my-profile" activeClassName="active">
                <i className="fa-solid fa-address-card"></i>
                <p>My Profile</p>
              </NavLink>
            </li>
            <li className="menu-btns-container logout">
              <NavLink to="/" activeClassName="active">
                <i className="fa-solid fa-right-from-bracket"></i>
                <p>Logout</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
