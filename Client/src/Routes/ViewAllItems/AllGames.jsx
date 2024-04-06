import PageTemplate from "../../Components/PageTemplate/PageTemplate";

export default function AllGames() {
  return (
    <main className="all-games-page">
      <PageTemplate pageTitle="GAMES">
        <div className="all-games-body">
        <div className="view-all-headers">
        <button><i className="fa-solid fa-arrow-left"></i></button>
          <h1>GAMES</h1>
          </div>
          <div className="view-all-grid"></div>
        </div>
      </PageTemplate>
    </main>
  );
}
