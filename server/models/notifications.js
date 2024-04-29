const mongoose = require("mongoose");
const User = require("./user");
const Book = require("./book");
const Item = require("./item");
const NotificationsSchema = new mongoose.Schema(
  {
    // User is making request

    requestingUser: {
      type: mongoose.ObjectId,
      required: true,
      ref: User,
    },
    // Book/item being currently owned by a user
    owner: {
      type: mongoose.ObjectId,
      required: true,
      ref: User,
    },

    notificationType: {
      type: String,
      required: true,
      enum: ["borrow", "return"],
      default: "borrow",
    },

    // A user is requesting to borrow book/item
    borrowrequest: {
      type: Date,
    },

    // A user is requesting to return book/item
    returnrequest: {
      type: Date,
    },

    // Status of book/item
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },

    // Message to be sent to notify users
    message: {
      type: String,
    },

    // Item is listed to notify what item is being checked out/returned
    item: {
      type: mongoose.ObjectId,
      ref: Item,
    },

    // Book is listed to notify what book is being checked out/returned
    book: {
      type: mongoose.ObjectId,
      ref: Book,
    },
  },

  {
    timestamps: true,
  }
);

// Exports
module.exports = mongoose.model("Notifications", NotificationsSchema);
