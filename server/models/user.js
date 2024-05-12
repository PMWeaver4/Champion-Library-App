const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 1,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 1,
    },
    email: {
      type: String,
      required: true,
      minlength: 1,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    approved: {
      type: String,
      enum: ["Pending", "Accepted", "Declined"],
      default: "Pending",
    },
    resetToken: {
      type: String,
    },
    // reset token expiration
    resetTokenExp: {
      type: Date
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
