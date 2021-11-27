const compareTwoJsons = (json1, json2) => {
  const list2 = Object.entries(json2);
  const isDifferent = list2.some(([key, value]) => {
    const value1 = json1[key];
    // if (typeof value1 === "object") {
    //   return compareTwoJsons(value1, value);
    // }
    console.log(value1, value, key);
    return (value || value1) && value1 !== value;
  });
  return isDifferent;
};

module.exports = compareTwoJsons;
