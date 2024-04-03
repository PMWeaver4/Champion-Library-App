import { useState } from "react";

// array of objects, each with an id and title for inbox info
const tabs = [
  { id: "all", title: "All" },
  { id: "borrow", title: "Borrow Requests" },
  { id: "return", title: "Return Requests" },
];

export default function InboxTabs() {
  // tracking the currently active tab
  const [activeTab, setActiveTab] = useState("all");

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return <div>All Content</div>;
      case "borrow":
        return <div>Borrow Requests Content</div>;
      case "return":
        return <div>Return Requests Content</div>;
      default:
        return <div>All Content</div>;
    }
  };

  return (
    <div className="inbox-tabs">
      {/* tabs and the content area */}
      <div className="tabs-container">
        <ul className="tab-list">
          {tabs.map((tab) => (
            <li key={tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => setActiveTab(tab.id)}>
              {tab.title}
            </li>
          ))}
        </ul>
        <div className="tab-content">{renderContent()}</div>
      </div>
    </div>
  );
}
