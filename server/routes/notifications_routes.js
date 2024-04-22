const router = require("express").Router();
//records date/time 
const moment = require('moment');
const Notifications = require("../models/notifications");
const User = require("../models/user");
const Book = require("../models/book");
const Item = require("../models/item");
//? Assigning a variable from .env
const PASS = process.env.PASS;

//enable mail functionality
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  //using mailtrap as the smtp
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
        //get the email
        let Email = await User.find({_id: newNotifications.owner},{"email":1,"_id":0});
        //convert from array to string
        let toEmail = Email[0].email;
        //if the notification is to request a certain book, grab it's title
        if (newNotifications.book!=null){
          let RequestedBook = await Book.find({_id: newNotifications.book},{"title":1,"_id":0});
          theRequest = RequestedBook[0].title;
        }
        //if the notification is to request a certain item, grab it's name
        if (newNotifications.item!=null){
        let RequestedItem = await Item.find({_id: newNotifications.item},{"itemName":1,"_id":0});
        theRequest = RequestedItem[0].itemName;
        }
        //store who is requesting
        let Requester = await User.find({_id: newNotifications.requestingUser});
        //let's display their name
        let requester = Requester[0].firstName + " " + Requester[0].lastName;
        //by design, a newly created notification is a "New Request"
        let emailSubject = `New Request`;
        //customized email text
        let emailText = `${requester} is requesting ${theRequest} from ${toEmail}. ${newNotifications.message}`

        //utilize mail function to send an email
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
        //store the notification as "old" before the update for comparison
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
       await notificationsUpdate.updateOne(updatedValues).exec();
        //retrieves the updated notification to compare to old
       const updatedNotifications = await Notifications.findOne({_id: req.params._id}).exec()

       //sends an email if the status changes from pending
       if(oldNotification.status == "pending"  && (updatedNotifications.status =="accepted" || updatedNotifications.status =="declined")){
               //?send an email to the borrower that a change has been made
               //declare the string that will hold the request
               let theRequest = "";
               //retrieve the email from user making the request
               let Email = await User.find({_id: updatedNotifications.requestingUser},{"email":1,"_id":0});
               //convert the email from array to string
               let toEmail = Email[0].email;
               //if it's a book, get the title
               if (updatedNotifications.book!=null){
               let RequestedBook = await Book.find({_id: updatedNotifications.book},{"title":1,"_id":0});
               theRequest = RequestedBook[0].title;
               }
               //if it's an item, get the itemName
               if (updatedNotifications.item!=null){
               let RequestedItem = await Item.find({_id: updatedNotifications.item},{"itemName":1,"_id":0});
               theRequest = RequestedItem[0].itemName;
               }
               //retrieve the book/item's owner
               let ownerObj = await User.find({_id: updatedNotifications.owner});
               //convert the owner from an array to a string
               let owner = ownerObj[0].firstName + " " + ownerObj[0].lastName;
               
               let emailSubject = `Updated Request`;
               //descriptive text telling the requester that the owner has changed the status of the notification
               let emailText = `${owner} has changed the status of your request for ${theRequest} to ${updatedNotifications.status}. ${updatedNotifications.message}`
               
               mail(toEmail, emailSubject, emailText);

               //if the owner has accepted the request
               if (updatedNotifications.status == "accepted"){
                //if it's a book update 
                if (updatedNotifications.book!=null){
                  let RequestedBook = await Book.find({_id: updatedNotifications.book});
                  //checkedout state to true, and record who it's loaned to
                  let updatedBookValues = {
                    checkedout: true,
                    rentedUser: updatedNotifications.requestingUser
                  }
                  await RequestedBook[0].updateOne(updatedBookValues).exec();
                  // Object.keys(updatedBookValues[0].checkedout) = RequestedBook[0].checkedout;
                  //John wants us to test the above code out
                  }
                  //if it's an item update
                  if (updatedNotifications.item!=null){
                  let RequestedItem = await Item.find({_id: updatedNotifications.item});
                  //checkedout state to true, and record who it's loaned to
                  let updatedItemValues = {
                    checkedout: true,
                    rentedUser: updatedNotifications.requestingUser
                  }
                  await RequestedItem[0].updateOne(updatedItemValues).exec();
                  }
                  
                  //set approval date to current
                  let approveDate = moment().format();
                  //update the notification's approval date
                  const dateValues = {
                      borrowrequest: approveDate,
                  }
                 await updatedNotifications.updateOne(dateValues).exec();            
               }
               //still need to do decline option

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

//return
router.put("/return/:_id")
{
  try {
    console.log("this is working");
    const returnUpdate = await Notifications.findById({_id: req.params._id});
    
    //if requester selects return, returnrequest populates with date
    if(returnUpdate.requestingUser = req.user._id){
      let returnDate = moment().format();

      const updatedNotification = await Notifications.findByIdAndUpdate(
        req.params._id,
        {
        returnrequest: returnDate,
        status: "pending",
        message: req.body.message,
      },
      { new: true }
    )
      //email notifies owner
    }
    
    //if owner accepts return,
    if(returnUpdate.owner = req.user._id){
    //msg updates
    const updatedNotification = await Notifications.findByIdAndUpdate(
      req.params._id,
      {
      message: req.body.message,
    },
    { new: true }
  )
    //email notifies requester
    
    //notification deletes
    //await Notifications.findbyIDAndDelete(req.params._id)

  }
    res.status(200).json({
      Updated: updatedValues
    })
  } catch(err) {
    res.status(500).json({
      Error: err,
  });
  }
}

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
