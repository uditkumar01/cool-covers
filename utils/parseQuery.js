const parseQuery = (query) => {
  Object.entries(query).forEach(([key, value]) => {
    // remove ' " from the beginning and end of the string
    query[key] = value.replace(/^['"]|['"]$/g, "");
    // replacing + with space
    query[key] = query[key].replace(/\+/g, " ");
  });
  return query;
};

module.exports = parseQuery;
