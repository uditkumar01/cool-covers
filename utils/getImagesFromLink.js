const axios = require("axios");

const getImagesFromLink = async (imageLink, username) => {
  try {
    const { data } = await axios.get(imageLink, {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(data, "base64").toString("base64");
    return `data:image/png;base64,${buffer}`;
  } catch (err) {
    console.log("Error getting images from links", err);
  }
};

module.exports = getImagesFromLink;
