const mongoose = require("mongoose");
const User = require("./user");
const Request = require("./request");
const NotificationsSchema = mongoose.Schema(
  {
    // User is making request
    user: {
      type: mongoose.ObjectId,
      required: true,
      ref: User,
    },

    // User is making request
    requestingUser: {
      type: mongoose.ObjectId,
      ref: User,
    },

    notificationType: {
      type: String,
      required: true,
      enum: ["Borrow", "Return", "System", "Message"],
      default: "Borrow",
    },

    // Message to be sent to notify users
    message: {
      type: String,
    },
    request: {
      type: mongoose.ObjectId,
      ref: Request,
    },
    //  when a notif is deleted (its not really deleted from db) just from users view
    visible: {
      type: Boolean,
      require: true,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

// Exports
module.exports = mongoose.model("Notifications", NotificationsSchema);
