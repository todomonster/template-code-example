const express = require("express");
const app = express();

//參考 https://ithelp.ithome.com.tw/articles/10242452
//CORS是非常常見的問題，簡單來說就是不同網站打API收發資料要有一定的限制，不能亂打
const cors = require("cors");
app.use(cors());
//

app.listen(3011, () => console.log("http://localhost:3011/"));
