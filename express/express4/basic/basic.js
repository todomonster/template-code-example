//掛載
const express = require("express");
//使用
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

//監聽
app.listen(3011, () => console.log("http://localhost:3011/"));
