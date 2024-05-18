const router = require("express").Router();
//records date/time
const { Email, EmailTypes } = require("../Email/Email");
const moment = require("moment");
const Notifications = require("../models/notifications");
const Request = require("../models/request");
const User = require("../models/user");
const Book = require("../models/book");
const Item = require("../models/item");
const book = require("../models/book");
const Validate = require("../middleware/validate");

// create book request ✅
async function createBookRequest(req, res) {
  //item_details are the details of any requested item (book, game or misc)
  let existingRequest = await Request.findOne({ book: req.body.book, status: "Pending" });
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

// item request ✅
async function createItemRequest(req, res) {
  //item_details are the details of any requested item (book, game or misc)
  let existingRequest = await Request.findOne({ item: req.body.item, status: "Pending" });
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
  // notification for item request
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
  // email for borrow reques
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

// calls functions up ahead to create and send email, notifications, and borrow request for one book/item at a time ✅
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
    console.error(err);
    res.status(500).json({
      Error: err,
    });
  }
});

// Display all notifications endpoint for that user ✅
router.get("/allYourNotifications/:_id", Validate, async (req, res) => {
  try {
    //filters for all notifications by and for the specific user calling this function. Displays keys of notification schema.
    let results = await Notifications.find({ user: req.user._id, visible: true })
      .populate({ path: "requestingUser", select: "email firstName lastName" })
      .populate({ path: "user", select: "email firstName lastName" })
      .populate({
        path: "request",
        populate: [
          {
            path: "item",
            model: "Item",
          },
          {
            path: "book",
            model: "Book",
          },
        ],
      })
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
    console.error(err);

    res.status(500).json({
      Error: err,
    });
  }
});
// ---------------------------------------------------

// function to update borrow status of book ✅
async function handleUpdateBorrowBook(req, res) {
  const request = await Request.findOne({ book: req.body.book }, {}, { sort: { createdAt: -1 } })
    .populate({ path: "book", populate: { path: "user", model: "User" } })
    .populate({ path: "requestingUser" });
  if (request === null) {
    return res.status(404).json({ error: "Book request not found" });
  }
  // if status is not any of those 3 options return error
  if (req.body.newRequestStatus != "Accepted" && req.body.newRequestStatus != "Declined" && req.body.newRequestStatus != "Pending") {
    return res.status(400).json({ error: "newRequestStatus needs to be Pending, Accepted, or Declined" });
  }
  // if status accepted update the needed info
  if (req.body.newRequestStatus === "Accepted") {
    await Book.updateOne({ _id: request.book._id }, { rentedUser: request.requestingUser._id, checkedout: true, hasPendingRequest: false });
    await request.updateOne({ status: "Accepted" });
    const item_details = `${request.book.title} by ${request.book.author}`;
    // then send the corresponding email
    Email.sendWithTemplate({
      recipient: request.requestingUser.email,
      email_type: EmailTypes.BorrowAccept,
      template_variables: {
        item_details: item_details,
        requestingUser_firstname: request.requestingUser.firstName,
        owner_fullname: request.book.user.firstName,
        owner_email: request.book.user.email,
      },
    });
    // as well as the coresponding notification to app's inbox
    new Notifications({
      user: request.requestingUser._id,
      visible: true,
      message: `Your request to borrow ${item_details} has been ACCEPTED`,
      notificationType: "System",
    }).save();
    res.status(200).send();
    // if status declined update needed info
  } else if (req.body.newRequestStatus === "Declined") {
    await Book.updateOne({ _id: request.book._id }, { hasPendingRequest: false });
    // sending email after updating decline status, then deleting request
    const item_details = `${request.book.title} by ${request.book.author}`;
    // notify user with email theyve been declined
    Email.sendWithTemplate({
      recipient: request.requestingUser.email,
      email_type: EmailTypes.BorrowDecline,
      template_variables: {
        item_details: item_details,
        user_fullname: request.requestingUser.firstName,
      },
    });
    // send in app notif that theyve been declind
    new Notifications({
      user: request.requestingUser._id,
      visible: true,
      message: `Your request to borrow ${item_details} has been DECLINED`,
      notificationType: "System",
    }).save();
    // delete the request
    await request.deleteOne();
    res.status(200).send();
    // else set status to pending which is default
  } else {
    request.status = "Pending";
    await request.save();
    res.status(200).send();
  }
}

