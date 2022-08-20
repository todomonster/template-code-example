const executeSQL = require("./db");
function 取得訂單資料(sql) {
  return executeSQL(sql);
}
function 取得優惠券資料(sql) {
  return executeSQL(sql);
}

module.exports = { 取得訂單資料, 取得優惠券資料 };
