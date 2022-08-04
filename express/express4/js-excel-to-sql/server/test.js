"use strict";
const env = require("dotenv").config();
const express = require("express");
const app = express();
const parseExcel = require("./xlsx/index");
const { addMonth } = require("./helper/date-parser");
const cors = require("cors");
app.use(cors());

const mysql = require("mysql");

const { user, password, host, port, database } = process.env;
const conn = mysql.createConnection({
  user,
  password,
  host,
  port,
  database,
});

conn.connect(function (err) {
  console.log(err ? err : "DB連線成功");
});

// 從 excel 取得
app.get("/excel/mobile", express.json(), async function (req, res) {
  try {
    const excelPath = "../excel/APPLEPAY/2022.xlsx";
    const sheetsName = "5月";
    const limit = 15;
    //   function 可以傳 [檔案路徑 資料表名稱 限制limit筆數]
    const data = await parseExcel(excelPath, sheetsName, limit);
    return res.send(data);
  } catch (error) {
    return res.send(error);
  }
});

/* 
http://localhost:3011/status/2022/04

  {
    "cash": {
        "rows": 250605,
        "sum": 226074688
    },
    "mobile": {
        "rows": 58594,
        "sum": 5719038
    }
  }
*/
app.get("/status/:year/:month", express.json(), function (req, res) {
  try {
    const params = req.params;
    const { year, month } = params;
    if (isNaN(Number(year)) || isNaN(Number(month))) {
      return res.send("請注意格式 ex: /data/2022/03");
    }
    let ans = {};

    const min = addMonth(`${year}-${month}-01`, 0);
    const max = addMonth(min, 1);
    const cashSql = `SELECT COUNT(id) as 'rows',SUM(款項金額) as 'sum' FROM cash WHERE 結帳時間 BETWEEN '${min}' AND '${max}';`;
    const mobileSql = `SELECT COUNT(id) as 'rows',SUM(款項金額) as 'sum' FROM mobile WHERE 結帳時間 BETWEEN '${min}' AND '${max}';`;

    conn.query(cashSql, [], (err, data) => {
      console.log(cashSql);
      if (err) {
        console.log(err);
        return res.send([]);
      } else {
        const { rows, sum } = data[0];
        ans.cash = { rows, sum };

        conn.query(mobileSql, [], (err, data) => {
          console.log(mobileSql);
          if (err) {
            console.log(err);
            return res.send([]);
          } else {
            const { rows, sum } = data[0];
            ans.mobile = { rows, sum };
            return res.send(ans);
          }
        });
      }
    });
  } catch (error) {
    return res.send(error);
  }
});

// http://localhost:3011/cash/2022/03?limit=1
/*
  [
      {
          "id": 1,
          "店別": "板橋埔墘店",
          "銷售單號": "9300028319",
          "機號": "93",
          "顧客編號": "A229387805",
          "顧客姓名": "Pei",
          "持卡人": "",
          "付款方式": "Line Pay",
          "款項金額": 905,
          "結帳時間": "2022-03-01T01:24:00.000Z",
          "註記": "",
          "結帳員工": "板橋埔墘店員"
      }
  ]
*/
app.get("/cash/:year/:month", express.json(), function (req, res) {
  try {
    const query = req.query;
    const params = req.params;

    const { year, month } = params;
    if (isNaN(Number(year)) || isNaN(Number(month))) {
      return res.send("請注意格式 ex: /data/2022/03");
    }
    const min = addMonth(`${year}-${month}-01`, 0);
    const max = addMonth(min, 1);
    const sql = `SELECT * FROM cash WHERE 結帳時間 BETWEEN '${min}' AND '${max}' ORDER BY RAND() limit ?;`;
    const limit = Number(query?.limit) || 1;
    conn.query(sql, [limit], (err, data) => {
      console.log(sql);
      if (err) {
        console.log(err);
        return res.send([]);
      } else {
        return res.send({ date: `${year}/${month}`, data });
      }
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// http://localhost:3011/mobile/2022/03?limit=1
/*
  [
      {
          "id": 1,
          "店別": "楠梓後昌店",
          "銷售單號": "5800025510",
          "機號": "58",
          "顧客編號": "",
          "顧客姓名": "",
          "持卡人": "",
          "付款方式": "現金",
          "款項金額": 30,
          "結帳時間": "2022-03-01T00:51:00.000Z",
          "註記": "",
          "結帳員工": "楠梓後昌店員"
      }
  ]
*/
app.get("/mobile/:year/:month", express.json(), function (req, res) {
  try {
    const query = req.query;
    const params = req.params;

    const { year, month } = params;
    if (isNaN(Number(year)) || isNaN(Number(month))) {
      return res.send("請注意格式 ex: /data/2022/03");
    }
    const min = addMonth(`${year}-${month}-01`, 0);
    const max = addMonth(min, 1);
    const sql = `SELECT * FROM mobile  WHERE 結帳時間 BETWEEN '${min}' AND '${max}' ORDER BY RAND() limit ?;`;
    const limit = Number(query?.limit) || 1;
    conn.query(sql, [limit], (err, data) => {
      console.log(sql);
      if (err) {
        console.log(err);
        return res.send([]);
      } else {
        return res.send({ date: `${year}/${month}`, data });
      }
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

app.post("/random", express.json(), function (req, res) {
  try {
    const params = req.body;
    const { year, month, index, monthPrice, mobilePercent } = params;
    const cashPercent = 100 - mobilePercent;
    let prices = (monthPrice * mobilePercent) / 100;
    if (isNaN(Number(year)) || isNaN(Number(month))) {
      return res.send("請注意格式 ex: /data/2022/03");
    }
    let ans = { index };

    const min = addMonth(`${year}-${month}-01`, 0);
    const max = addMonth(min, 1);
    let tableName = "cash";
    let SQL = `
    SELECT NULL AS id, NULL AS 款項金額, NULL AS total
    FROM dual
    WHERE (@total := 0)
    UNION
    
    SELECT id, 款項金額, @total := @total + 款項金額 AS total
    FROM ${tableName}
    WHERE @total < ${prices} AND 結帳時間 BETWEEN '${min}' AND '${max}' AND id%2=1 ;
    `;

    conn.query(SQL, [], (err, data) => {
      console.log(SQL);
      if (err) {
        console.log(err);
        return res.send([]);
      } else {
        ans.cash = data;
        ans.cashTotal = data[data.length-1].total
        tableName = "mobile";
        prices = (monthPrice * cashPercent) / 100;
        conn.query(SQL, [], (err, data) => {
          console.log(SQL);
          if (err) {
            console.log(err);
            return res.send([]);
          } else {
            ans.mobile = data;
            ans.mobileTotal = data[data.length-1].total
            return res.send(ans);
          }
        });
      }
    });
  } catch (error) {
    return res.send(error);
  }
});

app.listen(3011, () => console.log("http://localhost:3011/"));
