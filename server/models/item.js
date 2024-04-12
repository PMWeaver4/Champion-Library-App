const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        itemType: {
            type: String,
            required: true
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
            type: Boolean,
            default: false
        },
        condition: {
            type: String,
        }
    }
)

module.exports = mongoose.model("item", ItemSchema);