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
        currentHolder: {
            type: mongoose.ObjectId,
            required: true,
            ref: User
        },
    
    // A user is requesting to borrow book/item
        borrowrequest: {
            type: Date,
            required: true,
        },

    // A user is requesting to return book/item         
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