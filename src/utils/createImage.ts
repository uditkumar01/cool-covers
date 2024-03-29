import getFollowers from "./getFollowers";
import getImage from "./getImage";

const followersCount = 5;
const createImage = async (params: Record<string, string>) => {
  try {
    if (!params?.text) {
      params = {
        ...params,
        text: `Hi, I'm ${params.username}`,
        fontSize: "4rem",
      };
    }
    const followers = await getFollowers(params.username, followersCount);
    const imageBuf = await getImage(params, followers);
    return imageBuf;
  } catch (err: any) {
    console.log(err?.message);
  }
};

export default createImage;
