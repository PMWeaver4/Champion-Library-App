const router = require("express").Router();
const Book = require("../models/book");
const Item = require("../models/item");

// Get all books owned by a specified user (identified by _id) ✅
router.get("/books/:_id", async (req, res) => {
  try {
    const results = await Book.find({ user: req.params._id });
    if (results.length === 0) {
      return res.status(404).json({ Error: "No books found for this user." });
    }

    res.status(200).json({ Results: results });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

//get all available books by user ✅
router.get("/availablebooks/:_id", async (req, res) => {
  try {
    //selects all books owned by a specific user that are not checked out
    let results = await Book.find({ user: req.params._id, checkedout: false });

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

// Get all items owned by a specified user (identified by _id) ✅
router.get("/items/:_id", async (req, res) => {
  try {
    const results = await Item.find({ user: req.params._id });
    res.status(200).json({ Results: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: err.message });
  }
});

// Get all available items owned by a specific user ✅
router.get("/availableitems/:_id", async (req, res) => {
  try {
    const results = await Item.find({ user: req.params._id, checkedout: false });
    res.status(200).json({ Results: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: err.message });
  }
});

//get items books and items by user ✅
router.get("/all/:_id", async (req, res) => {
  try {
    //selects books owned by a specified user (identified by _id)
    let results = await Book.find({ user: req.params._id });
    //selects items owned by a specified user (identified by _id)
    let results2 = await Item.find({ user: req.params._id });
    //puts them all together into one set of results
    results = results.concat(results2);

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
//get available items books and items by user ✅
// modified this to send books and items instead of a combination of two diff datatypes
router.get("/allavailable/:_id", async (req, res) => {
  try {
    //selects all books owned by a specific user that are not checked out
    let books = await Book.find({ user: req.params._id, checkedout: false });
    //selects all items owned by a specific user that are not checked out
    let items = await Item.find({ user: req.params._id, checkedout: false, itemType: "other" });
    let games = await Item.find({ user: req.params._id, checkedout: false, itemType: "game" });

    //puts them all together into one set of results

    res.status(200).json({
      books,
      items,
      games,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      Error: err,
    });
  }
});

//? endpoints for borrowed
// get borrowed books
router.get("/borrowedBooks/:_id", async (req, res) => {
  try {
    let books = await Book.find({ rentedUser: req.params._id });
    res.status(200).json({
      books,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      Error: err,
    });
  }
});
// get borrowed games
router.get("/borrowedGames/:_id", async (req, res) => {
  try {
    let games = await Item.find({ rentedUser: req.params._id, itemType: "game" });
    res.status(200).json({
      games,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      Error: err,
    });
  }
});
// get borrowed items
router.get("/borrowedItems/:_id", async (req, res) => {
  try {
    let items = await Item.find({ rentedUser: req.params._id, itemType: "other" });
    res.status(200).json({
      items,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      Error: err,
    });
  }
});
//? endpoint for loaned
// get loaned books
router.get("/loanedBooks/:_id", async (req, res) => {
  try {
    let books = await Book.find({ user: req.params._id, checkedout: true });
    res.status(200).json({
      books,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      Error: err,
    });
  }
});
// get loaned games
router.get("/loanedGames/:_id", async (req, res) => {
  try {
    let games = await Item.find({ user: req.params._id, checkedout: true, itemType: "game" });
    res.status(200).json({
      games,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      Error: err,
    });
  }
});
// get loaned items
router.get("/loanedItems/:_id", async (req, res) => {
  try {
    let items = await Item.find({ user: req.params._id, checkedout: true, itemType: "other" });
    res.status(200).json({
      items,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      Error: err,
    });
  }
});

module.exports = router;
