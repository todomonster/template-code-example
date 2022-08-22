// 產生 sql
const config = {
  tableName: ["coupon_coupon_usages", "mobile_official", "cash_official"],
  payMethods: ["現金", "行動"],
  payMethodsCode: [1, 2],
  months: ["4月", "5月"],
  storesIds: [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
    42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
    80, 81, 82, 83, 84, 85, 86, 178, 179,
  ],
};
// 產生 的程式SQL 2x2x87 = 348 個SQL
const sqls = {
  現金: {
    "4月": [""],
    "5月": [""],
  },
  行動: {
    "4月": [""],
    "5月": [""],
  },
};


// // 表
// let couponUsageTable = "coupon_coupon_usages";
// let orderTable = "mobile_official" || "cash_official";

// 支付相關
let payMethodConditon = `AND paytype = 2`;
// 時間相關
let dateCondition =
  `used_at > date('2022-04-01 00:00:00') AND used_at < date('2022-05-01 00:00:00')` ||
  `結帳時間 < date('2022-05-1 00:00:00') AND 結帳時間 > date('2022-04-01 00:00:00')`;
//   店別相關
let storeCondition = ` AND store_id = 3` || `AND 店別 = '台北衡陽店'`;

let mobile_official = `SELECT * FROM mobile_official`;
let cash_official = `SELECT * FROM cash_official`;
let couponBase = `SELECT * FROM coupon_coupon_usages`;
let condition = `WHERE ${dateCondition} ${storeCondition} ${payMethodConditon}`;
let SQL = base + condition;
module.exports = { sqls };
