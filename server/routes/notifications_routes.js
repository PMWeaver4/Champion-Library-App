const router = require("express").Router();
const Notifications = require("../models/notifications");
const User = require("../models/user");
const Book = require("../models/book");
const Item = require("../models/item");
//? Assigning a variable from .env
const PASS = process.env.PASS;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: PASS
  },
});
async function mail(toEmail, emailSubject, emailText) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "info@demomailtrap.com", // sender address
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
            currentOwner: req.body.currentOwner,
            borrowrequest: req.body.borrowrequest,
            returnrequest: req.body.returnrequest,
            message: req.body.message,
            item: req.body.item,
            book: req.body.book,

        });
        //save the new notification
        const newNotifications = await notifications.save();

        //send an email to the owner that a request has been made
        let theRequest = "";
        let Email = await User.find({_id: newNotifications.currentOwner},{"email":1,"_id":0});
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

// Display all notifications endpoint for that user
router.get("/allYourNotifications", async (req, res) => {
  try {
    //filters for all notifications by and for the specific user calling this function. Displays keys of notification schema.
    let results = await Notifications.find({
      $or: [{ requestingUser: req.user._id }, { currentHolder: req.user._id }],
    
    })
      .populate({ path: "requestingUser", select: "email" })
      .populate({ path: "currentHolder", select: "email" })
      .populate({ path: "book", select: "title" })
      .populate({ path: "item", select: "description" })
      .populate(["borrowrequest", "returnrequest", "status", "message"])
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
// Display all notifications (for admin only)
router.get("/all", async (req, res) => {
  try {
    //filters for all notifications 
    if(req.user.isAdmin == true){
    let results = await Notifications.find({ })
      .populate({ path: "requestingUser", select: "email" })
      .populate({ path: "currentHolder", select: "email" })
      .populate({ path: "book", select: "title" })
      .populate({ path: "item", select: "description" })
      .populate(["borrowrequest", "returnrequest", "status", "message"])
      .select({
        text: 1,
        createdAt: 1,
        updatedAt: 1,
      });

    res.status(200).json({
      Results: results,
    });
  }
 } catch (err) {
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

               //send an email to the owner that a request has been made
               let theRequest = "";
               let Email = await User.find({_id: notificationsUpdate.requestingUser},{"email":1,"_id":0});
               let toEmail = Email[0].email;
               if (notificationsUpdate.book!=null){
               let RequestedBook = await Book.find({_id: notificationsUpdate.book},{"title":1,"_id":0});
               theRequest = RequestedBook[0].title;
               }
               if (notificationsUpdate.item!=null){
               let RequestedItem = await Item.find({_id: notificationsUpdate.item},{"description":1,"_id":0});
               theRequest = RequestedItem[0].description;
               }
               let CurrentOwner = await User.find({_id: notificationsUpdate.currentOwner},{"email":1,"_id":0});
               let owner = CurrentOwner[0].email;
               let emailSubject = `Updated Request`;
               let emailText = `${owner} has changed the status of your request for ${theRequest} to ${notificationsUpdate.status}`
       
               
               mail(toEmail, emailSubject, emailText);

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
router.delete("/delete/:id", async (req, res) => {
  try {
    const notifications = await Notifications.findByIdAndDelete(req.params.id);


        if (!notifications) throw new Error("Book/item notification not found");


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
