const express = require("express");
const app = express();

// 注意這邊是冒號開頭
app.get("/:who", (req, res) => {
  // param是冒號後面的 key:value
  const params = JSON.stringify(req.params);
  //query是網址?後面的參數
  const query = JSON.stringify(req.query);
  const url = JSON.stringify(req.url);
  res.send(`params:${params},   query:${query},   url:${url}`);
});

app.listen(3011, () =>
  console.log("http://localhost:3011/Richard?id=1&nickname=yuan")
);
