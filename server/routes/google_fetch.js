const router = require("express").Router();
const Book = require("../models/book");

//search for a book with the isbn
router.get("/bookSearch/:isbn", async (req, res) => {
  try {
    //retrieves a book from google books api based on isbn specified in the params
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${req.params.isbn}`);
    const data = await response.json();
    //displays the info, that's all
    res.status(200).json({
      Results: data,
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).send();
  }
});
//search for a book with the isbn and create a new book object with that info
// changed this get to post because it signifies something was created in our db
router.post("/bookSubmit/:isbn", async (req, res) => {
  try {
    //find the book in google api based on isbn in parameter
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${req.params.isbn}`);
    //convert isbn from a string to a number
    const isbn = parseInt(req.params.isbn);
    const data = await response.json();

    const isThumbnailUndefined = data.items[0].volumeInfo.imageLinks == undefined || data.items[0].volumeInfo.imageLinks.thumbnail == undefined;
    // if thumbnail link from google api is undefined replace img with placeholder book img link
    const img = isThumbnailUndefined ? "/images/books.png" : data.items[0].volumeInfo.imageLinks.thumbnail;

    //add the book to the DB
    let book = new Book({
      isbn: isbn,
      title: data.items[0].volumeInfo.title,
      author: data.items[0].volumeInfo.authors,
      description: data.items[0].volumeInfo.description,
      user: req.user.email,
      img: img,
      genre: data.items[0].volumeInfo.categories,
    });
    //save it
    const newBook = await book.save();
    //display it
    res.status(200).json({
      Created: newBook,
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).send();
  }
});

module.exports = router;
