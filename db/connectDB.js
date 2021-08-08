const mongoose = require('mongoose');

const URI = process.env['MONGODB_URI'];

async function connectDB() {
    try {
        await mongoose.connect(`${URI}followerTribute`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("DB Connected Successfully");
    } catch (err) {
        console.log(err);
    }
}
module.exports = connectDB;