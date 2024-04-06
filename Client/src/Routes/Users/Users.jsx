import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

export default function Users() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <main className="users-page">
      <PageTemplate toggleMenu={toggleMenu} pageTitle="Users">
        <div className="users-body"></div>
      </PageTemplate>
      {isMenuOpen && <MenuPopup />}
    </main>
  );
}
