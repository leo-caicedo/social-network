const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      unique: true,
    },
    email: {
      type: String,
      max: 30,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 5,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
