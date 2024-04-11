const router = require("express").Router();
const Notifications = require("../models/notifications");


// Create Notifications

router.post("/create/", async(req,res) => {
    
    try{
        
        let notifications = new Notifications({
            requestingUser: req.user._id,
            owner: req.body.owner,
            borrowrequest: req.body.borrowrequest,
            returnrequest: req.body.returnrequest,
            message: req.body.message,
            item: req.body.item,
            book: req.body.book,

        });
        
        const newNotifications = await notifications.save();
        console.log(Count);
        res.status(200).json({
            Created: newNotifications,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            Error:err,
        });
    }
});


// Display all notifications endpoint
router.get("/all", async (req, res) => {
    try {

        let results = await Notifications.find({$or: [{requestingUser: req.user._id}, {currentOwner: req.user._id}]}).populate( ["requestingUser", "owner", "borrowrequest", "returnrequest", "status", "message", "item", "book"])
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

// add code for GET BY OWNER (INDIVIDUALS) 4/10



router.put("/update/:_id", async (req, res) => {
    try {
        const notificationsUpdate = await Notifications.findOne({_id: req.params._id}).exec()
        const updatedValues = {
            borrowrequest: req.body.borrowrequest,
            returnrequest: req.body.returnrequest,
            status: req.body.status,
            message: req.body.message,
            item: req.body.item,
            book: req.body.book,
        }  
       await notificationsUpdate.updateOne(updatedValues).exec();

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

router.delete("/delete/:id", async(req,res) => {
    try {
        const notifications = await Notifications.findByIdAndDelete(req.params.id);

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