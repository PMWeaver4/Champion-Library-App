import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import Navbar from "../../Components/Navbar/Navbar";
import NotificationTile from "./NotificationTile";

export default function Inbox() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <main className="inbox-page">
      <Navbar toggleMenu={toggleMenu} pageTitle="Inbox" />
      {isMenuOpen && <MenuPopup />}
      <div className="inbox-content-container">
        <div className="notification-panel">
          <div className="input-container">
            <input className="inbox-search" type="text" placeholder="Search"></input>
            <button className="draft-msg-btn">
              <i className="fa-solid fa-circle-plus"></i>
            </button>
          </div>
          <div className="notification-tile-container">
            {/* placeholders */}
            <NotificationTile />
            <NotificationTile />
            <NotificationTile />
            <NotificationTile />
            <NotificationTile />
            <NotificationTile />
            <NotificationTile />
            <NotificationTile />
            <NotificationTile />
            <NotificationTile />
            <NotificationTile />
          </div>
        </div>
        <div className="inbox-panel">
          <button className="panel-back-btn">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
      </div>
    </main>
  );
}
