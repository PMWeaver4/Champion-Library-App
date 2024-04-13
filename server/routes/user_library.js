const router = require("express").Router();
const Book = require("../models/book");
const Item = require("../models/item")


//get all books by user
router.get("/books/:email", async (req, res) => {
    try {
        //selects books owned by a specified user (identified by email)
        let results = await Book.find({user: req.params.email});
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
router.get("/availablebooks/:email", async (req, res) => {
    try {
        //selects all books owned by a specific user that are not checked out
        let results = await Book.find({user: req.params.email, checkedout: false});

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
router.get("/items/:email", async (req, res) => {
    try {
        //selects items owned by a specified user (identified by email)
        let results = await Item.find({user: req.params.email});
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
router.get("/availableitems/:email", async (req, res) => {
    try {
        //selects all items owned by a specific user that are not checked out
        let results = await Item.find({user: req.params.email, checkout:false});
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
router.get("/all/:email", async (req, res) => {
    try {
        //selects books owned by a specified user (identified by email)
        let results = await Book.find({user: req.params.email});
        //selects items owned by a specified user (identified by email)
        let results2 = await Item.find({user: req.params.email});
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
router.get("/allavailable/:email", async (req, res) => {
    try {
        //selects all books owned by a specific user that are not checked out
        let results = await Book.find({user: req.params.email, checkedout: false});
        //selects all items owned by a specific user that are not checked out
        let results2 = await Item.find({user: req.params.email, checkedout: false});
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