import { NavLink } from "react-router-dom";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { getToken, getUserId } from "../../localStorage";
import NotificationTile from "./NotificationTile";
export default function AllYourNotifications() {
  // fetch notifications
  const [notifications, setNotifications] = useState([]);
  async function getNotifications() {
    const response = await fetch(config.backend_url + "notifications/allYourNotifications", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        UserId: `${getUserId()}`
      },
    });
    const notificationData = await response.json(); // the response is directly an array of items
    if (response.status !== 200) {
      console.error("Failed to fetch items");
      return;
    }
    setNotifications(notificationData);
    
  }

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <main className="all-notifications-page">
      <PageTemplate pageTitle="NOTIFICATIONS">
        <div className="all-notifications-body">
          <div className="view-all-headers">
            <NavLink className="back-btn-home" to="/home">
              <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
            <h1>NOTIFICATIONS</h1>
          </div>
          <div className="view-all-grid">
            {notifications.map((notification) => (
              <NotificationTile key={notification._id} notification={notification} />
            ))}
          </div>
        </div>
      </PageTemplate>
    </main>
  );
}
