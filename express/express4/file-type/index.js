import { fileTypeFromFile } from "file-type";
import express from "express";
import fs from "fs";
import multer from "multer";
import cors from "cors";

const upload = multer({ dest: "upload" });
const app = express();
app.use(cors());

app.post("/file", upload.single("myFile"), async function (req, res, next) {
  const { file } = req;
  if (file) {
    // 先 import { fileTypeFromFile } from "file-type";
    // async 檢查檔案正確格式
    const typeObject = await fileTypeFromFile(`upload/${file.filename}`);
    if (!typeObject) {
      res.send("請勿上傳 串改過的附檔名");
      return;
    }
    // 讀取
    fs.readFile(file.path, (err, data) => {
      if (err) return console.error(err);
      // 寫入 upload 資料夾
      fs.writeFile(`upload/${file.originalname}`, data, () => {
        // 檔案寫入成功後，後續動作...
        console.log("OK");
      });
    });

    res.send("OK");
  } else {
    // 沒有上傳圖片
    res.send("沒有上傳圖片");
  }
});

app.listen(3011, () => {
  console.log("http://localhost:3011/");
});
