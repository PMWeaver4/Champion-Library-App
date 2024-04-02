const mongoose = require("mongoose");
const book = require("./book");

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


        //isbn, genre, renteduser
        // Image?:{}

        
    },
    {
        timestamps: true
    }
    );
    

module.exports = mongoose.model("book", BookSchema);