const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req, res, next) => {
  console.log("Admin auth is checking!");
  const token = "xyzabcdef";
  const isAdminAuthorized = token === "xyzabcdef";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

// const userAuth = (req, res, next) => {
//   console.log("User auth is checking!");
//   const token = "xyzabcdef";
//   const isAdminAuthorized = token === "xyzabcdef";
//   if (!isAdminAuthorized) {
//     res.status(401).send("Unauthorized request");
//   } else {
//     next();
//   }
// };

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please Login!");
    }

    const decodedObj = await jwt.verify(token, "DEV@Tinder2210");

    const { _id } = decodedObj;
    
    const user = await User.findById(_id);
    if(!user){
      throw new Error("User does not exist");
    }
    req.user = user;
    next();

  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
