import axios from "axios";

interface IFontObject {
  buffer: string;
  url: string;
}

const getFontCss = async (url?: string) => {
  if (!url) return "";
  try {
    const response = await axios.get(url);
    let fontCss = response.data;

    // find all urls
    const urlsMatches = fontCss.match(/url\((.*?)\)/g);
    // remove 'url(', ')' and '"' or "'"
    const urls = urlsMatches.map((url: string) =>
      url.replace(/url\((.*?)\)/, "$1").replace(/["']/g, "")
    );

    // download the font files
    const fontData: IFontObject[] = await Promise.all(
      urls.map(async (url: string) => {
        try {
          const response = await axios.get(url, {
            responseType: "arraybuffer",
          });
          const buffer = Buffer.from(response.data).toString("base64");
          return {
            buffer,
            url,
          };
        } catch (err: any) {
          console.log(err?.message);
        }
        return {
          buffer: "",
          url,
        };
      })
    );

    // replace the url() with the base64 encoded font file
    fontData.forEach((fontItem) => {
      const { buffer, url } = fontItem;
      if (!buffer) return;
      fontCss = fontCss.replace(
        url,
        `data:application/octet-stream;base64,${buffer}`
      );
    });

    return fontCss;
  } catch (err: any) {
    console.log(err?.message);

    return "";
  }
};

export default getFontCss;
