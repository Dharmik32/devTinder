const express = require("express");

const app = express();

const { adminAuth, userAuth } = require('./middlewares/auth');

// Handle Auth Middleware for all GET, POST, PUT, DELETE requests
app.use("/admin", adminAuth);

app.get("/usertest", userAuth, (req, res) => {
  res.send("user data sent!");
})

app.get("/admin/getAllData", (req, res) => {
  res.send("Welcome to Admin Dashboard");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.use(
  "/user",
  (req, res, next) => {
    // Route Handler
    console.log("Handling the user route");
    // res.send("Route Handler 1");
    next();
  },
  (req, res, next) => {
    // Route Handler
    console.log("Handling the user route 2");
    // res.send("Route Handler 2");
    next();
  },
  (req, res, next) => {
    // Route Handler
    console.log("Handling the user route 3");
    // res.send("Route Handler 3");
    next();
  },
  (req, res, next) => {
    // Route Handler
    console.log("Handling the user route 4");
    res.send("Route Handler 4");
    // next();
  }
);

// This will only handle GET call to /user
app.get("/user/:userId/:name/:password", (req, res) => {
  console.log("request param", req.params);
  res.send({ firstName: "Dharmik", lastName: "Chavda" });
});

app.post("/user", (req, res) => {
  // saving data to DB
  res.send("Data successfully saved to database");
});

app.delete("/user", (req, res) => {
  // delete data from DB
  res.send("Data successfully deleted from database");
});

app.use("/test", (req, res, next) => {
  console.log("test route 2");
  res.send("Hello from Server 2!");
});

// this will match all the HTTP method API call to /test
app.use("/test", (req, res, next) => {
  console.log("test route");
  // res.send("Hello from Server!");
  next();
});

app.listen(8000, () => {
  console.log("Server is successfully listening on port 8000...");
});
