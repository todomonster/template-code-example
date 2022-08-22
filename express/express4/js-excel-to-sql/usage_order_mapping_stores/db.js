"use strict";
const mysql = require("mysql");

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test1',
  port: 3306,
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
// const run = async () => {
//   const data = await executeSQL(`SELECT * FROM vcarduser LIMIT 1;`)
//   console.log(data[0]);
// };
// run();

module.exports = { executeSQL };
