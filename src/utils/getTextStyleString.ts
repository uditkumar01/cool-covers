const getTextStyleString = (textStyle: React.CSSProperties) => {
  return Object.entries(textStyle)
    .map(([key, value]) => {
      // camelCase to kebab-case
      const kebabKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      return `${kebabKey}: ${value};`;
    })
    .join("");
};

export default getTextStyleString;
