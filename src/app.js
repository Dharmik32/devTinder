const express = require("express");

const app = express();

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Dharmik", lastName: "Chavda" });
});

app.post("/user", (req, res) => {
  // saving data to DB
  res.send("Data successfully saved to database");
});

app.delete("/user", (req, res) => {
  // delete data from DB
  res.send("Data successfully deleted from database");
})

// this will match all the HTTP method API call to /test
app.use("/test", (req, res) => {
  res.send("Hello from Server!");
});

app.listen(8000, () => {
  console.log("Server is successfully listening on port 8000...");
});