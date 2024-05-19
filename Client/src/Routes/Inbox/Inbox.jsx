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

// Req = request
const tabs = [
  { id: "allRequest", title: "All" },
  { id: "borrowReq", title: "Borrow Request" },
  { id: "returnReq", title: "Return Request" },
];

export default function Inbox({ toggleMenu, pageTitle, toggleEmailPopup }) {
  //fetch the notifications, get up to date!
  const [inboxPopup, setInboxPopup] = useState();
  const [notifications, setNotifications] = useState([]);
  const [borrowReq, setBorrowReq] = useState([]);
  const [returnReq, setReturnReq] = useState([]);
  // for tab system, starts on all tab
  const [activeTab, setActiveTab] = useState("allRequest");
  const [workingOnNotification, setWorkingOnNotification] = useState("");
  // opening - closing menu (mobile)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);

  async function getNotifications() {
    const response = await fetch(config.backend_url + `notifications/allYourNotifications/${getUserId()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const notificationData = await response.json(); // the response is directly an array of items
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

  function toggleEmailPopup() {
    setIsEmailPopupOpen(!isEmailPopupOpen);
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  async function onDeleteNotification() {
    const response = await fetch(`${config.backend_url}notifications/delete/${workingOnNotification._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (response.status !== 200) {
      return alert("Unable to delete the notification");
    }
    alert("DELETED");
    getNotifications();
    handleCloseInboxPopup();
  }

  async function onDenyRequest() {
    let url = `${config.backend_url}notifications/updateBorrow`;
    if (workingOnNotification.notificationType === "Return") {
      handleCloseInboxPopup();
      return;
    }
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        book: workingOnNotification.request.book._id,
        newRequestStatus: "Declined",
      }),
    });
    if (response.status !== 200) {
      return alert("Unable to decline request at this time");
    }
    alert("Request has been denied");
    getNotifications();
    handleCloseInboxPopup();
  }

  async function onAcceptRequest() {
    let url = `${config.backend_url}notifications/updateBorrow`;
    if (workingOnNotification.notificationType === "Return") {
      url = `${config.backend_url}notifications/updateReturn`;
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        book: workingOnNotification.request.book._id,
        newRequestStatus: "Accepted",
      }),
    });
    if (response.status !== 200) {
      return alert("Unable to accept request at this time");
    }
    alert("Accepted");
    getNotifications();
    handleCloseInboxPopup();
  }

  // handle inbox popup
  function getCurrentOpennedPopup() {
    switch (inboxPopup) {
      case InboxPopupEnum.Delete:
        return <DeletePopup onConfirm={onDeleteNotification} onCancel={handleCloseInboxPopup} />;
      case InboxPopupEnum.Reply:
        return <ReplyPopup notification={workingOnNotification} onNo={onDenyRequest} onYes={onAcceptRequest} onClose={handleCloseInboxPopup} />;
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
                  notifications.map((notification) => {
                    let isPendingReply = false;
                    if (
                      notification.notificationType === "Borrow" &&
                      notification.request &&
                      notification.request.returnrequest === null &&
                      notification.request.status === "Pending"
                    ) {
                      isPendingReply = true;
                    }
                    if (notification.notificationType === "Return" && notification.request && notification.request.status === "Pending") {
                      isPendingReply = true;
                    }

                    return (
                      <NotificationTile
                        onReply={(notification) => {
                          setWorkingOnNotification(notification);
                          setInboxPopup(InboxPopupEnum.Reply);
                        }}
                        onDelete={(notification) => {
                          setWorkingOnNotification(notification);
                          setInboxPopup(InboxPopupEnum.Delete);
                        }}
                        key={notification._id}
                        notification={notification}
                        email={notification.requestingUser ? notification.requestingUser.email : notification.user.email}
                        requestingUser={notification.requestingUser || ""}
                        text={notification.message}
                        createdAt={notification.createdAt}
                        bookTitle={notification.book?.title}
                        itemName={notification.item?.itemName}
                        message={notification.message}
                        isPending={isPendingReply}
                      />
                    );
                  })}
                {activeTab === "borrowReq" &&
                  borrowReq.map((notification) => {
                    let isPendingReply = false;
                    if (
                      notification.notificationType === "Borrow" &&
                      notification.request &&
                      notification.request.returnrequest === null &&
                      notification.request.status === "Pending"
                    ) {
                      isPendingReply = true;
                    }
                    if (notification.notificationType === "Return" && notification.request && notification.request.status === "Pending") {
                      isPendingReply = true;
                    }
                    if (notification.notificationtype === "Return" && notification.request && notification.request.status === "Pending")
                      return (
                        <NotificationTile
                          onReply={(notification) => {
                            setWorkingOnNotification(notification);
                            setInboxPopup(InboxPopupEnum.Reply);
                          }}
                          onDelete={(notification) => {
                            setWorkingOnNotification(notification);
                            setInboxPopup(InboxPopupEnum.Delete);
                          }}
                          key={notification._id}
                          notification={notification}
                          email={notification.requestingUser ? notification.requestingUser.email : notification.user.email}
                          requestingUser={notification.requestingUser || ""}
                          text={notification.message}
                          createdAt={notification.createdAt}
                          bookTitle={notification.book?.title}
                          itemName={notification.item?.itemName}
                          isPending={isPendingReply}
                        />
                      );
                  })}
                {activeTab === "returnReq" &&
                  returnReq.map((notification) => {
                    let isPendingReply = false;
                    if (
                      notification.notificationType === "Borrow" &&
                      notification.request &&
                      notification.request.returnrequest === null &&
                      notification.request.status === "Pending"
                    ) {
                      isPendingReply = true;
                    }
                    if (notification.notificationType === "Return" && notification.request && notification.request.status === "Pending") {
                      isPendingReply = true;
                    }
                    return (
                      <NotificationTile
                        onReply={(notification) => {
                          setWorkingOnNotification(notification);
                          setInboxPopup(InboxPopupEnum.Reply);
                        }}
                        onDelete={(notification) => {
                          setWorkingOnNotification(notification);
                          setInboxPopup(InboxPopupEnum.Delete);
                        }}
                        key={notification._id}
                        notification={notification}
                        email={notification.requestingUser ? notification.requestingUser.email : notification.user.email}
                        requestingUser={notification.requestingUser || ""}
                        text={notification.message}
                        createdAt={notification.createdAt}
                        bookTitle={notification.book?.title}
                        itemName={notification.item?.itemName}
                        isPending={notification.request && notification.request.status == "Pending"}
                      />
                    );
                  })}

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
