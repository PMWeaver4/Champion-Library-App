const router = require("express").Router();
const Notifications = require("../models/notifications");
// const User = require("../models/user");
// const Book = require("./book");
// const Item = require("./item");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "afcdcddfa29ca99ff16996676b0c9aae"
  }
});
async function mail(toEmail, emailSubject, emailText) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'info@demomailtrap.com', // sender address
      to: toEmail, // list of receivers
      subject: emailSubject, // Subject line
      text: emailText, // plain text body
      
    });
}

// Create Notifications

router.post("/create/", async(req,res) => {
    
    try{
        
        let notifications = new Notifications({
            requestingUser: req.user._id,
            // currentOwner: User.findbyId(req.body.currentOwner),
            currentOwner: req.body.currentOwner,
            borrowrequest: req.body.borrowrequest,
            returnrequest: req.body.returnrequest,
            message: req.body.message,
            item: req.body.item,
            book: req.body.book,

        });
        
        const newNotifications = await notifications.save();
        
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

        let results = await Notifications.find({$or: [{requestingUser: req.user._id}, {currentOwner: req.user._id}]})
        .populate({path: "requestingUser", select: "email"})
        .populate({path: "currentOwner", select: "email"})
        .populate({path: "book", select: "title"})
        .populate({path: "item", select: "description"})
        .populate([ "borrowrequest", "returnrequest", "status", "message"])
        .select({
            text: 1,
            createdAt:1,
            updatedAt: 1,
        });

        //mail(toEmail, emailSubject, emailText)

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

// add code for GET BY OWNER (INDIVIDUALS) 
// get all notifications for just requestingUser
router.get("/user/:_id", async (req, res) => {
    try {

        let results = await Notifications.find([{requestingUser: req.user._id}])
        .populate({path: "requestingUser", select: "email"})
        .populate({path: "book", select: "title"})
        .populate({path: "item", select: "description"})
        .populate([ "borrowrequest", "returnrequest", "status", "message"])
        .select({
            text: 1,
            createdAt:1,
            updatedAt: 1,
        });

        //mail(toEmail, emailSubject, emailText)

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

// get all current

router.get("/user/:_id", async (req, res) => {
    try {

        let results = await Notifications.find([{requestingUser: req.user._id}])
        .populate({path: "requestingUser", select: "email"})
        .populate({path: "book", select: "title"})
        .populate({path: "item", select: "description"})
        .populate([ "borrowrequest", "returnrequest", "status", "message"])
        .select({
            text: 1,
            createdAt:1,
            updatedAt: 1,
        });

        //mail(toEmail, emailSubject, emailText)

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