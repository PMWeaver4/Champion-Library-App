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
        },
        user: {
            type: mongoose.ObjectId,
            required: true,
            ref: User
        },
        rentedUser: {
            type: mongoose.ObjectId,
            ref: User
        },
        checkedout: {
            type: Boolean,
            default: false
        },
        isbn: {
            type: Number,
        },
        genre: {
            type: Array,
            required: true
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
        }
        
    },
    {
        timestamps: true
    }
    );
    

module.exports = mongoose.model("book", BookSchema);