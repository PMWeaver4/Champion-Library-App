export default function AllBooks({ onCloseWidget }) {
  return (
    <div className="admin-popup">
      <div className="admin-popup-body">
        <button onClick={onCloseWidget} className="exit-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>All Books</h1>
      </div>
    </div>
  );
}

//TODO i want to do a display grid of all the books, and just give a edit or delete button option that shows up for book owner or admin on profilecard

// import { NavLink } from "react-router-dom";
// import BookTile from "../../Components/ItemTIles/BookTile";
// import PageTemplate from "../../Components/PageTemplate/PageTemplate";
// import SearchBar from "../../Components/SearchBar/SearchBar";
// import { useEffect, useState } from "react";
// import { getToken } from "../../localStorage";
// import config from "../../config.json";

// export default function AllBooks() {
//   const [books, setBooks] = useState([]);

//   async function getAllBooks() {
//     const response = await fetch(config.backend_url + "book/all", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${getToken()}`,
//       },
//     });
//     const bookData = await response.json(); // the response is directly an array of books
//     if (response.status !== 200) {
//       console.error("Failed to fetch books");
//       return;
//     }
//     setBooks(bookData);
//   }

//   useEffect(() => {
//     getAllBooks(); // im calling the fetchBooks function
//   }, []); // empty array this effect should run once when the component mounts

//   return (
//     <main className="all-books-page">
//       <PageTemplate pageTitle="BOOKS">
//         <div className="all-books-body">
//           <div className="view-all-headers">
//             <NavLink className="back-btn-home" to="/home">
//               <i className="fa-solid fa-arrow-left"></i>
//             </NavLink>
//             <h1>BOOKS</h1>
//           </div>
//           <div className="search-bar-container">
//           <SearchBar />
//           </div>
//           <div className="view-all-grid">
//             {/* display all the books */}
//             {books.map((book) => (
//               <BookTile key={book._id} book={book} />
//             ))}
//           </div>
//         </div>
//       </PageTemplate>
//     </main>
//   );
// }
