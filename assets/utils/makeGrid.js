const sharp = require("sharp");
const { BG_IMAGE_PATH } = require("../constants");
const { ImagesCompositeOpts } = require("../constants");

async function makeGrid(images) {
  try {
    const bgBuf = await sharp(BG_IMAGE_PATH)
      .composite([
        {
          input: images?.[0] || BG_IMAGE_PATH,
          blend: "over",
          ...ImagesCompositeOpts.center,
        },
        {
          input: images?.[1] || BG_IMAGE_PATH,
          blend: "over",
          ...ImagesCompositeOpts.rightMd,
        },
        {
          input: images?.[2] || BG_IMAGE_PATH,
          blend: "over",
          ...ImagesCompositeOpts.leftMd,
        },
        {
          input: images?.[3] || BG_IMAGE_PATH,
          blend: "over",
          ...ImagesCompositeOpts.rightSm,
        },
        {
          input: images?.[4] || BG_IMAGE_PATH,
          blend: "over",
          ...ImagesCompositeOpts.leftSm,
        },
      ])
      .png()
      .toBuffer();
    return `data:image/png;base64,${bgBuf.toString("base64")}`;
  } catch (err) {
    console.log("in makeGrid", err);
  }
}

module.exports = makeGrid;
