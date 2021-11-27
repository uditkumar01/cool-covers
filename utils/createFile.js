const fs = require("fs");

const createFile = async (data, filePath) => {
  if (!data) return;
  try {
    await fs.writeFileSync(filePath, data, "utf-8");
  } catch (err) {
    console.log("Error in creating file", err);
  }
};

module.exports = createFile;
