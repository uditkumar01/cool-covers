const path = require("path");
const IMAGES_BASE_PATH = path.join(__dirname, "..", "public", "images");
const SVGS_BASE_PATH = path.join(IMAGES_BASE_PATH, "..", "svgs");

module.exports = {
  IMAGES_BASE_PATH,
  SVGS_BASE_PATH,
};
