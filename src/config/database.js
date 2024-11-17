const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://dharmikchavda07:pvwKXIhywJxmL1Y0@namastenode.kycrh.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
