export default function BookProfileCard() {
  return (
    <div className="book-profile-card">
      <div className="card-overlay">
        <button className="close-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="overlay-content">
          <div className="book-placeholder"></div>
          <div className="card-headers">
            <h1 className="card-title">Title</h1>
            <h2 className="card-author">Author</h2>
            <button className="borrow-btn">Borrow</button>
          </div>
        </div>
      </div>
      <div className="about-section">
        <h3>Details</h3>
        <div className="about-content">
          <h4>About</h4>
          <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto debitis libero pariatur quas. Necessitatibus perferendis, voluptatum id eius itaque ab fugiat obcaecati saepe. Natus eum voluptatibus laborum non recusandae beatae magnam odit esse distinctio veritatis sunt, atque dolorum soluta suscipit vero quidem omnis? Debitis incidunt exercitationem commodi provident adipisci mollitia.
          </p>
          <div className="book-card-information">
            <ul>
              <li className="book-owner">
                <em>Owned By:</em> Genessi B.
              </li>
              <li className="title">
                <em>Title:</em> Lord of The Rings
              </li>
              <li className="author">
                <em>Author:</em> Ronald McDonald
              </li>
              <li className="author">
                <em>Genre:</em> Horror
              </li>
              <li className="publisher">
                <em>Publisher:</em> Netflix
              </li>
              <li className="pages">
                <em>Pages:</em> 6000
              </li>
              <li className="isbn">
                <em>ISBN:</em> 1234-5678-9010
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
