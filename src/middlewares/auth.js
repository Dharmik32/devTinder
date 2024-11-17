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


const userAuth = (req, res, next) => {
  console.log("User auth is checking!");
  const token = "xyzabcdef";
  const isAdminAuthorized = token === "xyzabcdef";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = {
    adminAuth, userAuth
}

