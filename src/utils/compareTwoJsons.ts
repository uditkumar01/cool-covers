const compareTwoJsons = (
  json1: Record<string, any>,
  json2: Record<string, any>
) => {
  const list2 = Object.entries(json2);
  const isDifferent = list2.some(([key, value]) => {
    const value1 = json1?.[key];
    // if (typeof value1 === "object") {
    //   return compareTwoJsons(value1, value);
    // }
    return (value || value1) && value1 !== value;
  });
  return isDifferent;
};

export default compareTwoJsons;
