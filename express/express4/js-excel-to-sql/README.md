# js-xlsx-to-sql

將 excel 檔案 .xlsx 轉成 SQL 語法(MySQL)

## 如何使用

1. 安裝 node.js
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

## 分析

效能瓶頸取決於 讀取的 Excel row && CPU && 硬碟速度，限制筆數無法提升效能

- 在 i5-2400 CPU 下
  - Excel 大小對應的讀取時間
  - 12.2MB 17.152s
  - 53.6MB 84.403s
  - 執行 生成全部任務花費時間約 7 分鐘

## 安裝依賴

npm i xlsx

## 參考

https://www.delftstack.com/zh-tw/howto/javascript/javascript-read-excel-file/#%25E5%25AE%2589%25E8%25A3%259D-xlsx-node.js-%25E5%258C%2585