//function to update borrow status of item ✅
async function handleUpdateBorrowItem(req, res) {
  const request = await Request.findOne({ item: req.body.item }, {}, { sort: { createdAt: -1 } })
    .populate({ path: "item", populate: { path: "user", model: "User" } })
    .populate({ path: "requestingUser" });

  if (request === null) {
    return res.status(404).json({ error: "Item request not found" });
  }
  if (req.body.newRequestStatus != "Accepted" && req.body.newRequestStatus != "Declined" && req.body.newRequestStatus != "Pending") {
    return res.status(400).json({ error: "newRequestStatus needs to be Pending, Accepted, or Declined" });
  }
  if (req.body.newRequestStatus === "Accepted") {
    await Item.updateOne({ _id: request.item._id }, { rentedUser: request.requestingUser._id, checkedout: true, hasPendingRequest: false });
    await request.updateOne({ status: "Accepted" });
    const item_details = request.item.itemName;
    Email.sendWithTemplate({
      recipient: request.requestingUser.email,
      email_type: EmailTypes.BorrowAccept,
      template_variables: {
        item_details: item_details,
        requestingUser_firstname: request.requestingUser.firstName,
        owner_fullname: request.item.user.firstName,
        owner_email: request.item.user.email,
      },
    });
    new Notifications({
      user: request.requestingUser._id,
      visible: true,
      message: `Your request to borrow ${item_details} has been ACCEPTED`,
      notificationType: "System",
    }).save();
    res.status(200).send();
  } else if (req.body.newRequestStatus === "Declined") {
    await Item.updateOne({ _id: request.item._id }, { hasPendingRequest: false });
    // sending email after updating decline status, then deleting request
    const item_details = request.item.itemName;
    Email.sendWithTemplate({
      recipient: request.requestingUser.email,
      email_type: EmailTypes.BorrowDecline,
      template_variables: {
        item_details: item_details,
        user_fullname: request.requestingUser.firstName,
      },
    });
    new Notifications({
      user: request.requestingUser._id,
      visible: true,
      message: `Your request to borrow ${item_details} has been DECLINED`,
      notificationType: "System",
    }).save();
    await request.deleteOne();
    res.status(200).send();
  } else {
    request.status = "Pending";
    await request.save();
    res.status(200).send();
  }
}

// endpoint calls the updateBorrow handler functions for item and books ✅
router.put("/updateBorrow", async (req, res) => {
  if (req.body.book != null) {
    handleUpdateBorrowBook(req, res);
  } else if (req.body.item != null) {
    handleUpdateBorrowItem(req, res);
  } else {
    return res.status(400).json({ error: "Book or Item not provided." });
  }
});

