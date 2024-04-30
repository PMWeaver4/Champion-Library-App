export default function OtherProfileCard({item}) {
    // maximum characters
    const MAX_CHAR = 30;
  return <div className="item-profile-card">
    <div className="item-profile-card">
      <div className="ItemProfileCard">
        <div className="blue-card-overlay">
          <NavLink to="/home" className="ItemCard-back-btn">
            <i className="fa-solid fa-arrow-left"></i>
          </NavLink>
          <img src={item.img} />
          <div className="ItemCard-header">
            <h1>{item.itemName.length > MAX_CHAR ? item.itemName.substring(0, MAX_CHAR) + "..." : item.itemName}</h1>
            <button className="borrow-button">Borrow</button>
          </div>
        </div>
        <div className="white-card-overlay">
          <h2>About</h2>
          <details>
            <summary>Read Description</summary>
            <h3>{item.description}</h3>
          </details>
          <p>
            <em>Owned By:</em> {item.user.firstName + " " + item.user.lastName}
          </p>
        </div>
      </div>
    </div>
  </div>;
}
