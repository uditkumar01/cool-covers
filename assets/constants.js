const path = require("path");

const BG_DIMENSIONS = {
  width: 1141,
  height: 398,
};

const ImagesCompositeOpts = {
  center: {
    left: Math.floor(BG_DIMENSIONS.width - 407),
    top: Math.floor(BG_DIMENSIONS.height - 20),
    width: 95,
    height: 95,
  },

  rightMd: {
    left: Math.floor(BG_DIMENSIONS.width - 226),
    top: Math.floor(BG_DIMENSIONS.height - 8),
    width: 70,
    height: 70,
  },

  leftMd: {
    left: Math.floor(BG_DIMENSIONS.width - 566),
    top: Math.floor(BG_DIMENSIONS.height - 8),
    width: 70,
    height: 70,
  },

  rightSm: {
    left: Math.floor(BG_DIMENSIONS.width - 76),
    top: Math.floor(BG_DIMENSIONS.height - 8),
    width: 54,
    height: 54,
  },

  leftSm: {
    left: Math.floor(BG_DIMENSIONS.width - 705),
    top: Math.floor(BG_DIMENSIONS.height - 4),
    width: 54,
    height: 54,
  },
};

const BG_IMAGE_PATH = path.join(__dirname, "../assets/images/bg.png");

const testImageList = [
  "https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg",
  "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://wallpaperaccess.com/full/2213424.jpg",
  "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://1.bp.blogspot.com/-0ZUMPsBahSo/X0vuBttwtWI/AAAAAAAAdwM/_0Nuxi-PWUsgTsLdAmGZqILPiJf7N2bdACLcBGAsYHQ/s1600/best%2Bdp%2Bfor%2Bwhatsapp%2B%25281%2529.jpg",
];

const testPng = path.join(__dirname, "../assets/images/index.png");

const createdPNG = path.join(__dirname, "../assets/images/created.png");

module.exports = {
  BG_IMAGE_PATH,
  BG_DIMENSIONS,
  ImagesCompositeOpts,
  testImageList,
  testPng,
  createdPNG,
};
