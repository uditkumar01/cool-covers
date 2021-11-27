const express = require("express");
const connectDB = require("./db/connectDB");
const cors = require("cors");
const { getUserImage, updateUserImage } = require("./controllers/User");
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

connectDB();

app.get("/cover", getUserImage);

app.get("/forceUpdateCover", updateUserImage);

app.get("/test", async (req, res) => {
  res.send("test");
});

app.listen(3000, () => {
  console.log("server started");
});
