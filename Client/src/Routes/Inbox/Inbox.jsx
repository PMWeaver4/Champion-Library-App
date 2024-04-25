import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
// import Navbar from "../../Components/Navbar/Navbar";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import NotificationTile from "./NotificationTile";
import EmailPopup from "./EmailPopup";
// import NotificationTile from "./NotificationTile";

export default function Inbox({ toggleMenu, pageTitle, toggleEmailPopup }) {
  // opening - closing menu (mobile)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);

  function toggleEmailPopup() {
    setIsEmailPopupOpen(!isEmailPopupOpen);
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  // for tab system, starts on all tab
  const [activeTab, setActiveTab] = useState("allRequest");
  // Req = request
  const tabs = [
    { id: "allRequest", title: "All", content: "Content for Tab 1" },
    { id: "borrowReq", title: "Borrow Request", content: "Content for Tab 2" },
    { id: "returnReq", title: "Return Request", content: "Content for Tab 3" },
  ];

  return (
    <main className="inbox-page">
      <PageTemplate toggleMenu={toggleMenu} pageTitle="INBOX">
        <div className="inbox-body">
          <div className="inbox-container">
            <div className="inbox-tabs">
              {tabs.map((tab) => (
                <button key={tab.id} className={`tab ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}>
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="inbox-tab-content">
              <div className="inbox-scrollbar">
                {/* need to add a div later to create a border between tabs and notifications */}
                <div className="inbox-tab-email">
                  <button onClick={toggleEmailPopup}>
                    <i className="fa-solid fa-envelope"></i>
                  </button>
                </div>
                {tabs.find((tab) => tab.id === activeTab)?.content}
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
      {isEmailPopupOpen && <EmailPopup onClose={toggleEmailPopup} />}
      {isMenuOpen && <MenuPopup />}
    </main>
  );
}
