const { executeSQL } = require("./db");
const { generateRandomBinary } = require("../server/helper/digit-helper");
const {
  dateToString,
  addHours,
  getTomorrowMidnight,
} = require("../server/helper/date-parser");
const { saveFile } = require("../server/helper/save-file");

const dbConfig = {
  userTable: "vcarduser",
  genCouponTable: "coupon_coupon_usages",
  mappingTable: "user_combine_store",
  createTime: "createTime",
  storeName: "店別",
  orderTimeColumn: "結帳時間",
};

/**
 * 資料表
 * 產生券的時間 起 訖
 * 限制券產生的數量
 * 使用券的百分比%
 */

function main() {
  const table = ["mobile_official", "cash_official"];
  依照設定檔的條件以中鼎訂單生成Coupon券(
    "mobile_official",
    ["2022-04-01", "2022-05-01"],
    64
  );
  依照設定檔的條件以中鼎訂單生成Coupon券(
    "mobile_official",
    ["2022-05-01", "2022-06-01"],
    65
  );
  依照設定檔的條件以中鼎訂單生成Coupon券(
    "mobile_official",
    ["2022-06-01", "2022-07-01"],
    59
  );
  依照設定檔的條件以中鼎訂單生成Coupon券(
    "mobile_official",
    ["2022-07-01", "2022-08-01"],
    62
  );
  依照設定檔的條件以中鼎訂單生成Coupon券(
    "mobile_official",
    ["2022-08-01", "2022-09-01"],
    61
  );
}

async function 依照設定檔的條件以中鼎訂單生成Coupon券(
  tableName,
  [start, end],
  usedCouponRate = 100, //產生使用券的機率百分比
  limit = 50000 //產生多少張 以使用的 coupon
) {
  // 步驟一 依照時間 GET 訂單，訂單已經分成 行動支付和現金 並且確定比例了
  try {
    const getOrdersSQL = `SELECT * FROM ${tableName} WHERE ${dbConfig.orderTimeColumn} > date('${start} 00:00:00') AND ${dbConfig.orderTimeColumn} < date('${end} 00:00:00')`;
    let paytype = 2;
    if (tableName.indexOf("cash") > -1) {
      paytype = 1;
    }
    // 取得訂單s
    const data = await executeSQL(getOrdersSQL);
    const ordersLength = data.length;
    const couponConfig = getCouponConfig(ordersLength, usedCouponRate);

    const { usedAmount, notUseAmount } = couponConfig;

    let notUsedLimit = (limit * notUseAmount) / usedAmount - 1;

    let saveSQL = [];
    for (let i = 0; i < ordersLength; i++) {
      if (i > limit - 1) {
        break;
      }
      const order = data[i];
      const storeName = order[dbConfig.storeName];
      const orderTimeObj = order[dbConfig.orderTimeColumn];
      const orderTime = dateToString(addHours(8, orderTimeObj));

      // 步驟二  根據訂單時間 和 店別 隨機取得一個 LineUser
      const getOneRandomSQL = `SELECT * FROM ${dbConfig.mappingTable} 
        WHERE create_time < date('${orderTime}') AND store_name='${storeName}'
        ORDER BY RAND() LIMIT 1`;

      let lineUser = await executeSQL(getOneRandomSQL);
      if (lineUser.length === 0) {
        notUsedLimit++;
        continue;
      }
      const timeConfig = genTimeConfig(orderTimeObj);
      // 步驟三 產生 coupon券
      // console.log(paytype, ...lineUser, timeConfig);
      const sql = await genCoupon(paytype, ...lineUser, timeConfig);
      saveSQL.push(sql);
    }

    for (let i = 0; i < notUseAmount; i++) {
      if (i > notUsedLimit) {
        break;
      }
      const random = Math.floor(Math.random() * notUseAmount);
      const order = data[random];

      const storeName = order[dbConfig.storeName];
      const orderTimeObj = order[dbConfig.orderTimeColumn];
      const orderTime = dateToString(addHours(8, orderTimeObj));

      const getOneRandomSQL = `SELECT * FROM ${dbConfig.mappingTable} 
    WHERE create_time < date('${orderTime}') AND store_name='${storeName}'
    ORDER BY RAND() LIMIT 1`;

      const lineUser = await executeSQL(getOneRandomSQL);
      const timeConfig = genTimeConfig(orderTimeObj);

      const sql = await genCoupon(paytype, ...lineUser, timeConfig, "notUsed");
      saveSQL.push(sql);
    }
    saveSQL = saveSQL.sort(() => (Math.random() > 0.5 ? -1 : 1));

    await saveFile("new_coupon_usage.sql", saveSQL.join("\n"));
    console.log("完成建立");
    console.log("執行設定: ", couponConfig);
  } catch (error) {
    console.log(error);
  }
}
// VALUES (2, 23, 'U18cb760ff3e9e002d02c12d5afb23081', '2022/4/2 12:11:31', '2022/4/2 1:10:00', '7a524534-d274-4a4f-eb7f-d4785067db2e', '2022-04-03 00:00:00', 2);
async function genCoupon(paytype, lineUser, timeConfig, notUsed) {
  const coupon_id = 2;
  const { line_id = "U18cb760ff3e9e002d02c12d5afb23081", store_id = 23 } =
    lineUser;
  const {
    taken_at = "2022/4/2 12:11:31",
    used_at = "2022/4/2 1:10:00",
    expired_at = "2022-04-03 00:00:00",
  } = timeConfig;
  const taken_id = genTakenId([8, 4, 4, 4, 12]);
  let createSQL = `INSERT INTO ${dbConfig.genCouponTable} 
  (coupon_id, store_id, user_id, taken_at, used_at, taken_id, expired_at, paytype)
  VALUES (${coupon_id}, ${store_id}, '${line_id}', '${taken_at}', '${used_at}', '${taken_id}', '${expired_at}', ${paytype});`;

  if (notUsed === "notUsed") {
    createSQL = `INSERT INTO ${dbConfig.genCouponTable} 
  (coupon_id, store_id, user_id, taken_at, taken_id, expired_at, paytype)
  VALUES (${coupon_id}, 0, '${line_id}', '${taken_at}', '${taken_id}', '${expired_at}', ${paytype});`;
  }

  return createSQL;
}

