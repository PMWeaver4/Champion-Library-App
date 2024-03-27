const mongoose = require("mongoose");

const User = require("./user");
const Room = require("./room");

const MessageSchema = new mongoose.Schema(
    {
    
        when: {
            type: Date,
            required: true,
            default: Date.now,
        },
        user: {
                type: mongoose.ObjectId,
                required: true,
                ref: User
            },
        room: {
            type: mongoose.ObjectId,
            required: true,
            ref: Room
        },
        body: {
            type: String,
            required: true,
            minlength: 1},
        msg_id: {type: Number,
        },
   
    
}, 
{
    //test this out when doing routes
    timestamps: true
}
);

module.exports = mongoose.model("message", MessageSchema);