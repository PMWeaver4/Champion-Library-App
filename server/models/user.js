
const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    
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

        passwordreset: {
            type: String,
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },

        approved: {
            type: Boolean,
            default: false
        }
        
    },
    {
    timestamps: true
    }


);

module.exports = mongoose.model("user", UserSchema);
