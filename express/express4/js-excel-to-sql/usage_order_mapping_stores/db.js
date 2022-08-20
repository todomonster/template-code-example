"use strict";
const env = require("dotenv").config();
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

function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    console.log(sql);
    conn.query(sql, [], (err, data) => {
      if (err) {
        return reject({ err });
      }

      return resolve(data);
    });
  });
}

module.exports = { executeSQL };
