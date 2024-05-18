import { useEffect, useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
// import Navbar from "../../Components/Navbar/Navbar";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import NotificationTile from "./NotificationTile";
import EmailPopup from "./EmailPopup";
import { getToken, getUserId } from "../../localStorage";
import config from "../../config.json";
import DeletePopup from "./DeletePopup";
import ReplyPopup from "./ReplyPopup";

// enum  for reply and delete button
const InboxPopupEnum = {
  None: -1,
  Delete: 0,
  Reply: 1,
};

export default function Inbox({ toggleMenu, pageTitle, toggleEmailPopup }) {
  //fetch the notifications, get up to date!
  const [inboxPopup, setInboxPopup] = useState();
  const [notifications, setNotifications] = useState([]);
  const [borrowReq, setBorrowReq] = useState([]);
  const [returnReq, setReturnReq] = useState([]);
  // for tab system, starts on all tab
  const [activeTab, setActiveTab] = useState("allRequest");
  async function getNotifications() {
    console.log("here", config.backend_url + `notifications/allYourNotifications/${getUserId()}`);
    const response = await fetch(config.backend_url + `notifications/allYourNotifications/${getUserId()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const notificationData = await response.json(); // the response is directly an array of items
    console.log(notificationData.Results);
    if (response.status !== 200) {
      console.error("Failed to fetch items");
      return;
    }
    setNotifications(notificationData.Results);
    setBorrowReq(notificationData.Results.filter((notification) => notification.notificationType === "Borrow"));
    setReturnReq(notificationData.Results.filter((notification) => notification.notificationType === "Return"));
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

  // Req = request
  const tabs = [
    { id: "allRequest", title: "All" },
    { id: "borrowReq", title: "Borrow Request" },
    { id: "returnReq", title: "Return Request" },
  ];

  // handle inbox popup

  function getCurrentOpennedPopup() {
    switch (inboxPopup) {
      case InboxPopupEnum.Delete:
        return <DeletePopup onNo={handleCloseInboxPopup} />;
      case InboxPopupEnum.Reply:
        return <ReplyPopup onClose={handleCloseInboxPopup} />;
      default:
        return null;
    }
  }

  const handleCloseInboxPopup = () => {
    setInboxPopup(InboxPopupEnum.None);
  };

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
                {activeTab === "allRequest" &&
                  notifications.map((notification) => (
                    <NotificationTile
                      onReply={() => setInboxPopup(InboxPopupEnum.Reply)}
                      onDelete={() => setInboxPopup(InboxPopupEnum.Delete)}
                      key={notification._id}
                      email={notification.requestingUser ? notification.requestingUser.email : notification.user.email}
                      requestingUser={notification.requestingUser || ""}
                      text={notification.message}
                      createdAt={notification.createdAt}
                      bookTitle={notification.book?.title}
                      itemName={notification.item?.itemName}
                      message={notification.message}
                    />
                  ))}
                {activeTab === "borrowReq" &&
                  borrowReq.map((notification) => (
                    <NotificationTile
                      onReply={() => setInboxPopup(InboxPopupEnum.Reply)}
                      onDelete={() => setInboxPopup(InboxPopupEnum.Delete)}
                      key={notification._id}
                      email={notification.requestingUser ? notification.requestingUser.email : notification.user.email}
                      requestingUser={notification.requestingUser || ""}
                      text={notification.message}
                      createdAt={notification.createdAt}
                      bookTitle={notification.book?.title}
                      itemName={notification.item?.itemName}
                    />
                  ))}
                {activeTab === "returnReq" &&
                  returnReq.map((notification) => (
                    <NotificationTile
                      onReply={() => setInboxPopup(InboxPopupEnum.Reply)}
                      onDelete={() => setInboxPopup(InboxPopupEnum.Delete)}
                      key={notification._id}
                      email={notification.requestingUser ? notification.requestingUser.email : notification.user.email}
                      requestingUser={notification.requestingUser || ""}
                      text={notification.message}
                      createdAt={notification.createdAt}
                      bookTitle={notification.book?.title}
                      itemName={notification.item?.itemName}
                    />
                  ))}

                {/* need to add a div later to create a border between tabs and notifications */}
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
      {inboxPopup !== InboxPopupEnum.None && getCurrentOpennedPopup()}
      {isEmailPopupOpen && <EmailPopup onClose={toggleEmailPopup} />}
      {isMenuOpen && <MenuPopup />}
    </main>
  );
}
