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
            ref: User
        },
    // Book/item being currently owned by a user 
        currentOwner: {
            type: mongoose.ObjectId,
            required: true,
            ref: User
        },

        borrowrequest: {
            type: Date,
            required: true,
        },

        returnrequest: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            required: true,
            enum: ['pending', 'accepted', 'declined'],
            default: 'pending',
        },

        message: {
            type: String,
        },

        item: {
            type: mongoose.ObjectId,
            ref: Item,
        },

        book: { 
            type: mongoose.ObjectId,
            ref: Book,
        }, 

        },

{
        timestamps: true
}

);
 
// Exports
module.exports = mongoose.model("Notifications", NotificationsSchema);