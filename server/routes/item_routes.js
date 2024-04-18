const router = require("express").Router();
const Item = require("../models/item");

//create item
//  simplified item
router.post("/create/", async (req, res) => {
  //insert information into Item schema to create an item
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Display all item endpoint
router.get("/all", async (req, res) => {
  try {
    //displays all items
    let results = await Item.find().populate(["description", "user", "rentedUser", "checkedout", "itemType", "condition"]).select({
      text: 1,
      createdAt: 1,
      updatedAt: 1,
    });

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
// Display all available item endpoint
router.get("/allavailable", async (req, res) => {
  try {
    //finds all items where they are not checked out, i.e. available
    let results = await Item.find({ checkedout: false })
      .populate(["itemName", "img", "description", "user", "rentedUser", "checkedout", "itemType", "condition"])
      .select({
        text: 1,
        createdAt: 1,
        updatedAt: 1,
      });

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

//get by id
router.get("/item/:_id", async (req, res) => {
  try {
    //find an item where the mongo id matches what's in the paramter
    let results = await Item.find({ _id: req.params._id });
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

//update

router.put("/update/:_id", async (req, res) => {
    try {
        
        //find a single item by its mongodb id
        const itemToUpdate = await Item.findOne({_id: req.params._id}).exec()
        //receives values to update
        if (itemToUpdate.user == req.user.email || req.user.isAdmin == true){
        const updatedValues = {
            description: req.body.description,
            itemType: req.body.itemType,
            condition: req.body.condition,
            rentedUser: req.body.rentedUser,
            checkedout: req.body.checkedOut,
        }  
        //inserts values into item
       await itemToUpdate.updateOne(updatedValues).exec();
        //display it
        res.status(200).json({
            Updated: updatedValues,
            Results: updatedValues,
        });
    }
    } catch (err) {
        res.status(500).json({
            Error: err,
        });
    }
});

// [DELETE] - Remove an item.
router.delete("/delete/:itemId", async (req, res) => {
    try {
        //find item by mongodb id, and say goodbye
        const checkItem = await Item.findById(req.params.itemId)
        if (checkItem.user == req.user.email || req.user.isAdmin == true){
        const item = await Item.findByIdAndDelete(req.params.itemId);
            //unless the id doesn't match an item
            if (!Item) throw new Error("Item not found");

            res.status(200).json({
                Deleted: 1,
            });
        }
     } catch (err) {
            res.status(500).json({
                Error: err,
            });
        }
    });
  }
});

module.exports = router;
