const parseQuery = (query: Record<string, string>) => {
  Object.entries(query).forEach(([key, value]) => {
    query[key] = decodeURIComponent(value);
    // remove ' " from the beginning and end of the string
    query[key] = value.replace(/^['"]|['"]$/g, "");
    // replacing + with space
    query[key] = query[key].replace(/\+/g, " ");
  });
  return query;
};

// export const parseQueryString = (query: string) => {
//   queryParams.forEach((param) => {
//     const [key, value] = param.split("=");
//     // url decode
//     params[key] = decodeURIComponent(value);
//   });

//   return params;
// };

export default parseQuery;
