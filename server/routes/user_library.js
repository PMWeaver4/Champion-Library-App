const router = require("express").Router();
const Book = require("../models/book");
const Item = require("../models/item")


//get all books by user
router.get("/books/:_id", async (req, res) => {
    try {
        //selects books owned by a specified user (identified by _id)
        let results = await Book.find({user: req.params._id});
        res.status(200).json({
            Results: results,
        })
    } catch(err){
        console.log(err);

        res.status(500).json({
            Error: err,
        });
    }
});
//get all available books by user
router.get("/availablebooks/:_id", async (req, res) => {
    try {
        //selects all books owned by a specific user that are not checked out
        let results = await Book.find({user: req.params._id, checkedout: false});

        res.status(200).json({
            Results: results,
        })
    } catch(err){
        console.log(err);

        res.status(500).json({
            Error: err,
        });
    }
});
//get items by user
router.get("/items/:_id", async (req, res) => {
    try {
        //selects items owned by a specified user (identified by _id)
        let results = await Item.find({user: req.params.id});
        res.status(200).json({
            Results: results,
        })
    } catch(err){
        console.log(err);

        res.status(500).json({
            Error: err,
        });
    }
});
//get available items by user
router.get("/availableitems/:_id", async (req, res) => {
    try {
        //selects all items owned by a specific user that are not checked out
        let results = await Item.find({user: req.params._id, checkout:false});
        res.status(200).json({
            Results: results,
        })
    } catch(err){
        console.log(err);

        res.status(500).json({
            Error: err,
        });
    }
});
//get items books and items by user
router.get("/all/:_id", async (req, res) => {
    try {
        //selects books owned by a specified user (identified by _id)
        let results = await Book.find({user: req.params._id});
        //selects items owned by a specified user (identified by _id)
        let results2 = await Item.find({user: req.params._id});
        //puts them all together into one set of results
        results = results.concat(results2);

        res.status(200).json({
            Results: results,
        })
    } catch(err){
        console.log(err);

        res.status(500).json({
            Error: err,
        });
    }
});
//get available items books and items by user
router.get("/allavailable/:_id", async (req, res) => {
    try {
        //selects all books owned by a specific user that are not checked out
        let results = await Book.find({user: req.params._id, checkedout: false});
        //selects all items owned by a specific user that are not checked out
        let results2 = await Item.find({user: req.params._id, checkedout: false});
        //puts them all together into one set of results
        results = results.concat(results2);

        res.status(200).json({
            Results: results,
        })
    } catch(err){
        console.log(err);

        res.status(500).json({
            Error: err,
        });
    }
});


module.exports = router;