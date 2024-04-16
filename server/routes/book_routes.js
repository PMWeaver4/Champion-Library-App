const router = require("express").Router();
const Book = require("../models/book");

//Create a new book
router.post("/create/", async (req, res) => {
  console.log(req);
  try {
    //assign book from schema
    let book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      user: req.user.email,
      isbn: req.body.isbn,
      genre: req.body.genre,
      img: req.body.img,
    });
    //save the new info
    const newBook = await book.save();
    //display new book
    res.status(200).json({
      Created: newBook,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

// Display all book endpoint
router.get("/all", async (req, res) => {
  try {
    //the find has no filters, so every book within the database is displayed
    let results = await Book.find().populate(["title", "author", "description", "user", "genre", "rentedUser", "isbn"]).select({
      text: 1,
      createdAt: 1,
      updatedAt: 1,
    });

    res.status(200).json({
      Created: results,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      Error: err,
    });
  }
});
// Display all available book endpoint
router.get("/allavailable", async (req, res) => {
  try {
    //this find will show only books that are not checked out, i.e. available
    let results = await Book.find({ checkedOut: false }).populate(["title", "author", "description", "user", "genre", "rentedUser", "isbn"]).select({
      text: 1,
      createdAt: 1,
      updatedAt: 1,
    });

    res.status(200).json({
      Created: results,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      Error: err,
    });
  }
});

//get specific book
router.get("/book/:_id", async (req, res) => {
  try {
    //find a book where the mongo id matches what's in the paramter
    let results = await Book.find({ _id: req.params._id });
    res.status(200).json({
      Results: results,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      Error: err,
    });
  }
});

//filter
router.get("/filter/", async (req, res) => {
  try {
    //filter, can decide what books to show based on query.
    const { genre, author, user } = req.query;
    const whatever = {};
    if (genre != null) {
      whatever.genre = genre;
    }
    if (author != null) {
      whatever.author = author;
    }
    if (user != null) {
      whatever.user = user;
    }
    console.log(`this is the ${genre} and the ${author}`);

    let results = await Book.find(whatever).sort({ createdAt: 1 }); //sort by when it was created, +1, shows newest first

    res.status(200).json({
      Results: results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

//[PUT] Adding Update Endpoint
router.put("/update/:_id", async (req, res) => {
  try {
    //find a book that matches the mongo id
    const bookToUpdate = await Book.findOne({ _id: req.params._id }).exec();
    //a list of values to be updated
    const updatedValues = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
      condition: req.body.condition,
      rentedUser: req.body.rentedUser,
      checkedout: req.body.checkedOut,
    };
    //update values into the matched book
    await bookToUpdate.updateOne(updatedValues).exec();

    res.status(200).json({
      Updated: updatedValues,
      Results: updatedValues,
    });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

// [DELETE] - Remove a book.
router.delete("/delete/:id", async (req, res) => {
  try {
    //find a book by its mongo id and delete it
    const book = await Book.findByIdAndDelete(req.params.id);
    //error if the book id does not match
    if (!Book) throw new Error("Book not found");

    res.status(200).json({
      Deleted: 1,
    });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

// search the books by genre title author
router.get("/searchThrough", async (req, res) => {
  const searchString = req.query.q;
  try {
    // RegExp is regular expression
    const regex = new RegExp(searchString, "i");
    const books = await Book.find({
      $or: [{ genre: regex }, { title: regex }, { author: regex }],
    });
    // Send the found books back to the client
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error });
  }
});

module.exports = router;
