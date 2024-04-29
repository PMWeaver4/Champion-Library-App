/**
 * TODO signup: sends email that you created account and must wait admin approval before login
 * TODO signup: admin recieves email that user wants to join and that they should login to approve or deny the user
 * TODO signup: if admin approves user, user recieves email theyve been approved and can log in
 * TODO signup: if admin denies user, user recieved email theyve been declined and can not login (user is kept on "blacklist so they cant request to signup again with same email")
 * TODO borrow request: when a user submits a borrow request for book or item recieving user should get an in app notif and a email notif saying a user wants to borrow their book/item
 * TODO borrow req: when a user accepts or declines a borrow request the requestingUser recieves an in app notif and email
 * TODO return request: when a user submits a return request for book or itemrecieving user should get an in app notif and a email notif saying a user wants to return their book/item
 * TODO return req: when a user accepts or declines a return request the requestingUser recieves an in app notif and email
 * TODO if declined or accepted deletes inbox message
 */

const router = require("express").Router();
//records date/time
const moment = require("moment");
const Notifications = require("../models/notifications");
const User = require("../models/user");
const Book = require("../models/book");
const Item = require("../models/item");
//? Assigning a variable from .env
const PASS = process.env.PASS;

//enable mail functionality
const nodemailer = require("nodemailer");
const { Email, EmailTypes } = require("../Email/Email");
const transporter = nodemailer.createTransport({
  //using mailtrap as the smtp
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: PASS,
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

// ? this is an EXAMPLE of how to send an email
router.post("/testEmail", async (req, res) => {
  try {
    const result = await Email.sendWithTemplate({
      recipient: "uprightchampions@proton.me",
      email_type: EmailTypes.ReturnDecline,
      template_variables: {
        item_details: "Test_Item_details",
        requestingUser_firstname: "Test_RequestingUser_firstname",
        owner_fullname: "Test_Owner_fullname",
        owner_email: "Test_Owner_email",
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// Create Notifications
router.post("/create/", async (req, res) => {
  try {
    //create new notifications from schema
    console.log("1, get it started");
    let notifications = new Notifications({
      requestingUser: req.user._id,
      owner: req.body.owner,
      borrowrequest: req.body.borrowrequest,
      returnrequest: req.body.returnrequest,
      message: "Has requested to borrow: ",
      notificationType: "borrow",
      item: req.body.item,
      book: req.body.book,
    });
    //save the new notification
    const newNotifications = await notifications.save();
    console.log("2", newNotifications);

    //send an email to the owner that a request has been made
    let theRequest = "";
    //get the email
    let Email = await User.find({ _id: newNotifications.owner }, { email: 1, _id: 0 });
    //convert from array to string
    let toEmail = Email[0].email;
    //if the notification is to request a certain book, grab it's title
    if (newNotifications.book != null) {
      let RequestedBook = await Book.find({ _id: newNotifications.book }, { title: 1, _id: 0 });
      theRequest = RequestedBook[0].title;
    }
    //if the notification is to request a certain item, grab it's name
    if (newNotifications.item != null) {
      let RequestedItem = await Item.find({ _id: newNotifications.item }, { itemName: 1, _id: 0 });
      theRequest = RequestedItem[0].itemName;
    }
    //store who is requesting
    let Requester = await User.find({ _id: newNotifications.requestingUser });
    //let's display their name
    let requester = Requester[0].firstName + " " + Requester[0].lastName;
    //by design, a newly created notification is a "New Request"
    let emailSubject = `New Request`;
    //customized email text
    let emailText = `${requester} ${newNotifications.message} ${theRequest} from you. `;

    //utilize mail function to send an email
    mail(toEmail, emailSubject, emailText);

    //notify.....about the new notification
    res.status(200).json({
      Created: newNotifications,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

// Display all notifications endpoint for that user
router.get("/allYourNotifications/:_id", async (req, res) => {
  try {
    //filters for all notifications by and for the specific user calling this function. Displays keys of notification schema.
    let results = await Notifications.find({
      $or: [{ requestingUser: req.params._id }, { owner: req.params._id }],
    })
      .populate({ path: "requestingUser", select: "email firstName lastName" })
      .populate({ path: "owner", select: "email firstName lastName" })
      .populate({ path: "book", select: "title" })
      .populate({ path: "item", select: "itemName description" })
      .populate(["borrowrequest", "returnrequest", "status", "message", "notificationType"])
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
    if (req.user.isAdmin == true) {
      let results = await Notifications.find({})
        .populate({ path: "requestingUser", select: "email" })
        .populate({ path: "owner", select: "email" })
        .populate({ path: "book", select: "title" })
        .populate({ path: "item", select: "description" })
        .populate(["borrowrequest", "returnrequest", "status", "message", "notificationType"])
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
    const notificationsUpdate = await Notifications.findOne({
      _id: req.params._id,
    }).exec();
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
      notifcationType: req.body.notificationType,
    };
    //inserts values into updated notification
    await notificationsUpdate.updateOne(updatedValues).exec();
    //retrieves the updated notification to compare to old
    const updatedNotifications = await Notifications.findOne({
      _id: req.params._id,
    }).exec();

    //sends an email if the status changes from pending
    if (oldNotification.status == "pending" && (updatedNotifications.status == "accepted" || updatedNotifications.status == "declined")) {
      //?send an email to the borrower that a change has been made
      //declare the string that will hold the request
      let theRequest = "";
      if (updatedNotifications.book != null) {
        let RequestedBook = await Book.find({ _id: updatedNotifications.book }, { title: 1, _id: 0 });
        theRequest = RequestedBook[0].title;
      }
      //if it's an item, get the itemName
      if (updatedNotifications.item != null) {
        let RequestedItem = await Item.find({ _id: updatedNotifications.item }, { itemName: 1, _id: 0 });
        theRequest = RequestedItem[0].itemName;
      }
      //retrieve the email from user making the request
      let Email = await User.find({ _id: updatedNotifications.requestingUser }, { email: 1, _id: 0 });
      //convert the email from array to string
      let toEmail = Email[0].email;
      //if it's a book, get the title
      //retrieve the book/item's owner
      let ownerObj = await User.find({ _id: updatedNotifications.owner });
      //convert the owner from an array to a string
      let owner = ownerObj[0].firstName + " " + ownerObj[0].lastName;

      let emailSubject = `Updated Request`;
      //descriptive text telling the requester that the owner has changed the status of the notification
      let emailText = `${owner} has changed the status of your request for ${theRequest} to ${updatedNotifications.status}. ${updatedNotifications.message}`;

      mail(toEmail, emailSubject, emailText);

      //if the owner has accepted the request
      if (updatedNotifications.status == "accepted") {
        //if it's a book update
        if (updatedNotifications.book != null) {
          let RequestedBook = await Book.find({
            _id: updatedNotifications.book,
          });
          //checkedout state to true, and record who it's loaned to
          let updatedBookValues = {
            checkedout: true,
            rentedUser: updatedNotifications.requestingUser,
          };
          await RequestedBook[0].updateOne(updatedBookValues).exec();
        }
        //if it's an item update
        if (updatedNotifications.item != null) {
          let RequestedItem = await Item.find({
            _id: updatedNotifications.item,
          });
          //checkedout state to true, and record who it's loaned to
          let updatedItemValues = {
            checkedout: true,
            rentedUser: updatedNotifications.requestingUser,
          };
          await RequestedItem[0].updateOne(updatedItemValues).exec();
        }

        //set approval date to current
        let approveDate = moment().format();
        //update the notification's approval date
        const dateValues = {
          borrowrequest: approveDate,
        };
        await updatedNotifications.updateOne(dateValues).exec();
      }
      //if the owner has declined the request
      if (updatedNotifications.status == "declined") {
        const notifications = await Notifications.findByIdAndDelete(req.params._id);
        res.status(200).json({
          Deleted: 1,
        });
        return;
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

//return
router.put("/return/:_id", async (req, res) => {
  {
    try {
      const returnUpdate = await Notifications.findById({
        _id: req.params._id,
      });

      //if requester selects return, returnrequest populates with date
      if ((returnUpdate.requestingUser = req.user._id)) {
        let returnDate = moment().format();

        const updatedNotification = await Notifications.findByIdAndUpdate(
          req.params._id,
          {
            returnrequest: returnDate,
            status: "pending",
            message: "Would like to return:",
            notificationType: "return",
          },
          { new: true }
        );
        //email notifies owner
        let Owner = await User.findOne(updatedNotification.owner);
        let toEmail = Owner[0].email;
        //if it's a book, get the book title
        if (updatedNotification.book != null) {
          let RequestedBook = await Book.find({ _id: updatedNotification.book }, { title: 1, _id: 0 });
          theRequest = RequestedBook[0].title;
        }
        //if it's an item, get the itemName
        if (updatedNotification.item != null) {
          let RequestedItem = await Item.find({ _id: updatedNotification.item }, { itemName: 1, _id: 0 });
          theRequest = RequestedItem[0].itemName;
        }
        let RequestingUser = await User.findOne(updatedNotification.requestingUser);
        let requestingUserName = RequestingUser.firstName + " " + RequestingUser.lastName;
        let emailSubject = `${requestingUserName} is returning ${theRequest}`;
        let emailText = `On ${updatedNotification.returnDate}, ${requestingUserName} has stated that they have returned ${theRequest}. Log in to the South Meadows Library App to accept this return and make ${theRequest} available again for checkout`;

        mail(toEmail, emailSubject, emailText);
      }

      //if owner accepts return,
      if ((returnUpdate.owner = req.user._id)) {
        //msg updates
        const updatedNotification = await Notifications.findByIdAndUpdate(
          req.params._id,
          {
            message: req.body.message,
          },
          { new: true }
        );
        //email notifies requester
        let Requester = await User.findOne(updatedNotification.requestingUser);
        let toEmail = Requester[0].email;
        if (updatedNotification.book != null) {
          let RequestedBook = await Book.find({ _id: updatedNotification.book }, { title: 1, _id: 0 });
          theRequest = RequestedBook[0].title;
        }
        //if it's an item, get the itemName
        if (updatedNotification.item != null) {
          let RequestedItem = await Item.find({ _id: updatedNotification.item }, { itemName: 1, _id: 0 });
          theRequest = RequestedItem[0].itemName;
        }
        let Owner = await User.findOne(updatedNotification.owner);
        let ownerName = Owner.firstName + " " + Owner.lastName;
        let emailSubject = `${ownerName} has accepted your return of ${theRequest}`;
        let emailText = `Thank you for using the South Meadows Library App`;

        mail(toEmail, emailSubject, emailText);

        console.log("2", `requester: ${returnUpdate.requestingUser}, owner ${returnUpdate.owner}, user: ${req.user._id}`);
        //notification deletes
        const notifications = await Notifications.findByIdAndDelete(req.params._id);
        console.log("3", req.params._id);
        if (!notifications) throw new Error("Book/item notification not found");

        res.status(200).json({
          Deleted: 1,
        });
        return;
      }
      res.status(200).json({
        Updated: updatedNotification,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        Error: err,
      });
    }
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
