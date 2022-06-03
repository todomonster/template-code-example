// body-parser 簡單來說就是編碼轉換的套件
// 強力建議看完這篇 https://ithelp.ithome.com.tw/articles/10241083
// 為什麼urlencoded要繼承? 因為他引用了其他套件;2個要選一個

// ============================== 現代版，箭頭函數
const express = require("express");
const app = express();

//json data => postman 格式選 raw/json
app.post("/json", express.json(), (req, res) => {
  console.log(req.body);
  res.send(JSON.stringify(req.body));
});

//form data => postman 格式選 x-www-form-urlencoded
app.post("/urlencoded", express.urlencoded({ extended: true }), (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(3011, () => console.log("http://localhost:3011/"));

// ============================== 以前的版本 會在網路上看到這種寫法
// var express = require("express");
// var app = express();

// var bodyParser = require("body-parser");

// var jsonParser = bodyParser.json();
// app.post("/json", jsonParser, function (req, res) {
//   console.log(req.body);
//   res.send(JSON.stringify(req.body));
// });

// var urlencodedParser = bodyParser.urlencoded({ extended: true });
// app.post("/urlencoded", urlencodedParser, function (req, res) {
//   console.log(req.body);
//   res.send(req.body);
// });

// app.listen(3011, () => console.log("http://localhost:3011/"));
