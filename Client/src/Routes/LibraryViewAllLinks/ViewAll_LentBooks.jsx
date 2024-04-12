import { NavLink } from "react-router-dom";
import BookTile from "../../Components/ItemTIles/BookTile";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

export default function ViewAll_LentBooks() {
    return (
      <main className="all-books-page">
<PageTemplate pageTitle=" LENT BOOKS">
        <div className="all-books-body">
          <div className="view-all-headers">
            <NavLink to="/my-library" >
              <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
            <h1> LENT BOOKS </h1>
          </div>
          <div className="view-all-grid">
            < BookTile />        
            < BookTile />        
            < BookTile />        
            < BookTile />        
            < BookTile />        
            < BookTile />        
            < BookTile />        
            < BookTile />        
            < BookTile />        
            < BookTile />        
            < BookTile />        
            < BookTile />        
            < BookTile />        
            < BookTile />        
            < BookTile />        
            < BookTile />        
          </div>
        </div>
      </PageTemplate>
      </main>
    )};