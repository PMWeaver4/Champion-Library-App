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
            type: Array,
            minlength: 1,
        },
        // Image?:{}

        
    },
    {
        timestamps: true
    }
    );
    

module.exports = mongoose.model("book", BookSchema);