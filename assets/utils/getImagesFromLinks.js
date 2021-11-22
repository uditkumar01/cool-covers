const axios = require("axios");
const addRoundImage = require("./addRoundImage");
const { ImagesCompositeOpts } = require("../constants");

async function getImagesFromLinks(imageList) {
  const opts = Object.values(ImagesCompositeOpts);
  try {
    const resolvedImages = await Promise.all(
      imageList.map(async (imageLink, index) => {
        try {
          const { data } = await axios.get(imageLink, {
            responseType: "arraybuffer",
          });
          const image = await addRoundImage(
            data,
            opts[index].width,
            opts[index].height
          );
          return image;
        } catch (err) {
          console.log("Error getting image", imageLink, err);
        }
      })
    );
    return resolvedImages;
  } catch (err) {
    console.log("Error getting images from links", err);
  }
}

module.exports = getImagesFromLinks;
