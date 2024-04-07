import { NavLink } from "react-router-dom";

export default function UserProfileCard() {
  return (
    <div className="user-profile-card-background">
      <div className="user-profile-card">
        <div className="user-card-overlay">
          <NavLink to="/users" className="user-close-btn">
            <i className="fa-solid fa-arrow-left"></i>
          </NavLink>
          <div className="user-overlay-content">
            <div className="user-placeholder"></div>
            <h1 className="user-card-title">Albert Einstein</h1>
          </div>
        </div>
        <div className="user-profile-btns">
          <NavLink>View Library</NavLink>
          <button className="user-email-btn">Send Email</button>
        </div>
      </div>
    </div>
  );
}
