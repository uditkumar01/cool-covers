const path = require("path");
const IMAGES_BASE_PATH = path.join(__dirname, "..", "public", "images");
const SVGS_BASE_PATH = path.join(IMAGES_BASE_PATH, "..", "svgs");
const PATTERNS_AVALIABLE = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];

module.exports = {
  IMAGES_BASE_PATH,
  SVGS_BASE_PATH,
  PATTERNS_AVALIABLE,
};
