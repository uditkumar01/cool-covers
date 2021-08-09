const express = require('express');
const axios = require('axios');
const JSSoup = require('jssoup').default;
const connectDB = require('./db/connectDB');
const ImageCollection = require('./models/imageCollection.model');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
const QUERY_URL = process.env.QUERY_URL;

connectDB();

const username = "uditkumar01";

// async function checkFollowers(username) {
//     const res = await axios.get(`https://api.github.com/users/${username}/followers`)
//     return res.data;
// }
async function makeCreateImageCall(newUserList) {
    console.log("making create image call");
    const res = await axios.post(QUERY_URL, newUserList);
    console.log(res.data);
}

const getData = async (html) => {
    let soup = new JSSoup(html);
    let imgTags = soup.findAll('img');
    const data = [];

    imgTags.forEach(item => {
        const attrs = item.attrs;

        if (attrs.src && attrs.alt && attrs.height === "50" && attrs.width === "50") {
            data.push({ avatar_url: attrs.src.replace("s=100&amp;", ""), login: attrs.alt.split('@')[1] });
        }
    });

    return data;
}

const checkFollowers = async () => {
    const URL = `https://github.com/${username}?tab=followers`;
    try {
        const res = await axios.get(URL);
        return await getData(res.data);
    } catch (err) {
        console.log(err);
    }
    return [];
}


app.get('/', (req, res) => {
    setInterval(async () => {
        try {
            const gitFollowers = await checkFollowers(username);
            const dbFollowers = await ImageCollection.find({});
            const DB_LEN = dbFollowers.length;
            const GIT_LEN = gitFollowers.length;
            console.log('running', DB_LEN, GIT_LEN);
            if (GIT_LEN > DB_LEN) {
                console.log("someone followed");
                const diffUsers = [];
                const allUsers = [];
                gitFollowers.forEach((follower) => {
                    const ava_url = follower.avatar_url;
                    const username = follower.login;
                    let check = true;
                    for (let i = 0; i < DB_LEN; i++) {
                        if (username === dbFollowers[i].username) {
                            check = false;
                            break;
                        }
                    }
                    if (check) {
                        diffUsers.push({
                            username,
                            image: ava_url
                        });
                    } else {
                        allUsers.push({
                            username,
                            image: ava_url
                        });
                    }
                })
                console.log(diffUsers.length);
                if (diffUsers.length > 0) {
                    await ImageCollection.insertMany(diffUsers);

                    const newUserList = (diffUsers.concat(allUsers)).slice(0, 36);

                    console.log(newUserList);

                    await makeCreateImageCall(newUserList);
                }

            } else if (DB_LEN > GIT_LEN) {
                console.log("someone unfollowed");
                const diffUsers = [];
                const usernames = [];
                dbFollowers.forEach((follower) => {
                    const ava_url = follower.image;
                    const username = follower.username;
                    let check = false;
                    for (let i = 0; i < GIT_LEN; i++) {
                        // console.log(i, username ,gitFollowers[i].login);
                        if (username === gitFollowers[i].login) {
                            // console.log(username, gitFollowers[i], i);
                            check = true;
                            break;
                        }
                    }
                    if (!check) {
                        diffUsers.push({
                            username,
                            image: ava_url
                        });
                        usernames.push(username);
                    }
                })
                if (usernames.length > 0) {
                    console.log(usernames, "testing");
                    await ImageCollection.deleteMany(
                        {
                            username: {
                                $in: usernames
                            }
                        },
                        function(err, result) {
                            console.log(err, result);
                        }
                    );
                }
            }
        } catch (err) {
            console.log(err.message);
            console.error(err);
        }
    }, 10000);
    res.send("hi");
});

app.listen(3000, () => {
    console.log('server started');
});
