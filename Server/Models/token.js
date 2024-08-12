const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 7200 }
});

const TokenModel = mongoose.model("Token", tokenSchema);

module.exports = TokenModel;
