const mongoose = require("mongoose");
const User = require("./user");
const Book = require("./book");
const Item = require("./item");
const RequestSchema = new mongoose.Schema(
  {
    // User is making request
    requestingUser: {
      type: mongoose.ObjectId,
      required: true,
      ref: User,
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
      enum: ["Pending", "Accepted", "Declined"],
      default: "Pending",
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
module.exports = mongoose.model("Request", RequestSchema);
