import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import Navbar from "../../Components/Navbar/Navbar";
// import NotificationTile from "./NotificationTile";

export default function Inbox() {
  return (
    <main className="inbox-page">
      <Navbar toggleMenu={toggleMenu} pageTitle="Inbox" />
      {isMenuOpen && <MenuPopup />}
    </main>
  );
}
