const router = require("express").Router();
const Item = require("../models/item");

//create item ✅
router.post("/create/", async (req, res) => {
  //insert information into Item schema to create an item
  try {
    const { description, itemName, itemType } = req.body;
    const itemData = {
      description,
      itemName,
      itemType,
      user: req.user._id,
    };

    const newItem = new Item(itemData);
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Display all item endpoint ✅
router.get("/all", async (req, res) => {
  try {
    //displays all items
    let results = await Item.find()
      .populate([
        "description",
        "user",
        "rentedUser",
        "checkedout",
        "itemType",
        "condition",
        "img",
        "itemName",
      ])
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
// Display all available item endpoint ✅
router.get("/allavailable", async (req, res) => {
  try {
    //finds all items where they are not checked out, i.e. available
    let results = await Item.find({ checkedout: false })
      .populate([
        "itemName",
        "img",
        "description",
        "user",
        "rentedUser",
        "checkedout",
        "itemType",
        "condition",
      ])
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

//get by id ✅
router.get("/item/:_id", async (req, res) => {
  try {
    //find an item where the mongo id matches what's in the paramter
    let results = await Item.findOne({ _id: req.params._id }).populate("user", [
      "firstName",
      "lastName",
    ]);

    if (!results) {
      return res.status(404).json({ Error: "Item not found" });
    }

    res.status(200).json(results);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      Error: err,
    });
  }
});

//update ✅
router.put("/update/:_id", async (req, res) => {
  try {
    const itemToUpdate = await Item.findById(req.params._id);
    // Check if the item exists
    if (!itemToUpdate) {
      return res.status(404).json({ Error: "Item not found" });
    }
    // Check if the current user is the item owner or an admin
    if (
      itemToUpdate.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ Error: "Unauthorized" });
    }

    // Define the values to be updated
    const updatedItem = await Item.findByIdAndUpdate(
      req.params._id,
      {
        itemName: req.body.itemName,
        description: req.body.description,
        itemType: req.body.itemType,
        condition: req.body.condition,
        rentedUser: req.body.rentedUser,
        checkedout: req.body.checkedOut,
      },
      { new: true }
    );
    // Send the updated item details as response
    res.status(200).json(updatedItem);
  } catch (err) {
    // Handle potential server errors
    res.status(500).json({ Error: err.message });
  }
});

// [DELETE] - Remove an item. ✅
router.delete("/delete/:itemId", async (req, res) => {
  try {
    // Find item by MongoDB ID
    const item = await Item.findById(req.params.itemId);
    // Check if the item exists
    if (!item) {
      return res.status(404).json({ Error: "Item not found" });
    }
    // Check if the current user is the item owner or an admin
    if (item.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ Error: "Unauthorized" });
    }
    // Delete the item
    await item.deleteOne(); // Using .remove() method on the found document
    // Confirm deletion
    res.status(200).json({ Deleted: true });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

// search the items by name description  ✅
router.get("/searchThrough", async (req, res) => {
  const searchString = req.query.q;
  try {
    // RegExp is regular expression
    const regex = new RegExp(searchString, "i");
    const items = await Item.find({
      $or: [{ itemName: regex }, { description: regex }],
    });
    // Send the found books back to the client
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error });
  }
});

module.exports = router;
