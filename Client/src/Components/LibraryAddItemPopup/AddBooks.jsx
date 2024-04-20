import { useState } from "react";
import ManualEntry from "./ManualEntry";
import IsbnEntry from "./IsbnEntry";

const EntryPopupEnum = {
  None:  0,
  ManualEntry: 1,
  IsbnEntry: 2,
}

export default function AddBooks({ onClosePopup }) {
const [EntryPopup, setEntryPopup] = useState(EntryPopupEnum.None);


function openEntryPoup(newState){
setEntryPopup(newState);
}

function getEntryPopup(){
  switch (EntryPopup) {
    case EntryPopupEnum.ManualEntry:
      return <ManualEntry onClosePopup={onClosePopup}/>;
    case EntryPopupEnum.IsbnEntry:
      return <IsbnEntry onClosePopup={onClosePopup}/>;
      default:
        return null;
  }
}


  return (
    <div className="popup-background">
      <div className="popup">
        <div className="popup-inner">
          <h2 className="title"> Add New Book 📚</h2>
          <div className="add-books-content">
            <button className="popup-btn" onClick={()=> openEntryPoup(EntryPopupEnum.ManualEntry)}>Add Book Manually</button>
            <p>- or -</p>
            <button className="popup-btn" onClick={()=> openEntryPoup(EntryPopupEnum.IsbnEntry)}>Add By ISBN</button>
            <button className="close-popup" onClick={onClosePopup}>Close</button>
          </div>
        </div>
      </div>
      {EntryPopup !== EntryPopupEnum.None && getEntryPopup()}
    </div>
  );
}
