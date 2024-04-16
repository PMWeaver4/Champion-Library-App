import { NavLink } from "react-router-dom";
import OtherTile from "../../Components/ItemTIles/OtherTile";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

export default function ViewAll_Lent_Items() {
    return (
      <main className="all-others-page">
<PageTemplate pageTitle=" LENT ITEMS">
        <div className="all-others-body">
          <div className="view-all-headers">
            <NavLink to="/my-library" >
              <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
            <h1> LENT ITEMS </h1>
          </div>
          <div className="view-all-grid">
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
            < OtherTile />        
          </div>
        </div>
      </PageTemplate>
      </main>
    )};