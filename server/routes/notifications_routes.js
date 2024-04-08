const router = require("express").Router();
const notifications = require("../models/notifications");


// Display all notifications endpoint
router.get("/all", async (req, res) => {
    try {

        let results = await notifications.find().populate( ["user", "bookavailable", "itemavailable", "gamesavailable", "currentholder"])
        .select({
            text: 1,
            createdAt:1,
            updatedAt: 1,
        });

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

router.

router.delete("", async(req,res) => {
    try {
        const notifications = await User.findByIdAndDelete(req.params.id);

        if (!notifications) throw new Error("Book/item not found");

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