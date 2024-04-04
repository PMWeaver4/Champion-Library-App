import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
// import Navbar from "../../Components/Navbar/Navbar";
import NavigationBar from "../../Components/Navigation/NavigationBar";
// import NotificationTile from "./NotificationTile";

export default function Inbox({ toggleMenu, pageTitle }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <main className="inbox-page">
      <NavigationBar toggleMenu={toggleMenu} pageTitle="INBOX" />
      {isMenuOpen && <MenuPopup />}
      <div></div>
    </main>
  );
}
