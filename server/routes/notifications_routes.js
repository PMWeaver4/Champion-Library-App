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
            owner: req.body.owner,
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
        let Email = await User.find({_id: newNotifications.owner},{"email":1,"_id":0});
        let toEmail = Email[0].email;
        if (newNotifications.book!=null){
        let RequestedBook = await Book.find({_id: newNotifications.book},{"title":1,"_id":0});
        theRequest = RequestedBook[0].title;
        }
        if (newNotifications.item!=null){
        let RequestedItem = await Item.find({_id: newNotifications.item},{"description":1,"_id":0});
        theRequest = RequestedItem[0].description;
        }
        let Requester = await User.find({_id: newNotifications.requestingUser});
        let requester = Requester[0].firstName + Requester[0].lastName;
        let emailSubject = `New Request`;
        let emailText = `${requester} is requesting ${theRequest} from ${toEmail}. ${newNotifications.message}`

        
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
      $or: [{ requestingUser: req.user._id }, { owner: req.user._id }],
    
    })
      .populate({ path: "requestingUser", select: "email" })
      .populate({ path: "owner", select: "email" })
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
      .populate({ path: "owner", select: "email" })
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
        const oldNotification = notificationsUpdate;
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
        console.log(`0: `)
       await notificationsUpdate.updateOne(updatedValues).exec();
       const updatedNotifications = await Notifications.findOne({_id: req.params._id}).exec()
       console.log(`0.5: ${oldNotification.status}`, updatedNotifications)

       //sends an email if the status changes from pending
       if(oldNotification.status == "pending" && (updatedNotifications.status =="accepted" || updatedNotifications.status =="declined")){
               //send an email to the borrower that a change has been made
               console.log(`1: ${updatedNotifications.status}`);
               let theRequest = "";
               let Email = await User.find({_id: updatedNotifications.requestingUser},{"email":1,"_id":0});
               
               let toEmail = Email[0].email;
               console.log(`1.25: ${toEmail}`);
               if (updatedNotifications.book!=null){
               let RequestedBook = await Book.find({_id: updatedNotifications.book},{"title":1,"_id":0});
               theRequest = RequestedBook[0].title;
               console.log("1.5",theRequest);
               }
               if (updatedNotifications.item!=null){
               let RequestedItem = await Item.find({_id: updatedNotifications.item},{"itemName":1,"_id":0});
               theRequest = RequestedItem[0].itemName;
               console.log("1.6", theRequest)
               }
               let ownerObj = await User.find({_id: updatedNotifications.owner});
               let owner = ownerObj[0].firstName + " " + ownerObj[0].lastName;
               console.log("1.75", owner)
               let emailSubject = `Updated Request`;
               console.log(updatedNotifications.status, updatedNotifications.message);
               let emailText = `${owner} has changed the status of your request for ${theRequest} to ${updatedNotifications.status}. ${updatedNotifications.message}`
               
               console.log(`2: ${toEmail}, ${emailSubject}, ${emailText}`);
               
               mail(toEmail, emailSubject, emailText);

               if (updatedNotifications.status == "accepted"){
                if (updatedNotifications.book!=null){
                  let RequestedBook = await Book.find({_id: updatedNotifications.book});
                  let updatedBookValues = {
                    checkedout: true,
                    rentedUser: updatedNotifications.requestingUser
                  }
                  console.log(`3: ${updatedBookValues.checkedout}`, RequestedBook[0].checkedout, updatedBookValues.rentedUser)
                  
                  await RequestedBook[0].updateOne(updatedBookValues).exec();
                  // Object.keys(updatedBookValues[0].checkedout) = RequestedBook[0].checkedout;
                  //John wants us to test the above code out
                  }
                  if (updatedNotifications.item!=null){
                  let RequestedItem = await Item.find({_id: updatedNotifications.item});
                  const updatedItemValues = {
                    checkedout: true,
                    // rentedUser: toEmail
                  }
                  console.log(`3.5: ${updatedItemValues}`)
                  await RequestedItem.updateOne(updatedItemValues).exec();
                  }
                  //set date to current
                 updatedNotifications.borrowrequest = moment().format('MMMM Do YYYY, h:mm:ss a');
                 console.log(`4: ${updatedNotifications.borrowrequest}`)
                 //set return to current + 2 weeks
                updatedNotifications.returnrequest = moment().add(14, 'days').calendar();
               }
              //shows the new values
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
