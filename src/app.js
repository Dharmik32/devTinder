const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added Successfully!");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);

    const isPasswordValid =  await user.validatePassword(password);
    // console.log("isPasswordValid", isPasswordValid);

    if (isPasswordValid) {
      const token = await user.getJWT();
      // console.log("checking token", token);

      // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder2210", {
      //   expiresIn: "1d",
      // });

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login Successful!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("User does not exist");
    }

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    // Sending connection request
    const firstName = req.user.firstName;
    console.log("Connection request sent!");

    res.send(firstName + "Connection request sent!");
  } catch (error) {}
});

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    console.log("print user", user);

    if (user.length === 0) {
      res.status(404).send("User not found");
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
    const user = await User.findByIdAndDelete({ _id: userId });
    // const user = await User.findByIdAndDelete(userId);
    console.log("print delete user", user);
    res.send(user);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

// Update data of user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  console.log("print paramse patch value", userId);
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdatedAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    console.log("isUpdatedAllowed", isUpdatedAllowed);

    if (!isUpdatedAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills can't be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log("before print user", user);
    res.send("User Updated Successfully!");
  } catch (error) {
    res.status(400).send("UPDATE FAILED:" + error.message);
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
