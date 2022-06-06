const express = require("express");
const session = require("express-session");

const app = express();
// 使用express-session設定參數後req.session才有效果
// 參考圖片(https://i.imgur.com/kBwEX62.png)
app.use(
  session({
    //必填
    secret: "sakjvfkdh",
    // 不填會出現警告，但可以執行
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/set", (req, res) => {
  console.log(req.session);
  req.session.mySessionData = "123";
  res.send("set");
});

app.get("/get", (req, res) => {
  let responseTxt = "no";
  if (req.session.mySessionData) {
    responseTxt = req.session.mySessionData;
  }
  res.send(responseTxt);
});

app.listen(3011, () => {
  console.log("http://localhost:3011/set", "http://localhost:3011/get");
});
