const mongoose = require("mongoose");
const user = require("./user");

const UserSchema = new mongoose.Schema ({
    
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
            unique: true,
            minlength: 1,
        }

        
        
    },
    {
    timestamps: true
    }


);

module.exports = mongoose.model("user", UserSchema);

// testing