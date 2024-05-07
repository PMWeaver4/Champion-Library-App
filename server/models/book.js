const mongoose = require("mongoose");
const User = require("./user");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      required: true,
      ref: User,
    },
    rentedUser: {
      type: mongoose.ObjectId,
      ref: User,
    },
    checkedout: {
      type: Boolean,
      default: false,
    },
    // if this is true, user has submitted a request to borrow item. if the borrow request is accepted boolean = false and checkedout = true.
    hasPendingRequest: {
      type: Boolean,
      default: false,
    },
    isbn: {
      type: Number,
      required: false,
    },
    genre: {
      type: Array,
      required: true,
    },
    img: {
      type: String,
      // thumbnail: String,
    },
    condition: {
      type: String,
    },
    pubDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("book", BookSchema);
