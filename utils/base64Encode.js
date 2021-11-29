const fs = require("fs");

// function to encode file data to base64 encoded string
function base64Encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return `data:image/png;base64,${Buffer.from(bitmap).toString("base64")}`;
}

module.exports = base64Encode;
