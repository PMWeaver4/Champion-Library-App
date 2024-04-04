export default function Navbar({ toggleMenu, pageTitle}) {
  const username = "Username";
  
  return (
    <div className="navbar">
      <h2 className="username">Hello, {username}</h2>
      <h1 className="page-title">{pageTitle}</h1>
      <button onClick={toggleMenu} className="menu-btn">
        <i className="fa-solid fa-bars"></i>
      </button>
      
    </div>
  );
}
