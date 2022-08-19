const executeSQL = require("./db");
function 操作訂單資料(sql) {
  return executeSQL(sql);
}
function 操作優惠券資料(sql) {
  return executeSQL(sql);
}

module.exports = { 操作訂單資料, 操作優惠券資料 };
