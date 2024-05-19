const router = require("express").Router();
const Book = require("../models/book");

//Create a new book ✅
router.post("/create/", async (req, res) => {
  try {
    const img = "/images/books.png";
    //assign book from schema
    let book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      user: req.user._id,
      isbn: req.body.isbn,
      genre: req.body.genre,
      img: img,
    });
    //save the new info
    const newBook = await book.save();
    //display new book
    res.status(200).json({
      Created: newBook,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      Error: err,
    });
  }
});

// Display all book endpoint ✅
router.get("/all", async (req, res) => {
  try {
    //the find has no filters, so every book within the database is displayed
    let results = await Book.find()
      .populate([
        "title",
        "author",
        "description",
        "user",
        "genre",
        "rentedUser",
        "isbn",
        "img"
      ])
      .select({
        text: 1,
        createdAt: 1,
        updatedAt: 1,
      });

    res.status(200).json({
      Created: results,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      Error: err,
    });
  }
});
// Display all available book endpoint (modified) ✅
router.get("/allavailable", async (req, res) => {
  try {
    // Find books where 'checkedout' is false
    const availableBooks = await Book.find({ checkedout: false }).exec(); // Execute the query

    res.status(200).json(availableBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: err.message }); // More descriptive error messages
  }
});

//get specific book ✅
router.get("/book/:_id", async (req, res) => {
  try {
    //find a book where the mongo id matches what's in the paramter
    let results = await Book.findOne({ _id: req.params._id }).populate("user", [
      "firstName",
      "lastName",
    ]);

    if (!results) {
      return res.status(404).json({ Error: "Book not found" });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error(err);

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

    let results = await Book.find(whatever).sort({ createdAt: 1 }); //sort by when it was created, +1, shows newest first

    res.status(200).json({
      Results: results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      Error: err,
    });
  }
});

//[PUT] Adding Update Endpoint ✅
router.put("/update/:_id", async (req, res) => {
  try {
    // Attempt to find the book by ID
    const bookToUpdate = await Book.findById(req.params._id);
    // Check if the book exists
    if (!bookToUpdate) {
      return res.status(404).json({ Error: "Book not found" });
    }
    // Check if the user is authorized to update the book
    if (
      bookToUpdate.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ Error: "Unauthorized" });
    }
    // Update the book with new values and return the updated document
    const updatedBook = await Book.findByIdAndUpdate(
      req.params._id,
      {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        genre: req.body.genre,
        condition: req.body.condition,
        rentedUser: req.body.rentedUser,
        checkedout: req.body.checkedOut,
      },
      { new: true }
    );
    // Send the updated book details as response
    res.status(200).json(updatedBook);
  } catch (err) {
    // Handle potential server errors
    res.status(500).json({ Error: err.message });
  }
});

// [DELETE] - Remove a book.
router.delete("/delete/:id", async (req, res) => {
  try {
    // Attempt to find the book by ID
    const book = await Book.findById(req.params.id);
    // Check if the book exists
    if (!book) {
      return res.status(404).json({ Error: "Book not found" });
    }
    // Check if the user is authorized to delete the book
    if (book.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ Error: "Unauthorized" });
    }
    // Remove the book from the database using deleteOne instead of .remove()
    await book.deleteOne();
    // Confirm deletion
    res.status(200).json({ Deleted: true });
  } catch (err) {
    // Handle potential server errors
    res.status(500).json({ Error: err.message });
  }
});

// search the books by genre title author ✅
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
