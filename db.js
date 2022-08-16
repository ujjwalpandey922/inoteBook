const mongoose = require("mongoose");
const mongooURI =
  "mongodb+srv://ujjwal_pandey_922:ujjwalP922@cluster0.t9xrscz.mongodb.net/test";

const connectToMongo = () => {
  mongoose.connect(process.env.MONGODB_URI || mongooURI, () => {
    console.log("connected !!!!!!!");
  });
};

module.exports = connectToMongo;
