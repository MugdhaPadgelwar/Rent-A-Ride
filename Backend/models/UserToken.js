var mongoose = require("mongoose");

const { Schema } = mongoose;

const TokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
    }
});


const UserToken= mongoose.model("UserToken", TokenSchema);


module.exports = UserToken;