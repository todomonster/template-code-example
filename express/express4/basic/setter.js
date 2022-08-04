const express = require("express");
const app = express();

// set是key value形式
app.set("參數", "87");
const data = app.get("參數");

app.get("/", function (req, res) {
  res.send(`${data}`);
});

app.listen(3011, () => console.log("http://localhost:3011"));
