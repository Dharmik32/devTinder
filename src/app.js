const express = require("express");

const app = express();

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

// this will match all the HTTP method API call to /test
app.use("/test", (req, res) => {
  res.send("Hello from Server!");
});

app.listen(8000, () => {
  console.log("Server is successfully listening on port 8000...");
});
