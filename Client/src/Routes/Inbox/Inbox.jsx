import { useEffect, useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
// import Navbar from "../../Components/Navbar/Navbar";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import NotificationTile from "./NotificationTile";
import EmailPopup from "./EmailPopup";
import { getToken, getUserId } from "../../localStorage";
import config from "../../config.json";
// import NotificationTile from "./NotificationTile";

export default function Inbox({ toggleMenu, pageTitle, toggleEmailPopup }) {
  //fetch the notifications, get up to date!
  const [notifications, setNotifications] = useState([]);
  const [borrowReq, setBorrowReq] = useState([]);
  const [returnReq, setReturnReq] = useState([]);
  async function getNotifications() {
    const response = await fetch(config.backend_url + `notifications/allYourNotifications/${getUserId()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
    });
    const notificationData = await response.json(); // the response is directly an array of items
    console.log(notificationData.Results);
    if (response.status !== 200) {
      console.error("Failed to fetch items");
      return;
    }
    setNotifications(notificationData.Results);
    setBorrowReq(notificationData.Results.filter((notification) => notification.notificationType  ===  "borrow"));
    setReturnReq(notificationData.Results.filter((notification) => notification.notificationType  ===  "return"));
    
  }

  useEffect(() => {
    getNotifications();
  }, []);
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
    { id: "allRequest", title: "All" },
    { id: "borrowReq", title: "Borrow Request"},
    { id: "returnReq", title: "Return Request"},
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
                <div className="inbox-tab-email">
                  <button onClick={toggleEmailPopup}>
                    <i className="fa-solid fa-envelope"></i>
                  </button>
                </div>
                {activeTab === "allRequest" && notifications.map(notification => 
                <NotificationTile key={notification._id}
                email={notification.requestingUser.email || notification.owner.email}
                firstName={notification.requestingUser.firstName}
                lastName={notification.requestingUser.lastName}
                text={notification.message}
                createdAt={notification.createdAt}
                bookTitle={notification.book?.title} 
                itemName={notification.item?.itemName} />
                )}
                {activeTab === "borrowReq" && borrowReq.map(notification => 
                <NotificationTile key={notification._id}
                email={notification.requestingUser.email || notification.owner.email}
                firstName={notification.requestingUser.firstName}
                lastName={notification.requestingUser.lastName}
                text={notification.message}
                createdAt={notification.createdAt}
                bookTitle={notification.book?.title} 
                itemName={notification.item?.itemName} />
                )}
                {activeTab === "returnReq" && returnReq.map(notification => 
                <NotificationTile key={notification._id}
                email={notification.requestingUser.email || notification.owner.email}
                firstName={notification.requestingUser.firstName}
                lastName={notification.requestingUser.lastName}
                text={notification.message}
                createdAt={notification.createdAt}
                bookTitle={notification.book?.title} 
                itemName={notification.item?.itemName} />
                )}
                {/* need to add a div later to create a border between tabs and notifications */}
                
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