const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,

        },

        email: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
            
        },

        bookAvailable: {
            type: Boolean,
            required: true,

        },

        currentholder: {
            type: String,
            required: true,
        },

        borrowrequest: {
            type: Boolean,
            required: true,
        },

        returnrequest: {
            type: Boolean,
            required: true,

        },

        },

{
        timestamps: true
}

);
 
// Exports
module.exports = mongoose.model("notifications", NotificationsSchema);