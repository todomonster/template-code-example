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

依照設定檔的條件以中鼎訂單生成Coupon券(
  "mobile_official",
  ["2022-04-01", "2022-05-01"],
  2,
  100
);

// 隨機產生未使用的

async function 依照設定檔的條件以中鼎訂單生成Coupon券(
  tableName,
  [start, end],
  limit = 50000, //產生多少張 以使用的 coupon
  usedCouponRate = 100 //產生使用券的機率百分比
) {
  // 步驟一 依照時間 GET 訂單，訂單已經分成 行動支付和現金 並且確定比例了
  try {
    /**
     *
     *
     */

    const getOrdersSQL = `SELECT * FROM ${tableName} WHERE ${dbConfig.orderTimeColumn} > date('${start} 00:00:00') AND ${dbConfig.orderTimeColumn} < date('${end} 00:00:00')`;
    let paytype = 2;
    if (tableName.indexOf("cash") > -1) {
      paytype = 1;
    }
    // 取得訂單s
    const data = await executeSQL(getOrdersSQL);
    const ordersLength = data.length;
    const couponConfig = getCouponConfig(ordersLength, usedCouponRate);
    console.log("開始執行設定: ", couponConfig);
    const saveSQL = [];
    for (let i = 0; i < ordersLength; i++) {
      if (i > limit - 1) {
        break;
      }
      const order = data[i];

      const storeName = order[dbConfig.storeName];
      // addHours(8, dateObj)
      const orderTimeObj = order[dbConfig.orderTimeColumn];
      const orderTime = dateToString(addHours(8, orderTimeObj));

      // 步驟二  根據訂單時間 和 店別 隨機取得一個 LineUser
      const getOneRandomSQL = `SELECT * FROM ${dbConfig.mappingTable} 
        WHERE create_time < date('${orderTime}') AND store_name='${storeName}'
        ORDER BY RAND() LIMIT 1`;

      const lineUser = await executeSQL(getOneRandomSQL);
      const timeConfig = genTimeConfig(orderTimeObj);
      // 步驟三 產生 coupon券
      const sql = await genCoupon(paytype, ...lineUser, timeConfig);

      // if(未使用){
      //   saveSQL.push(sql);
      // }

      saveSQL.push(sql);
    }

    await saveFile("new_coupon_usage.sql", saveSQL.join("\n"));
    console.log("完成建立");
  } catch (error) {
    console.log(error);
  }
}

async function genCoupon(paytype, lineUser, timeConfig) {
  const coupon_id = 2;
  const { line_id, store_id } = lineUser;
  const { used_at, taken_at, expired_at } = timeConfig;
  const taken_id = genTakenId([8, 4, 4, 4, 12]);
  const createSQL = `INSERT INTO ${dbConfig.genCouponTable} 
  (coupon_id, store_id, user_id, taken_at, used_at, taken_id, expired_at, paytype)
  VALUES (${coupon_id}, ${store_id}, '${line_id}', '${taken_at}', '${used_at}', '${taken_id}', '${expired_at}', ${paytype});`;
  return createSQL;
}

function getCouponConfig(orderLen, couponUseRate) {
  const notUseRate = 100 - couponUseRate;
  const calculator = (len, rate) => Math.floor((len * rate) / 100);
  return {
    notUseAmount: calculator(orderLen, notUseRate),
    usedAmount: calculator(orderLen, couponUseRate),
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

  return {
    taken_at: dateToString(date),
    used_at: dateToString(dateObj),
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
