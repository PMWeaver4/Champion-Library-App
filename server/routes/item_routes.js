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
            type: req.body.type,
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

        let results = await Item.find().populate( ["description", "user", "rentedUser", "checkedout", "type", "condition"])
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
//delete


module.exports = router;