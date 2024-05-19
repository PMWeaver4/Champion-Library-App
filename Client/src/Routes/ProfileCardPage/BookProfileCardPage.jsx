import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { getToken } from "../../localStorage";
import BookProfileCard from "../../Components/ItemProfileCard/BookProfileCard";
// when you click a tile on home page itll open this page and display the library card
export default function BookProfileCardPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  async function returnBook() {
    const response = await fetch(`${config.backend_url}notifications/updateReturn`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        book: book._id,
        newRequestStatus: "Pending",
      }),
    });
    if (response.status !== 200) {
      return alert("ERROR WHILE RETURNING");
    }
    alert("RETURN STARTED");
    fetchBook();
  }

  async function fetchBook() {
    try {
      const response = await fetch(`${config.backend_url}book/book/${bookId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error("Failed to fetch book:", error.message);
    }
  }

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  return !book ? (
    <div className="BookProfileCardPage">Book is loading</div>
  ) : (
    <div className="BookProfileCardPage">
      <div className="card-container">
        <BookProfileCard book={book} onBorrow={fetchBook} onReturn={returnBook} />
      </div>
    </div>
  );
}
