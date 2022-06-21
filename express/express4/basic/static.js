const express = require("express");
const app = express();

// express.static('靜態檔案名稱')
const staticMiddleware = express.static(__dirname + "/public");
app.use(staticMiddleware);

app.listen(3011, () => console.log("http://localhost:3011"));