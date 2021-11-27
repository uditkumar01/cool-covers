const { default: axios } = require("axios");
const getUsers = require("./getUsers");

const getFollowers = async (username, followersCount) => {
  try {
    let allFollowers = [];
    let pageNo = 1;
    while (allFollowers.length < followersCount) {
      const URL = `https://github.com/${username}?page=${pageNo}&tab=followers`;
      const res = await axios.get(URL);
      const { followers } = await getUsers(res.data, followersCount);
      if (followers.length < 1) {
        break;
      }
      allFollowers = allFollowers.concat(followers);
      pageNo++;
    }
    console.log(allFollowers.map((follower) => follower.login));
    return allFollowers;
  } catch (err) {
    console.log(err);
  }
  return [];
};

module.exports = getFollowers;
