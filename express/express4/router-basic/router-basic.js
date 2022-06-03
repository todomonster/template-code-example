const express = require("express");
const app = express();

//宣告
const memberRouter = express.Router();
// 設定router物件的值
memberRouter.get("/new", function (req, res) {
  res.send("new member form在這裡!");
});
//掛載
app.use("/member", memberRouter);

app.listen(3011, () => console.log("http://localhost:3011/member/new", 3011));
