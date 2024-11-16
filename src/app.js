const express = require("express");
// console.log("expreess", express);

const app = express();
// console.log("app", app);


app.use("/hello", (req, res) => {
  res.send("Hello hello hello Akshay !");
});


app.use("/test", (req, res) => {
  res.send("Hello from Server1!");
});

app.listen(8000, () => {
  console.log("Server is successfully listening on port 8000...");
});