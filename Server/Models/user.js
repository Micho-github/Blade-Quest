const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      set: (email) => {
        if (typeof email === "string") {
          return email.toLowerCase(); // Ensure email is stored in lowercase
        }
        return email;
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    coins: {
      type: Number,
      default: 0,
    },
    gems: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: Number,
      default: () => Math.floor(Math.random() * 10) + 1,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    password: {
      type: String,
      required: true,
    },
  });


const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
