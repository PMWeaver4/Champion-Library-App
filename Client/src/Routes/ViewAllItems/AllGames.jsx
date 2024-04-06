import { NavLink } from "react-router-dom";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

export default function AllGames() {
  return (
    <main className="all-games-page">
      <PageTemplate pageTitle="GAMES">
        <div className="all-games-body">
        <div className="view-all-headers">
        <NavLink to="/home"><i className="fa-solid fa-arrow-left"></i></NavLink>
          <h1>GAMES</h1>
          </div>
          <div className="view-all-grid"></div>
        </div>
      </PageTemplate>
    </main>
  );
}
