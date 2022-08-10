import axios from "axios";

const getImagesFromLink = async (imageLink: string) => {
  try {
    const { data } = await axios.get(imageLink, {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(data, "base64").toString("base64");
    return `data:image/png;base64,${buffer}`;
  } catch (err: any) {
    console.log("Error getting images from links", err?.message);
  }
};

export default getImagesFromLink;
