import { Navlink } from "react-router-dom";
export default function MenuPopup() {
  return (
    <div className="menu-popup">
      <button className="menu-btn">
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className="menu-btns-container dashboard">
        <Navlink to="/home"></Navlink>
      </div>
      <div className="menu-btns-container inbox">
        <Navlink to="/inbox"></Navlink>
      </div>
      <div className="menu-btns-container my-library">
        <Navlink to="/my-library"></Navlink>
      </div>
      <div className="menu-btns-container users">
        <Navlink to="/users"></Navlink>
      </div>
      <div className="menu-btns-container settings">
        <Navlink to="/settings"></Navlink>
      </div>
      <div className="menu-btns-container logout">
        <Navlink to="/"></Navlink>
      </div>
    </div>
  );
}
