const router = require("express").Router();
const Book = require("../models/book");
const Item = require("../models/item");


// Get all books owned by a specified user (identified by _id) ✅
router.get("/books/:_id", async (req, res) => {
    try {
        console.log("Fetching books for user ID:", req.params._id); // Log the user ID being queried
        const results = await Book.find({user: req.params._id});
        console.log("Found books:", results); // Log the results to see what is found
        if (results.length === 0) {
            console.log("No books found for this user.");
            return res.status(404).json({Error: "No books found for this user."});
        }
        res.status(200).json({Results: results});
    } catch (err) {
        console.log("Error fetching books:", err.message); // Log any errors that occur
        res.status(500).json({Error: err.message});
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
    console.log(err);

    res.status(500).json({
      Error: err,
    });
  }
});

// Get all items owned by a specified user (identified by _id) ✅
router.get("/items/:_id", async (req, res) => {
    try {
        const results = await Item.find({user: req.params._id});
        res.status(200).json({Results: results});
    } catch (err) {
        console.log(err);
        res.status(500).json({Error: err.message});
    }
});

// Get all available items owned by a specific user ✅
router.get("/availableitems/:_id", async (req, res) => {
    try {
        const results = await Item.find({user: req.params._id, checkedout: false});
        res.status(200).json({Results: results});
    } catch (err) {
        console.log(err);
        res.status(500).json({Error: err.message});
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
    console.log(err);

    res.status(500).json({
      Error: err,
    });
  }
});
//get available items books and items by user ✅
router.get("/allavailable/:_id", async (req, res) => {
  try {
    //selects all books owned by a specific user that are not checked out
    let results = await Book.find({ user: req.params._id, checkedout: false });
    //selects all items owned by a specific user that are not checked out
    let results2 = await Item.find({ user: req.params._id, checkedout: false });
    //puts them all together into one set of results
    results = results.concat(results2);

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

module.exports = router;
