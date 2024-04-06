import PageTemplate from "../../Components/PageTemplate/PageTemplate";

export default function AllOthers({pageTitle}) {
  return (
    <main className="all-others-page">
      <PageTemplate pageTitle="OTHER">
        <div className="all-others-body">
          <div className="view-all-headers">
          <button><i className="fa-solid fa-arrow-left"></i></button>
            <h1>OTHER</h1>
          </div>
          <div className="view-all-grid"></div>
        </div>
      </PageTemplate>
    </main>
  );
}