function getCouponConfig(orderLen, couponUseRate) {
  const notUseRate = 100 - couponUseRate;
  const calculator = (len, rate) =>
    Math.floor((orderLen * 100) / couponUseRate);
  return {
    usedPercent: couponUseRate,
    notUsePercent: notUseRate,
    usedAmount: orderLen,
    notUseAmount: Math.floor(
      (calculator(orderLen, couponUseRate) * notUseRate) / 100
    ),
    totalAmount: calculator(orderLen, couponUseRate),
  };
}

function genTimeConfig(dateObj) {
  //亂數減少 小時
  const genRandNum = (num) => Math.floor(Math.random() * num);
  const randomHour = genRandNum(2);
  const randomMin = genRandNum(60);
  const randomSec = genRandNum(60);
  // 設定取得時間 為 亂數時間
  const date = new Date(dateObj);
  date.setTime(
    date.getTime() -
      randomHour * 60 * 60 * 1000 -
      randomMin * 60 * 1000 -
      randomSec * 1000
  );
  let used_at = dateToString(dateObj);
  return {
    taken_at: dateToString(date),
    used_at,
    expired_at: getTomorrowMidnight(dateObj), //日期+一天後 取前面就好 +00:00:00
  };
}

function genTakenId(arr) {
  // 產生16進位數字
  const ans = [];
  arr.forEach((binaryLength) => {
    const hex = parseInt(generateRandomBinary(binaryLength * 4), 2);
    ans.push(hex.toString(16));
  });
  return ans.join("-");
}
