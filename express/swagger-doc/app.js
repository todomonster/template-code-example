const express = require("express");
const app = express();
const cors = require("cors");
const memberRouter = require('./routes/member')
// 正式區要設定
app.use(cors());

const PORT = 3000;

app.use("/member", memberRouter);
//"📄" swagger start
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./doc/swagger-output.json");
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
//swagger end

app.listen(PORT, () =>
  console.log(`🎧 http://localhost:${PORT}/api-doc 🎧`, "\n")
);

module.exports = app;
