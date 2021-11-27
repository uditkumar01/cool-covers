const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URI = process.env["MONGODB_URI"];

async function connectDB() {
  try {
    await mongoose.connect(`${URI}recentFollowers`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB Connected Successfully");
  } catch (err) {
    console.log(err);
  }
}
module.exports = connectDB;
