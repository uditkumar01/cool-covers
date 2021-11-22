const express = require("express");
const axios = require("axios");
const JSSoup = require("jssoup").default;
const connectDB = require("./db/connectDB");
const ImageCollection = require("./models/imageCollection.model");
const ImageUrl = require("./models/imageUrl.model");
const cors = require("cors");
const app = express();
const recentFollowers = require("./assets/utils/recentFollowers");
const { testPng, createdPNG } = require("./assets/constants");
const fs = require("fs");

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const QUERY_URL = process.env.QUERY_URL;

connectDB();

const username = "uditkumar01";

async function checkFollowersCount(username) {
  try {
    const res = await axios.get(`https://api.github.com/users/${username}`);
    return res.data.followers;
  } catch (err) {
    console.log(err);
  }
}
async function makeCreateImageCall(newUserList) {
  console.log("making create image call", newUserList);
  const image = await recentFollowers(newUserList);
  // always overwrite the first document
  if (image && image.startsWith("data:image/png;base64,")) {
    const imageBase64String = image?.replace(/^data:image\/png;base64,/, "");
    const imageBuffer = Buffer.from(imageBase64String, "base64");
    fs.writeFileSync(createdPNG, imageBuffer);
    await ImageUrl.findOneAndUpdate(
      {},
      {
        $set: {
          image,
        },
      },
      {
        upsert: true,
      }
    );
  }
  //   console.log(res);
}

const getData = async (html) => {
  let soup = new JSSoup(html);
  let imgTags = soup.findAll("img");
  const data = [];

  imgTags.forEach((item) => {
    const attrs = item.attrs;

    if (
      attrs.src &&
      attrs.alt &&
      attrs.height === "50" &&
      attrs.width === "50"
    ) {
      data.push({
        avatar_url: attrs.src.replace("s=100&amp;", ""),
        login: attrs.alt.split("@")[1],
      });
    }
  });

  return data;
};

const checkFollowers = async (username, followersCount) => {
  try {
    let allFollowers = [];
    let pageNo = 1;
    console.log("checking followers", allFollowers.length < followersCount);
    while (allFollowers.length < followersCount) {
      const URL = `https://github.com/${username}?page=${pageNo}&tab=followers`;
      const res = await axios.get(URL);
      const followers = await getData(res.data);
      console.log("followers", followers.length);
      if (followers.length < 1) {
        break;
      }
      allFollowers = allFollowers.concat(followers);
      pageNo++;
    }
    console.log("all followers", allFollowers.length);
    return allFollowers;
  } catch (err) {
    console.log(err);
  }
  return [];
};

app.get("/uditkumar01.png", async (req, res) => {
  //   setInterval(async () => {
  try {
    const dbFollowersCount = await ImageCollection.count({});
    const followersCount = await checkFollowersCount(username);
    console.log(followersCount, dbFollowersCount);
    if (dbFollowersCount !== followersCount) {
      const dbFollowers = await ImageCollection.find({}).sort({
        createdAt: -1,
      });
      const gitFollowers = await checkFollowers(username, followersCount);
      const DB_LEN = dbFollowers.length;
      const GIT_LEN = gitFollowers.length;
      console.log("running", DB_LEN, GIT_LEN);
      if (GIT_LEN > DB_LEN) {
        console.log("someone followed", dbFollowers);
        const diffUsers = [];
        const allUsers = [];
        gitFollowers.forEach((follower) => {
          const ava_url = follower.avatar_url;
          const username = follower.login;
          let userExists = false;
          for (let i = 0; i < DB_LEN; i++) {
            if (username === dbFollowers[i].username) {
              allUsers.push({
                username,
                image: ava_url,
                createdAt: dbFollowers[i].createdAt,
              });
              userExists = true;
              break;
            }
          }
          if (!userExists) {
            diffUsers.push({
              username,
              image: ava_url,
              createdAt: new Date(),
            });
          }
        });

        console.log(diffUsers.length);

        if (diffUsers.length > 0) {
          console.log("calling create image call", diffUsers);
          await ImageCollection.insertMany(diffUsers);

          allUsers.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
          console.log("all users", allUsers);

          const newUserList = diffUsers.slice(0, 5).map((user) => user.image);
          const newAllUsers = allUsers.slice(0, 5).map((user) => user.image);

          for (let i = 0; i < newAllUsers.length; i++) {
            const user = newAllUsers[i];
            const duplicateUser = newUserList.includes(user);
            if (newUserList.length > 5) {
              break;
            }
            if (!duplicateUser) {
              newUserList.push(user);
            }
          }

          console.log(newUserList);

          await makeCreateImageCall(newUserList.slice(0, 5));
        }
      } else if (DB_LEN > GIT_LEN) {
        console.log("someone unfollowed");
        const diffUsers = [];
        const unfollowedUsers = await ImageCollection.find({
          username: { $nin: gitFollowers.map((follower) => follower.login) },
        });
        await Promise.all(
          unfollowedUsers.map(async (user) => {
            // console.log(user._id);
            await ImageCollection.findByIdAndDelete(user._id);
          })
        );
      }
    }

    const createdPngExists = fs.existsSync(createdPNG);
    console.log("createdPngExists", createdPngExists);
    if (!createdPngExists) {
      const image = await ImageUrl.findOne({});

      // throw new Error("error");

      const imageBase64String = image.image?.replace(
        /^data:image\/png;base64,/,
        ""
      );
      const imageBuffer = Buffer.from(imageBase64String, "base64");

      fs.writeFileSync(createdPNG, imageBuffer);
    }
    res.status(200).type("image/png").sendFile(createdPNG);
    // res.end(image.image);
  } catch (err) {
    console.log(err.message);
    console.error(err);
    res.status(500).sendFile(testPng);
  }
  //   }, 10000);
});

app.get("/test", async (req, res) => {
  res.send("test");
});

app.listen(3000, () => {
  console.log("server started");
});
