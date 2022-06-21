const express = require("express");
const app = express();
// "view engine" 固定寫法，不用引入
app.set("view engine", "ejs");

app.get("/ab?*", (req, res, next) => {
  const ej = "index.ejs";
  next();
  res.render(ej, { id: "挖喜id" });
});

app.listen(3011, () => console.log("http://localhost:3011/"));
