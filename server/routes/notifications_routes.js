const router = require("express").Router();
const Notifications = require("../models/notifications");
const User = require("../models/user");
const Book = require("../models/book");
const Item = require("../models/item");

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
        //create new notifications from schema
        let notifications = new Notifications({
            requestingUser: req.user._id,
            currentHolder: req.body.currentHolder,
            borrowrequest: req.body.borrowrequest,
            returnrequest: req.body.returnrequest,
            message: req.body.message,
            item: req.body.item,
            book: req.body.book,

        });
        //save the new notification
        const newNotifications = await notifications.save();
        let theRequest = "";
        let Email = await User.find({_id: newNotifications.currentHolder},{"email":1,"_id":0});
        let toEmail = Email[0].email;
        if (newNotifications.book!=null){
        let RequestedBook = await Book.find({_id: newNotifications.book},{"title":1,"_id":0});
        theRequest = RequestedBook[0].title;
        }
        if (newNotifications.item!=null){
        let RequestedItem = await Item.find({_id: newNotifications.item},{"description":1,"_id":0});
        theRequest = RequestedItem[0].description;
        }
        let Requester = await User.find({_id: newNotifications.requestingUser},{"email":1,"_id":0});
        let requester = Requester[0].email;
        let emailSubject = `New Request`;
        let emailText = `${requester} is requesting ${theRequest} from ${toEmail}`
        console.log(emailSubject);
        console.log(emailText);
        
        mail(toEmail, emailSubject, emailText);



        //notify.....about the new notification
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
        //filters for all notifications by and for the specific user calling this function. Displays keys of notification schema.
        let results = await Notifications.find({$or: [{requestingUser: req.user._id}, {currentHolder: req.user._id}]})
        .populate({path: "requestingUser", select: "email"})
        .populate({path: "currentHolder", select: "email"})
        .populate({path: "book", select: "title"})
        .populate({path: "item", select: "description"})
        .populate([ "borrowrequest", "returnrequest", "status", "message"])
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

// get by individual user to be notified

        router.post("/create/", async(req, res) => {
            try {
                // Determine if the request is for a book or an item
                let theRequest = "";
                let itemDetails;
                if (req.body.book) {
                    itemDetails = await Book.findById(req.body.book);
                    theRequest = `'${itemDetails.title}' by ${itemDetails.author}`;
                } else if (req.body.item) {
                    itemDetails = await Item.findById(req.body.item);
                    theRequest = itemDetails.description; // Assuming description is meaningful
                }
        
                // Construct a message based on the item type
                const message = `${req.user._id} has requested to borrow ${theRequest}.`;
        
                // Create new notification

        //mail(toEmail, emailSubject, emailText)

        res.status(200).json({
            Results: filtered,
        });
    } catch(err){
        console.log(err);
 
        res.status(500).json({
            Error: err,
        });
    }
});




//updates specific notification
router.put("/update/:_id", async (req, res) => {
    try {
        //finds notification by ID
        const notificationsUpdate = await Notifications.findOne({_id: req.params._id}).exec()
        //receives and stores values to update the notification
        const updatedValues = {
            borrowrequest: req.body.borrowrequest,
            returnrequest: req.body.returnrequest,
            status: req.body.status,
            message: req.body.message,
            item: req.body.item,
            book: req.body.book,
        }  
        //inserts values into updated notification
       await notificationsUpdate.updateOne(updatedValues).exec();

        //shows the new values
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

//gets notification by id and deletes
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