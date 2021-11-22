const express = require("express");
const axios = require("axios");
const JSSoup = require("jssoup").default;
const connectDB = require("./db/connectDB");
const ImageCollection = require("./models/imageCollection.model");
const ImageUrl = require("./models/imageUrl.model");
const cors = require("cors");
const app = express();
const recentFollowers = require("./assets/utils/recentFollowers");
const { testPng } = require("./assets/constants");

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

const testFollowers = [
  {
    avatar_url: "https://avatars.githubusercontent.com/u/62516548?v=4",
    login: "Piyush2961",
  },
  {
    avatar_url: "https://avatars.githubusercontent.com/u/56130227?v=4",
    login: "vivekgugnani",
  },
  {
    avatar_url: "https://avatars.githubusercontent.com/u/12944645?v=4",
    login: "BenHen75",
  },
  {
    avatar_url: "https://avatars.githubusercontent.com/u/73431277?v=4",
    login: "topcoder0108",
  },
  {
    avatar_url: "https://avatars.githubusercontent.com/u/91886475?v=4",
    login: "himmy4",
  },
];

const checkFollowers = async (username, followersCount) => {
  try {
    const allFollowers = [];
    let pageNo = 1;
    while (allFollowers.length < followersCount) {
      const URL = `https://github.com/${username}?page=${pageNo}&tab=followers`;
      const res = await axios.get(URL);
      const followers = await getData(res.data);
      if (followers.length === 0) break;
      allFollowers.concat(followers);
      pageNo++;
    }
    return testFollowers;
  } catch (err) {
    console.log(err);
  }
  return [];
};

app.get("/", async (req, res) => {
  //   setInterval(async () => {
  try {
    const dbFollowersCount = await ImageCollection.count({});
    const followersCount = await checkFollowersCount(username);
    console.log(followersCount, dbFollowersCount);
    if (dbFollowersCount !== followersCount) {
      const dbFollowers = await ImageCollection.find({});
      const gitFollowers = await checkFollowers(username, followersCount);
      const DB_LEN = dbFollowers.length;
      const GIT_LEN = gitFollowers.length;
      console.log("running", DB_LEN, GIT_LEN);
      if (GIT_LEN > DB_LEN) {
        console.log("someone followed");
        const diffUsers = [];
        const allUsers = [];
        gitFollowers.forEach((follower) => {
          const ava_url = follower.avatar_url;
          const username = follower.login;
          let userExists = false;
          for (let i = 0; i < DB_LEN; i++) {
            console.log(
              ava_url,
              dbFollowers[i].avatar_url,
              username === dbFollowers[i].username
            );
            if (username === dbFollowers[i].username) {
              userExists = true;
              break;
            }
          }
          if (!userExists) {
            diffUsers.push({
              username,
              image: ava_url,
            });
          } else {
            allUsers.push({
              username,
              image: ava_url,
            });
          }
        });
        console.log(diffUsers.length);
        if (diffUsers.length > 0) {
          console.log("calling create image call", diffUsers);
          await ImageCollection.insertMany(diffUsers);

          const newUserList = diffUsers.map((user) => user.image);
          const newAllUsers = allUsers.map((user) => user.image);

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

          await makeCreateImageCall(newUserList);
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

    const image = await ImageUrl.findOne({});
    res.status(200).send(image.image);
  } catch (err) {
    console.log(err.message);
    console.error(err);
    res.status(200).sendFile(testPng);
  }
  //   }, 10000);
});

app.get("/test", async (req, res) => {
  res.send("test");
});

app.listen(3000, () => {
  console.log("server started");
});
