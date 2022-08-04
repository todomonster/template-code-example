1. 目前是使用 import 方式引入 請把 package.json 第三行 type 改成 module

2. 請用 postman 傳送圖片，body 選擇 form-data,key 從 Text 改為 File

3. 使用 file.html 檔案測試

```json
{
  "name": "server",
  "version": "1.0.0",
  "type": "module",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "ejs": "^3.1.8",
    "express": "^4.17.1",
    "express-session": "^1.17.3",
    "file-type": "^17.1.2",
    "multer": "^1.4.5-lts.1",
    "mysql": "^2.18.1"
  }
}
```
