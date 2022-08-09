"use strict";
const env = require("dotenv").config();
const express = require("express");
const app = express();
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

// city_id get city
function getCityById(id = 0) {
  const sql = `SELECT * FROM citys WHERE id = ${id};`;
  return new Promise((resolve, reject) => {
    conn.query(sql, [], (err, data) => {
      console.log(sql);
      if (err) {
        console.log(err);
        return reject({});
      } else {
        return resolve(data[0]);
      }
    });
  });
}

app.get("/city/:id", express.json(), async function (req, res) {
  try {
    const params = req.params;
    let { id = 0 } = params;
    return res.send(await getCityById(id));
  } catch (error) {
    return res.send(error);
  }
});
// 給area地區 去拿city縣市
app.get("/area/:name", express.json(), function (req, res) {
  try {
    const params = req.params;
    let { name = "" } = params;
    if (name === "all") name = "";
    let sql = `SELECT name, city_id  FROM areas WHERE name LIKE '${name}%';`;
    conn.query(sql, [], async (err, data) => {
      console.log(sql);
      if (err) {
        console.log(err);
        return res.send([]);
      } else {
        const city_id = data[0].city_id;
        res.send(await getCityById(city_id));
      }
    });
  } catch (error) {
    return res.send(error);
  }
});

// city+area
app.get("/locate", express.json(), function (req, res) {
  try {
    let sql = `SELECT name,city_id,city FROM areas
    INNER JOIN citys
    ON areas.city_id = citys.id;`;
    conn.query(sql, [], async (err, data) => {
      console.log(sql);
      if (err) {
        console.log(err);
        return res.send([]);
      } else {
        res.send(data);
      }
    });
  } catch (error) {
    return res.send(error);
  }
});

// lineUsers
app.get("/users", express.json(), function (req, res) {
  try {
    let sql = `SELECT DISTINCT lineUserid ,id FROM lineuser ORDER BY id;`;
    conn.query(sql, [], async (err, data) => {
      console.log(sql);
      if (err) {
        console.log(err);
        return res.send([]);
      } else {
        res.send(data.map((x) => x.id));
      }
    });
  } catch (error) {
    return res.send(error);
  }
});

app.listen(3011, () => console.log("http://localhost:3011/"));
