const router = require("express").Router();
const Item = require("../models/item");


//create item
router.post("/create/", async(req,res) => {
    console.log(req);
    try{     
            let item = new Item({
            description: req.body.description,
            user: req.user.email,
            rentedUser: "",
            checkedout: "",
            itemType: req.body.itemType,
            condition: req.body.condition
        });

        const newItem = await item.save();

        res.status(200).json({
            Created: newItem,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            Error: err,
        });
    }
});

// Display all item endpoint
  router.get("/all", async (req, res) => {
    try {

        let results = await Item.find().populate( ["description", "user", "rentedUser", "checkedout", "itemType", "condition"])
        .select({
            text: 1,
            createdAt:1,
            updatedAt: 1,
        });

        // const newBook = await post.save();
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
// Display all available item endpoint
  router.get("/allavailable", async (req, res) => {
    try {

        let results = await Item.find({checkedout: false}).populate( ["description", "user", "rentedUser", "checkedout", "itemType", "condition"])
        .select({
            text: 1,
            createdAt:1,
            updatedAt: 1,
        });

        // const newBook = await post.save();
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

//get by id

//update

router.put("/update/:_id", async (req, res) => {
    try {
        const itemToUpdate = await Item.findOne({_id: req.params._id}).exec()
        const updatedValues = {
            description: req.body.description,
            itemType: req.body.itemType,
            condition: req.body.condition,
            rentedUser: req.body.rentedUser,
            checkedout: req.body.checkedOut,
        }  
       await itemToUpdate.updateOne(updatedValues).exec();

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

// [DELETE] - Remove an item.
router.delete("/delete/:itemId", async (req, res) => {
    try {

        const item = await Item.findByIdAndDelete(req.params.itemId);

            if (!Item) throw new Error("Item not found");

            res.status(200).json({
                Deleted: 1,
            });
        } catch (err) {
            res.status(500).json({
                Error: err,
            });
        }
    });

module.exports = router;