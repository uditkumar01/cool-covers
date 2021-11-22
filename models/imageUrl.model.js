const mongoose = require("mongoose");
const ImageUrlSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      unique: true,
      required: [true, "image required"],
    },
  },
  {
    timestamps: true,
  }
);

const ImageUrl = new mongoose.model("ImageUrl", ImageUrlSchema);

module.exports = ImageUrl;
