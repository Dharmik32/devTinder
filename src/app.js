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
});

// Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({_id: userId});
    // const user = await User.findByIdAndDelete(userId);
    console.log("print delete user", user);
    res.send(user);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

// Update data of user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({_id: userId}, data, {
      returnDocument: "after",
      runValidators: true
    });
    console.log("before print user", user);
    res.send("User Updated Successfully!")
  } catch (error) {
    res.status(400).send("UPDATE FAILED:" + error.message);
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
