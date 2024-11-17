const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Create a new instance of the User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added Successfully!");
  } catch (error) {
    res.status(400).send("Error saving the user: " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established!...");
    app.listen(8000, () => {
      console.log("Server is successfully listening on port 8000...");
    });
  })
  .catch(() => {
    console.log("Database connection failed...");
  });
