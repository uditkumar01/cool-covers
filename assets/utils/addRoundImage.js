const sharp = require("sharp");

async function addRoundImage(imagePath, width, height) {
  try {
    const svgString = `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="50" ry="50"/></svg>`;

    const roundedCorners = Buffer.from(svgString);
    const roundedCornerResizer = await sharp(imagePath)
      .resize(width, height)
      .composite([
        {
          input: roundedCorners,
          gravity: "center",
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer();
    return roundedCornerResizer;
  } catch (err) {
    console.log("in addRoundImage", err);
  }
}

module.exports = addRoundImage;
