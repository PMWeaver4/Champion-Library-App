import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";


export default function Users() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <main className="my-profile-page">
      <PageTemplate toggleMenu={toggleMenu} pageTitle="My Profile" >
        <div className="my-profile-body">

        </div>
      </PageTemplate>
      {isMenuOpen && <MenuPopup />}
    </main>
  );
}
