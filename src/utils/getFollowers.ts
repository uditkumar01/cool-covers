import axios from "axios";
import getUsers, { IFollower } from "./getUsers";

const getFollowers = async (username: string, followersCount: number) => {
  try {
    let allFollowers: IFollower[] = [];
    let pageNo = 1;
    while (allFollowers.length < followersCount) {
      const URL = `https://github.com/${username}?page=${pageNo}&tab=followers`;
      const res = await axios.get(URL);
      const { followers } = await getUsers(res.data, followersCount);
      if (followers.length < 1) {
        break;
      }
      allFollowers = allFollowers.concat(followers);
      pageNo++;
    }
    return allFollowers;
  } catch (err: any) {
    console.log(err?.message);
  }
  return [];
};

export default getFollowers;
