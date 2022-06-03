// 這個範例比較複雜，包含2個html前端範例

const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");

app.use(cors());
const upload = multer({ dest: "/upload" });

app.post("/file", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  console.log(file);
  const sendBack = {
    file: file,
  };
  res.send(sendBack);
});

app.listen(3011, () => console.log("http://localhost:3011/"));
