const { default: JSSoup } = require("jssoup");
const getImagesFromLink = require("./getImagesFromLink");

const getUsers = async (html, limit) => {
  let soup = new JSSoup(html);
  const imgTags = soup.findAll("img") || [];
  const data = [];

  for (let i = 0; data.length < limit && i < imgTags.length; i++) {
    const attrs = imgTags[i].attrs;

    if (
      attrs.src &&
      attrs.alt &&
      attrs.height === "50" &&
      attrs.width === "50"
    ) {
      const imageSource = attrs.src.replace("s=100&amp;", "");
      const login = attrs.alt.split("@")[1];
      const imgBuf = await getImagesFromLink(imageSource, login);
      data.push({
        avatar_url: imageSource ? imgBuf : undefined,
        login,
      });
    }
  }

  return { followers: data };
};

module.exports = getUsers;
