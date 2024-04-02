import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import Navbar from "../../Components/Navbar/Navbar";

export default function Settings() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <main className="settings-page">
      <Navbar toggleMenu={toggleMenu} pageTitle="Settings" />
      {isMenuOpen && <MenuPopup />}
    </main>
  );
}
