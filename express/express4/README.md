# Express 整理

需要先安裝 nodejs

https://nodejs.org/en/

## 指令

```bash

npm init -y

npm install

# 執行程式使用進入該資料夾 在終端機下 node 指令
node basic.js

#完成後連到該

```

## 官方文件

https://expressjs.com/zh-tw/api.html

## 語法整理

```js
const express = require("express"); //引用
/*
補充
在package.json需要有 "type": "commonjs" 才能用require
預設值就是commonjs
若要用ES6 import的話，要改成"type": "module"
*/

res.render(); //渲染 需要 html或是ejs等靜態檔案
res.send(); //發送訊息
res.end();
res.write();

req.params; //路徑 http://localhost:3000/user/ken /user:who
req.query; //Query參數 http://localhost:3000?name=cat&id=1
req.url;
req.body;
req.file;

__dirname //資料夾所在位置
```

## http header 知識

<!-- 來源 https://notfalse.net/40/http-representation#-Media-Type -->

先知道三個即可

- Content-Type: x-www-form-urlencoded //預設
- Content-Type: multipart/form-data //送檔案(png 等)
- Content-Type: application/json; charset=utf-8 //送 JSON

```html
<!-- 來源 https://flaviocopes.com/how-to-upload-files-fetch/ -->
<body>
  <!-- 可以在表單寫好就不用在js寫 -->
  <form
    action="http://localhost:3011/file"
    enctype="multipart/form-data"
    method="POST"
  >
    <input type="file" name="myFile" id="myFirstUpload" />
    <input type="submit" value="Upload a file" />
  </form>
  <script>
    //   若html不設定的話，就要在js設定header
    headers = {
      "Content-Type": "multipart/form-data",
    };
  </script>
</body>
```
