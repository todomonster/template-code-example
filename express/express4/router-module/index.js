const express = require("express");
const app = express();

// 引用
const memberRoute = require("./member.js");
//掛載 可選擇掛在哪，這邊示範member
app.use("/member", memberRoute);

app.listen(3011, () => console.log("http://localhost:3011/member/new", 3011));
