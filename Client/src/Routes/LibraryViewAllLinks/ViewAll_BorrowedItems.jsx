import { NavLink } from "react-router-dom";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import OtherTile from "../../Components/ItemTIles/OtherTile";

export default function ViewAll_BorrowedItems() {
    return (
      <main className="all-others-page">
<PageTemplate pageTitle=" MY ITEMS">
        <div className="all-others-body">
          <div className="view-all-headers">
            <NavLink to="/my-library" >
              <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
            <h1> BORROWED ITEMS </h1>
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
          </div>
        </div>
      </PageTemplate>
      </main>
    )};