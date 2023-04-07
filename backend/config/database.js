const mongoose = require("mongoose");

const connectionDb = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DATABASE_KEY).then((data) => {
    console.log(`MongoDb Connected with server ${data.connection.host}`);
  });
};

module.exports = connectionDb;
