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

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    console.log("print user", user);

    if (user.length === 0) {
      res.send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    console.log(".find get the collection", users);
    res.send(users);
    
  } catch (error) {
    res.status(400).send("something went wrong");
  }
})

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
