const mongoose = require('mongoose');
const ImageCollectionSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "username required"]
        },
        image: {
            type: String,
            unique: true,
            required: [true, "image required"]
        }
    },
    {
        timestamps: true
    }
);

const ImageCollection = new mongoose.model("ImageCollection", ImageCollectionSchema);

module.exports = ImageCollection;