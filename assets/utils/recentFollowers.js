const makeGrid = require("./makeGrid");
const getImagesFromLinks = require("./getImagesFromLinks");

async function recentFollowers(imageList) {
  const images = await getImagesFromLinks(imageList);
  const buf = await makeGrid(images);
  return buf;
}

module.exports = recentFollowers;
