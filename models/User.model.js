const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: [true, "username is required"],
    },
    recentFollowerUsername: {
      type: String,
    },
    coverImage: {
      type: String,
      unique: true,
    },
    imageAttrs: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", UserSchema);

module.exports = User;
