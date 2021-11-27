const templates = require("../templates");

const getImage = async (params, users, template_name) => {
  try {
    const getSVGString = templates?.[template_name] || templates.default;
    const svgString = getSVGString(params, users);
    return svgString;
  } catch (err) {
    console.log("Error in getImage", err);
  }
};

module.exports = getImage;
