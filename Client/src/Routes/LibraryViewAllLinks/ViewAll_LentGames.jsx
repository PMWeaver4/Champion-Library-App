import { NavLink } from "react-router-dom";
import GameTile from "../../Components/ItemTIles/GameTile";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

export default function ViewAll_LentGames() {
    return (
      <main className="all-games-page">
<PageTemplate pageTitle=" LENT GAMES">
        <div className="all-games-body">
          <div className="view-all-headers">
            <NavLink to="/my-library" >
              <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
            <h1> LENT GAMES </h1>
          </div>
          <div className="view-all-grid">
            <GameTile />        
            <GameTile />        
            <GameTile />        
            <GameTile />        
            <GameTile />        
            <GameTile />        
            <GameTile />        
            <GameTile />        
            <GameTile />        
            <GameTile />        
            <GameTile />        
            <GameTile />        
            <GameTile />        
            <GameTile />        
          </div>
        </div>
      </PageTemplate>
      </main>
    )};