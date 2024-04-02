const mongoose = require("mongoose");


const BookSchema = new mongoose.Schema(
    {
    
        title: {
            type: String,
            required: true,
            
        },
        author: {
            type: String,
            required: true,
            
        },
        description: {
            type: String,
        },
        user: {
            type: String,
            minlength: 1,
        },
        rentedUser: {
            type: String,
            default:""
        },
        checkedout: {
            type: Date,
            default:""
        },
        isbn: {
            type: Number,
        },
        genre: {
            type: String,
            required: true
        },
        img: {
            thumbnail: String,
        },
        condition: {
            type: String,
        }
        
    },
    {
        timestamps: true
    }
    );
    

module.exports = mongoose.model("book", BookSchema);