/**
 * TODO signup: sends email that you created account and must wait admin approval before login ☑️
 * TODO signup: admin recieves email that user wants to join and that they should login to approve or deny the user ☑️
 * TODO signup: if admin approves user, user recieves email theyve been approved and can log in ☑️
 * TODO signup: if admin denies user, user recieved email theyve been declined and can not login (user is kept on "blacklist so they cant request to signup again with same email")☑️
 * TODO borrow request: when a user submits a borrow request for book or item recieving user should get an in app notif and a email notif saying a user wants to borrow their book/item☑️
 *
 * TODO borrow req: when a user accepts or declines a borrow request the requestingUser recieves an in app notif and email
 * TODO return request: when a user submits a return request for book or itemrecieving user should get an in app notif and a email notif saying a user wants to return their book/item
 * TODO return req: when a user accepts or declines a return request the requestingUser recieves an in app notif and email
 * TODO if declined or accepted deletes inbox message
 */

const router = require("express").Router();
//records date/time
const { Email, EmailTypes } = require("../Email/Email");
const moment = require("moment");
const Notifications = require("../models/notifications");
const Request = require("../models/request");
const User = require("../models/user");
const Book = require("../models/book");
const Item = require("../models/item");

// create book request
async function createBookRequest(req, res) {
  //item_details are the details of any requested item (book, game or misc)
  let existingRequest = await Request.findOne({ book: req.body.book });
  let RequestedBook = await Book.findOne({ _id: req.body.book }, { title: 1, _id: 1, author: 1, user: 1, hasPendingRequest: 1 });

  if (existingRequest !== null || RequestedBook.hasPendingRequest) {
    return res.status(423).json({ error: "Book has already been requested by another user." });
  }

  const item_details = `${RequestedBook.title} by ${RequestedBook.author.length > 1 ? RequestedBook.author.join(", ") : RequestedBook.author}`;
  await Book.findByIdAndUpdate(req.body.book, { hasPendingRequest: true });

  const request = await new Request({
    requestingUser: req.user._id,
    // A user is requesting to borrow book/item
    borrowrequest: Date.now(),
    // A user is requesting to return book/item
    returnrequest: null,
    // Status of book/item
    status: "Pending",

    // Book is listed to notify what book is being checked out/returned
    book: req.body.book,
  }).save();
  // creates the notification for the book request
  new Notifications({
    user: RequestedBook.user,
    visible: true,
    message: `Has requested to borrow: ${item_details}`,
    notificationType: "Borrow",
    requestingUser: req.user._id,
    request: request._id,
  }).save();

  let owner = await User.findOne({ _id: RequestedBook.user }, { email: 1, _id: 0, firstName: 1 });
  //store who is requesting
  let requester = await User.findOne({ _id: req.user._id });
  // sends the email for the book request
  Email.sendWithTemplate({
    recipient: owner.email,
    email_type: EmailTypes.BorrowRequest,
    template_variables: {
      sender_fullname: `${requester.firstName} ${requester.lastName}`,
      user_fullname: owner.firstName,
      sender_email: requester.email,
      item_details: item_details,
    },
  });
  res.status(200).send();
}
// ---------------------------------------------------------------

// create item request
async function createItemRequest(req, res) {
  //item_details are the details of any requested item (book, game or misc)
  let existingRequest = await Request.findOne({ item: req.body.item });
  let RequestedItem = await Item.findOne({ _id: req.body.item }, { itemName: 1, _id: 0, user: 1, hasPendingRequest: 1 });
  if (existingRequest !== null || RequestedItem.hasPendingRequest) {
    return res.status(423).json({ error: "Item has already been requested by another user." });
  }
  const item_details = RequestedItem.itemName;
  await Item.findByIdAndUpdate(req.body.item, { hasPendingRequest: true });

  const request = await new Request({
    requestingUser: req.user._id,
    // A user is requesting to borrow book/item
    borrowrequest: Date.now(),
    // A user is requesting to return book/item
    returnrequest: null,
    // Status of book/item
    status: "Pending",
    // Book is listed to notify what book is being checked out/returned
    item: req.body.item,
  }).save();
  // creates notification for item request
  new Notifications({
    user: RequestedItem.user,
    visible: true,
    message: `Has requested to borrow: ${item_details}`,
    notificationType: "Borrow",
    requestingUser: req.user._id,
    request: request._id,
  }).save();

  let owner = await User.findOne({ _id: RequestedItem.user }, { email: 1, _id: 0, firstName: 1 });
  //store who is requesting
  let requester = await User.findOne({ _id: req.user._id });
  // sends an email for the item request
  Email.sendWithTemplate({
    recipient: owner.email,
    email_type: EmailTypes.BorrowRequest,
    template_variables: {
      sender_fullname: `${requester.firstName} ${requester.lastName}`,
      user_fullname: owner.firstName,
      sender_email: requester.email,
      item_details: item_details,
    },
  });

  res.status(200).send();
}

// Create Notifications
// 4/30/24 this now checks if an item or book has already been requested (hasPendingRequest) before allowing the creation of a notification or email
router.post("/create/", async (req, res) => {
  try {
    if (req.body.item != null) {
      await createItemRequest(req, res);
    } else if (req.body.book != null) {
      await createBookRequest(req, res);
    } else {
      return res.status(400).json({ error: "Book or Item not provided." });
    }
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
    console.log(req.user._id);
    //filters for all notifications by and for the specific user calling this function. Displays keys of notification schema.
    let results = await Notifications.find({ user: req.user._id, visible: true })
      .populate({ path: "requestingUser", select: "email firstName lastName" })
      .populate({ path: "user", select: "email firstName lastName" })
      .populate(["message", "notificationType"])
      .select({
        text: 1,
        createdAt: 1,
        updatedAt: 1,
      });

    res.status(200).json({
      Results: results.reverse(),
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

async function handleNotificationStatusChange(updatedNotifications) {
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

  // let emailSubject = `Updated Request`;
  // //descriptive text telling the requester that the owner has changed the status of the notification
  // let emailText = `${owner} has changed the status of your request for ${theRequest} to ${updatedNotifications.status}. ${updatedNotifications.message}`;

  // mail(toEmail, emailSubject, emailText);

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
    const notifications = await Notifications.findByIdAndDelete(req.params._id); // ??????
    res.status(200).json({
      Deleted: 1,
    });
    return;
  }
}

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
      await handleNotificationStatusChange(updatedNotifications);

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
