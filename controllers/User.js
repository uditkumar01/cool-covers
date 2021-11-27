const path = require("path");
const fs = require("fs");
const User = require("../models/User.model");
const createImage = require("../utils/createImage");
const getFollowers = require("../utils/getFollowers");
const parseQuery = require("../utils/parseQuery");
const { SVGS_BASE_PATH } = require("../constants/constant");
const createFile = require("../utils/createFile");
const compareTwoJsons = require("../utils/compareTwoJsons");

const getUserImage = async (req, res) => {
  try {
    const query = parseQuery(req.query || {});
    const filePath = path.join(SVGS_BASE_PATH, `${query.username}.svg`);

    if (!query?.username)
      return res.status(400).send({ message: "username is required" });
    const user = await User.findOne({ username: query.username });
    const followers = await getFollowers(query.username, 5);
    const recentFollowerUsername = followers?.[0]?.login;
    const imageAttrs = {
      bgColor: query.bgColor,
      textColor: query.textColor,
      text: query.text,
      fontSize: query.fontSize,
      fontFamily: query.fontFamily,
      fontWeight: query.fontWeight,
      avatarRadius: query.avatarRadius,
    };
    const hasChangeinAttrs =
      user && compareTwoJsons(user?.imageAttrs || {}, imageAttrs);
    console.log(hasChangeinAttrs);
    if (!user) {
      console.log("creating new user");
      const coverImage = await createImage(query, followers || []);
      const newUser = new User({
        username: query.username,
        recentFollowerUsername,
        coverImage,
        imageAttrs,
      });
      await newUser.save();
    }

    if (
      user &&
      (user.recentFollowerUsername !== followers?.[0]?.login ||
        !user?.coverImage ||
        hasChangeinAttrs)
    ) {
      console.log("updating");
      const coverImage = await createImage(query, followers || []);
      user.recentFollowerUsername = recentFollowerUsername;
      user.coverImage = coverImage;
      user.imageAttrs = imageAttrs;
      await user.save();
    }
    const createdPngExists = fs.existsSync(filePath);
    console.log(createdPngExists);
    if (!createdPngExists) {
      console.log("creating file");
      const svgStr = user?.coverImage;
      await createFile(svgStr, filePath);
    }
    return res.status(200).sendFile(filePath);
  } catch (err) {
    console.log("Error in getUserImage", err);
  }
};

const updateUserImage = async (req, res) => {
  try {
    const query = req.query;
    const imageAttrs = {
      bgColor: query.bgColor,
      textColor: query.textColor,
      text: query.text,
      fontSize: query.fontSize,
      fontFamily: query.fontFamily,
      fontWeight: query.fontWeight,
      avatarRadius: query.avatarRadius,
    };
    if (!query?.username)
      return res.status(400).send({ message: "username is required" });
    const user = await User.findOne({ username: query.username });
    if (!user) return res.status(400).send({ message: "user not found" });
    const followers = await getFollowers(query.username, 5);
    const { recentFollowerUsername, coverImage } = await createImage(
      query,
      followers || []
    );
    user.recentFollowerUsername = recentFollowerUsername;
    user.coverImage = coverImage;
    user.imageAttrs = imageAttrs;
    await user.save();
    return res.status(200).send({ message: "updated" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUserImage,
  updateUserImage,
};
