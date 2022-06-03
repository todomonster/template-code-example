const express = require("express");

//宣告
const memberRouter = express.Router();
// 設定router物件的值
memberRouter.get("/", function (req, res) {
  res.send("/ 在這裡!");
});
memberRouter.get("/new", function (req, res) {
  res.send("new 在這裡!");
});

module.exports = memberRouter;
