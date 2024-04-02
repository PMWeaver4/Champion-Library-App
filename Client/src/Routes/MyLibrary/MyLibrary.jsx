import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import Navbar from "../../Components/Navbar/Navbar";

export default function MyLibrary() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <main className="my-library-page">
      <Navbar toggleMenu={toggleMenu} pageTitle="My Library" />
      {isMenuOpen && <MenuPopup />}
    </main>
  );
}
