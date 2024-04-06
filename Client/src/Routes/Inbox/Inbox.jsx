import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
// import Navbar from "../../Components/Navbar/Navbar";
import PageTemplate from "../../Components/Navigation/PageTemplate";
import NotificationTile from "./NotificationTile";
// import NotificationTile from "./NotificationTile";

export default function Inbox({ toggleMenu, pageTitle }) {
  // opening - closing menu (mobile)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <PageTemplate toggleMenu={toggleMenu} pageTitle="INBOX" />
      {isMenuOpen && <MenuPopup />}
      {/* <div className="inbox"> */}
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
                <button>
                  <i className="fa-solid fa-envelope"></i>
                </button>
              </div>
              {tabs.find((tab) => tab.id === activeTab)?.content}
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
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
