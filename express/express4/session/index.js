
const express = require("express");
const session = require("express-session");
const app = express();

// 使用express-session設定參數後req.session才有效果
// 參考圖片(https://i.imgur.com/kBwEX62.png)
app.use(
  session({
    //必填 秘密id
    secret: "sakjvfkdh",
    // 不填會出現警告，但可以執行
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/set", (req, res) => {
  // req.session 引用套件才有效果!
  console.log(req.session);
  req.session.mySessionData = "123";
  res.send("已設定完成");
});

app.get("/get", (req, res) => {
  let responseTxt = "no session，請先到 http://localhost:3011/set 設定";
  if (req.session.mySessionData) {
    responseTxt = req.session.mySessionData;
  }
  res.send(responseTxt);
});

app.get("/", (req, res) => {
  const text = "請到 http://localhost:3011/set  ,  http://localhost:3011/get"
  res.send(text);
});

app.listen(3011, () => {
  console.log("http://localhost:3011/set", "http://localhost:3011/get");
});
