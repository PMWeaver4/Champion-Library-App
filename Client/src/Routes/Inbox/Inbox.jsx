import Navbar from "../../Components/Navbar/Navbar";

export default function Inbox() {
  return ( 
  <main className="inbox-page">
    <Navbar pageTitle="Inbox"/>
    <div className="inbox-content-container">
      <div className="notification-panel">
        <input className="inbox-search" type="text" placeholder="Search"></input>
      </div>
      <div className="inbox-panel">
        <button className="panel-back-btn"><i className="fa-solid fa-arrow-left"></i></button>
      </div>
    </div>
  </main>
  );
}
