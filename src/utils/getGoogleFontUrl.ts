const getGoogleFontUrl = (fontName?: string, fontWeight?: string) => {
  if (!fontName) return "";
  fontName = fontName.replace(/\s/g, "+");
  fontWeight = fontWeight ? `:wght@${fontWeight}` : "";
  return `https://fonts.googleapis.com/css2?${
    fontName ? `family=${fontName}${fontWeight}` : "family=Monoton"
  }`;
};

export default getGoogleFontUrl;
