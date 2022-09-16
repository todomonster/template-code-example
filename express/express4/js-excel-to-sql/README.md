# js-xlsx-to-sql

此專案包含

1.  [js 工具] index.js

- 將 excel 檔案 .xlsx 轉成 SQL 語法(MySQL)
- 亂數配對uid 建議拔掉(太吃記憶體)

2.  [nodjs 後端] app.js
3.  [vuetify 前端] client index.html

## 安裝依賴

- [js 工具]
  - npm i xlsx
- [nodjs 後端]
  - npm i mysql express dotenv cors

## 如何使用

### [js 工具]

1. 需先安裝 node.js 16
2. cd 到 /js-xlsx-to-sql/server
3. 執行語法 node index.js

```js
// 在 server 下面的 index.js 可以設定參數
// 目前是預設 在資料庫名稱為`test1` 建立2張Table{`mobile`和`cash`}

const config = {
  dbName: `test1`, //資料庫名稱
  mobile: `mobile`, //資料表名稱
  cash: `cash`, //資料表名稱
  fileExtension: ".sql", //副檔名
  months: ["3月", "4月", "5月", "6月"], //excel 月份
  //excel 檔案位置
  mobilePath: [
    "../excel/優遊付(卡)/2022.xlsx",
    "../excel/APPLEPAY/2022.xlsx",
    "../excel/LINEPAY/2022.xlsx",
  ],
  //excel 檔案位置
  cashPath: ["../excel/現金/2022.xlsx"],
};
```

### [js 工具] 分析

效能瓶頸取決於 讀取的 Excel row && CPU && 硬碟速度，限制筆數無法提升效能

- 在 i5-2400 CPU 下
  - Excel 大小對應的讀取時間
  - 12.2MB 17.152s
  - 53.6MB 84.403s
  - 執行 生成全部任務花費時間約 9 分鐘
  - 會遇到 記憶體太少的問題變成現金只能一個月一個月跑

### [nodjs 後端]

1. 需先安裝 node.js 16 和 開啟伺服器程式 MySQL (我是使用 XAMPP 開發)
2. 利用工具匯入資料進 DB (SQL 檔案位置請見 /js-xlsx-to-sql/sql/data.md)
3. cd 到 /js-xlsx-to-sql/server
4. 執行語法 node app.js

成功後會提示 "DB 連線成功"

#### 接著到前端

1. 安裝 VScode 套件[Live Server] [請參考](https://mnya.tw/cc/word/1430.html)
2. cd 到 client 資料夾利用第一步的工具開請 index.html

## 參考資料

https://www.delftstack.com/zh-tw/howto/javascript/javascript-read-excel-file/#%25E5%25AE%2589%25E8%25A3%259D-xlsx-node.js-%25E5%258C%2585

icon 來源:

https://materialdesignicons.com/icon/content-save

===
data backup: 

https://drive.google.com/drive/folders/1YX6PZR5DExGu567mEaIiLARIVrN7q4rH?usp=sharing

## 資料夾作用
server
client
excel
中鼎訂單 excel 轉SQL進DB

後來發現其實不用訂單做比較快,因為訂單要撈DB很慢
fix_bug
gas
online_order
sarani_move_cash_mobile
usage_order_mapping_stores
