const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

module.exports = authRouter;