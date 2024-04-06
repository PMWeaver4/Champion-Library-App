import { NavLink } from "react-router-dom";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

export default function AllOthers({pageTitle}) {
  return (
    <main className="all-others-page">
      <PageTemplate pageTitle="OTHER">
        <div className="all-others-body">
          <div className="view-all-headers">
          <NavLink to="/home"><i className="fa-solid fa-arrow-left"></i></NavLink>
            <h1>OTHER</h1>
          </div>
          <div className="view-all-grid"></div>
        </div>
      </PageTemplate>
    </main>
  );
}
