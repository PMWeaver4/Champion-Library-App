const router = require("express").Router();
const Book = require("../models/book");
const Item = require("../models/item")


//get all books by user
router.get("/books/:email", async (req, res) => {
    try {
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
//get items books by user
router.get("/items/:email", async (req, res) => {
    try {
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
//get available items books by user
router.get("/availableitems/:email", async (req, res) => {
    try {
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
        let results = await Book.find({user: req.params.email});
        let results2 = await Item.find({user: req.params.email});
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
        let results = await Book.find({user: req.params.email, checkedout: false});
        let results2 = await Item.find({user: req.params.email, checkedout: false});
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