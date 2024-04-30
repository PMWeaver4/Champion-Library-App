const mongoose = require("mongoose");
const User = require("./user");
// added enum to itemType to differentiate and also PreSave hook for the correct corresponding image
const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
    enum: ["game", "other"],
  },
  img: {
    type: String,

    // thumbnail: String,
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
    default: false
  },
  condition: {
    type: String,
  },
});

// Pre-save hook to set the image URL based on itemType
ItemSchema.pre("save", function (next) {
  if (this.itemType === "game") {
    this.img = "/images/games.png"; // Set the URL for game image
  } else if (this.itemType === "other") {
    this.img = "/images/others.png"; // Set the URL for other types of items
  }
  next();
});

module.exports = mongoose.model("item", ItemSchema);
