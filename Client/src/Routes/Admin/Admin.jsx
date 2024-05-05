import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { useState } from "react";
import PendingUsers from "./AdminPopups/PendingUsers";
import CurrentUsers from "./AdminPopups/CurrentUsers";
import AllBooks from "./AdminPopups/AllBooks";
import AllGames from "./AdminPopups/AllGames";
import AllOther from "./AdminPopups/AllOther";

const widgetPopupsEnum = {
  None: 0,
  PendingUsers: 1,
  CurrentUsers: 2,
  AllBooks: 3,
  AllGames: 4,
  AllOther: 5,
};

export default function Admin() {
  const [widgetPopupState, setWidgetPopupState] = useState(widgetPopupsEnum.None);

  function openWidgetPopup(newState) {
    setWidgetPopupState(newState);
  }

  function getCurrentOpennedPopup() {
    switch (widgetPopupState) {
      case widgetPopupsEnum.PendingUsers:
        return <PendingUsers  onCloseWidget={onCloseWidget}/>;
      case widgetPopupsEnum.CurrentUsers:
        return <CurrentUsers onCloseWidget={onCloseWidget}/>;
      case widgetPopupsEnum.AllBooks:
        return <AllBooks onCloseWidget={onCloseWidget}/>;
      case widgetPopupsEnum.AllGames:
        return <AllGames onCloseWidget={onCloseWidget}/>;
      case widgetPopupsEnum.AllOther:
        return <AllOther onCloseWidget={onCloseWidget}/>;
      default:
        return null;
    }
  }

  function onCloseWidget() {
    setWidgetPopupState(widgetPopupsEnum.None);
  }

  return (
    <main className="admin-page">
      <PageTemplate pageTitle="Admin">
        <div className="admin-body">
          <div className="admin-content">
            <div className="widget" onClick={() => openWidgetPopup(widgetPopupsEnum.PendingUsers)}>
              <img src="/images/admin-icons/add-group.png" /> <p>New Users (Pending)</p>
            </div>
            <div className="widget" onClick={() => openWidgetPopup(widgetPopupsEnum.CurrentUsers)}>
              <img src="/images/admin-icons/group.png" /> <p>Current Users</p>
            </div>
            <div className="widget" onClick={() => openWidgetPopup(widgetPopupsEnum.AllBooks)}>
              <img src="/images/admin-icons/open-book.png" /> <p>All Books</p>
            </div>
            <div className="widget" onClick={() => openWidgetPopup(widgetPopupsEnum.AllGames)}>
              <img src="/images/admin-icons/card-game.png" /> <p>All Games</p>
            </div>
            <div className="widget" onClick={() => openWidgetPopup(widgetPopupsEnum.AllOther)}>
              <img src="/images/admin-icons/books-stack.png" /> <p>All Misc Items</p>
            </div>
          </div>
        </div>
        {widgetPopupState !== widgetPopupsEnum.None && getCurrentOpennedPopup()}
      </PageTemplate>
    </main>
  );
}
