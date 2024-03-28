export default function Navbar() {
  const username = "Username";
  const pageTitle = "Dashboard";
  return (
    <div className="navbar">
      <h2 className="username">Hello, {username}</h2>
      <h1 className="page-title">{pageTitle}</h1>
      <button className="menu-btn"><i className="fa-solid fa-bars"></i></button>
    </div>
  );
}
