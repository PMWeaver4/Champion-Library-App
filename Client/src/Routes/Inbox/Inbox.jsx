import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
// import Navbar from "../../Components/Navbar/Navbar";
import NavigationBar from "../../Components/Navigation/NavigationBar";
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
      <NavigationBar toggleMenu={toggleMenu} pageTitle="INBOX" />
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
          <div className="inbox-tab-content">{tabs.find((tab) => tab.id === activeTab)?.content}</div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