// ? A user should not be able to delete a inbox notification if the request attached to it is still status "Pending"
// ? theres also no real reason to have a declined return, a user would accept when they have item in their possession
// function to update the return status of book ✅
async function handleUpdateReturnBook(req, res) {
  const request = await Request.findOne({ book: req.body.book }, {}, { sort: { createdAt: -1 } })
    .populate({ path: "book", populate: { path: "user", model: "User" } })
    .populate({ path: "requestingUser" });
  const item_details = `${request.book.title} by ${request.book.author}`;
  if (request === null) {
    return res.status(404).json({ error: "Book request not found" });
  }
  if (req.body.newRequestStatus != "Accepted" && req.body.newRequestStatus != "Pending") {
    return res.status(400).json({ error: "newRequestStatus needs to be Pending or Accepted" });
  }
  // if status accepted update the needed info
  if (req.body.newRequestStatus === "Accepted") {
    await Book.updateOne({ _id: request.book._id }, { rentedUser: null, checkedout: false, hasPendingRequest: false });
    await request.updateOne({ status: "Accepted" });
    // then send the corresponding email
    Email.sendWithTemplate({
      recipient: request.requestingUser.email,
      email_type: EmailTypes.ReturnAccept,
      template_variables: {
        item_details: item_details,
        requestingUser_firstname: request.requestingUser.firstName,
        owner_fullname: request.book.user.firstName,
        owner_email: request.book.user.email,
      },
    });
    // as well as the coresponding notification to app's inbox
    new Notifications({
      user: request.requestingUser._id,
      visible: true,
      message: `Your request to return ${item_details} has been ACCEPTED`,
      notificationType: "System",
    }).save();
    res.status(200).send();
  } else {
    request.status = "Pending";
    request.returnrequest = Date.now();
    await request.save();
    await Book.updateOne({ _id: request.book._id }, { hasPendingRequest: true });
    await new Notifications({
      user: request.book.user._id,
      visible: true,
      message: `${request.requestingUser.firstName} (${request.requestingUser.email}) has requested to return ${item_details}`,
      notificationType: "Return",
      requestingUser: request.requestingUser._id,
      request: request._id,
    }).save();
    Email.sendWithTemplate({
      recipient: request.book.user.email,
      email_type: EmailTypes.ReturnRequest,
      template_variables: {
        sender_fullname: request.requestingUser.firstName,
        user_fullname: request.book.user.firstName,
        sender_email: request.requestingUser.email,
        item_details: item_details,
      },
    });
    res.status(200).send();
  }
}

// function to update the return status of item ✅
async function handleUpdateReturnItem(req, res) {
  const request = await Request.findOne({ item: req.body.item }, {}, { sort: { createdAt: -1 } })
    .populate({ path: "item", populate: { path: "user", model: "User" } })
    .populate({ path: "requestingUser" });
  const item_details = request.item.itemName;
  if (request === null) {
    return res.status(404).json({ error: "Item request not found" });
  }
  if (req.body.newRequestStatus != "Accepted" && req.body.newRequestStatus != "Pending") {
    return res.status(400).json({ error: "newRequestStatus needs to be Pending or Accepted" });
  }
  // if status accepted update the needed info
  if (req.body.newRequestStatus === "Accepted") {
    await Item.updateOne({ _id: request.item._id }, { rentedUser: null, checkedout: false, hasPendingRequest: false });
    await request.updateOne({ status: "Accepted" });
    // then send the corresponding email
    Email.sendWithTemplate({
      recipient: request.requestingUser.email,
      email_type: EmailTypes.ReturnAccept,
      template_variables: {
        item_details: item_details,
        requestingUser_firstname: request.requestingUser.firstName,
        owner_fullname: request.item.user.firstName,
        owner_email: request.item.user.email,
      },
    });
    // as well as the coresponding notification to app's inbox
    new Notifications({
      user: request.requestingUser._id,
      visible: true,
      message: `Your request to return ${item_details} has been ACCEPTED`,
      notificationType: "System",
    }).save();
    res.status(200).send();
  } else {
    request.status = "Pending";
    request.returnrequest = Date.now();
    await Item.updateOne({ _id: request.item._id }, { hasPendingRequest: true });
    await request.save();
    await new Notifications({
      user: request.item.user._id,
      visible: true,
      message: `${request.requestingUser.firstName} (${request.requestingUser.email}) has requested to return ${item_details}`,
      notificationType: "Return",
      requestingUser: request.requestingUser._id,
      request: request._id,
    }).save();
    Email.sendWithTemplate({
      recipient: request.item.user.email,
      email_type: EmailTypes.ReturnRequest,
      template_variables: {
        sender_fullname: request.requestingUser.firstName,
        user_fullname: request.item.user.firstName,
        sender_email: request.requestingUser.email,
        item_details: item_details,
      },
    });
    res.status(200).send();
  }
}

// endpoint calls the updateReturn handlers for book and items ✅
router.put("/updateReturn", async (req, res) => {
  if (req.body.book != null) {
    handleUpdateReturnBook(req, res);
  } else if (req.body.item != null) {
    handleUpdateReturnItem(req, res);
  } else {
    return res.status(400).json({ error: "Book or Item not provided." });
  }
});

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
