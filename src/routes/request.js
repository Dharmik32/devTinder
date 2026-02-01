const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    // Sending connection request
    const firstName = req.user.firstName;
    console.log("Connection request sent!");

    res.send(firstName + "Connection request sent!");
  } catch (error) {}
});

module.exports = requestRouter;