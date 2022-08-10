import { IFollower } from "./getUsers";
import getSVGString from "./getSVGString";

const getImage = async (params: Record<string, string>, users: IFollower[]) => {
  try {
    const svgString = await getSVGString(params, users);
    // convert svg string to image buffer
    // const imageBuf = Buffer.from(svgString, "utf8").toString("base64");
    // return `data:image/svg+xml;base64,${imageBuf}`;
    return svgString;
  } catch (err: any) {
    console.log("Error in getImage", err?.message);
  }
};

export default getImage;
