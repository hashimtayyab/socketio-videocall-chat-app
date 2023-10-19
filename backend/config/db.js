const mongoose = require("mongoose");

exports.connectMongoose = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => console.log(`Error: ${e}`));
}
