// import PageTemplate from "../../PageTemplate/PageTemplate";

// export default function MyLoanedItems({ onClose }) {
//   return (
//     <div className="my-popups-page">
//       <div className="my-popups-body">
//         <div className="view-all-headers">
//           <button onClick={onClose}>
//             <i className="fa-solid fa-arrow-left"></i>
//           </button>
//           <div className="library-popup-msg">All Loaned Items</div>
//         </div>
//         <div className="view-all-grid"></div>
//       </div>
//     </div>
//   );
// }
//old code above, need to delte?

import { useEffect, useState } from "react";
import PageTemplate from "../../PageTemplate/PageTemplate";
import AddItems from "../../LibraryAddItemPopup/AddItems";
import OtherTile from "../../ItemTIles/OtherTile";
import { getToken, getUserId } from "../../../localStorage";
import config from "../../../config.json";

export default function MyLoanedItems({ onClose }) {
  // TODO logic will be extension of current tab
  // TODO logic for popups to submit and add new item

  const [showAddMiscPopup, setShowAddMiscPopup] = useState(false);

  // adding and closing misc popup
  function handleAddMiscClick() {
    setShowAddMiscPopup(true);
  }

  function handleCloseMiscPopup() {
    setShowAddMiscPopup(false);
  }
  // fetch misc items
  const [otherLoanedItems, setOtherLoanedItems] = useState([]);
  

  async function getAllUsersLoanedItems() {
    const response = await fetch(config.backend_url + `library/loanedItems/${getUserId()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const itemData = await response.json(); // the response is directly an array of items
    if (response.status !== 200) {
      console.error("Failed to fetch items");
      return;
    }
    setOtherLoanedItems(itemData);
    
  }

  useEffect(() => {
    getAllUsersLoanedItems();
  }, []);
  return (
    <div className="my-popups-page">
      <div className="my-popups-body">
        <div className="view-all-headers">
          <button onClick={onClose}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="library-popup-msg">All My Items</div>
          <button className="add-item-btn" onClick={handleAddMiscClick}>
            <i className="fa-solid fa-square-plus"></i>
          </button>
        </div>
        <div className="view-all-grid">
          {otherLoanedItems.map((other) => (
            <OtherTile key={other._id} other={other} />
          ))}
        </div>
      </div>
      {showAddMiscPopup && <AddItems onClosePopup={handleCloseMiscPopup} />}
    </div>
  );
}
