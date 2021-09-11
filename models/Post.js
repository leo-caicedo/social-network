const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 300,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Post", postSchema);
