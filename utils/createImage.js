const path = require("path");
const { SVGS_BASE_PATH } = require("../constants/constant");
const createFile = require("./createFile");
const getImage = require("./getImage");

const createImage = async (params, followers) => {
  try {
    const { username } = params;
    const svgPath = path.join(SVGS_BASE_PATH, `${username}.svg`);
    const imageBuf = await getImage(params, followers);

    await createFile(imageBuf, svgPath);
    return imageBuf;
  } catch (err) {
    console.log(err);
  }
};

module.exports = createImage;
