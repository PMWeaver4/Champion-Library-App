import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import Navbar from "../../Components/Navbar/Navbar";

export default function Users() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <main className="users-page">
      <Navbar toggleMenu={toggleMenu} pageTitle="My Profile" />
      {isMenuOpen && <MenuPopup />}
    </main>
  );
}
