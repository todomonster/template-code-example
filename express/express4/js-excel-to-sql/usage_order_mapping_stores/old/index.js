const { executeSQL } = require("../db");
const { generateRandomBinary } = require("../../server/helper/digit-helper");
const {
  dateToString,
  addHours,
  getTomorrowMidnight,
} = require("../../server/helper/date-parser");
const { saveFile } = require("../../server/helper/save-file");

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
  // const table = ["mobile_official"];
  const table = ["cash_official"];
  const date = [
    // { period: ["2022-04-01", "2022-05-01"], rate: 84 },
    // { period: ["2022-05-01", "2022-06-01"], rate: 83 },
    // { period: ["2022-06-01", "2022-07-01"], rate: 82 },
    // { period: ["2022-07-01", "2022-08-01"], rate: 84 },
    { period: ["2022-08-01", "2022-09-01"], rate: 85 },
  ];
  table.forEach((table) => {
    date.forEach(async ({ period, rate }) => {
      await 依照設定檔的條件以中鼎訂單生成Coupon券(table, period, {
        usedCouponRate: rate,
      });
    });
  });
}

// Example:
// 依照設定檔的條件以中鼎訂單生成Coupon券(
//   "mobile_official",
//   ["2022-04-01", "2022-05-01"],
//   { usedCouponRate: 50, limit: 5 }
// );

// 依照設定檔的條件以中鼎訂單生成Coupon券(
//   "mobile_official",
//   ["2022-05-01", "2022-06-01"],
//   { usedCouponRate: 50, limit: 5 }
// );

async function 依照設定檔的條件以中鼎訂單生成Coupon券(
  tableName,
  [start, end],
  {
    //產生使用券的機率百分比
    usedCouponRate = 100,
    //產生多少張 以使用的 coupon
    limit = 56000,
  }
) {
  // 步驟一 依照時間 GET 訂單，訂單已經分成 行動支付和現金 並且確定比例了
  const failLog = [];
  try {
    const getOrdersSQL = `SELECT * FROM ${tableName} WHERE ${dbConfig.orderTimeColumn} > date('${start} 00:00:00') AND ${dbConfig.orderTimeColumn} < date('${end} 00:00:00')`;
    console.log(getOrdersSQL);
    let paytype = 2;
    if (tableName.indexOf("cash") > -1) {
      paytype = 1;
    }
    // 取得訂單s
    const data = await executeSQL(getOrdersSQL);

    const ordersLength = data.length;
    const couponConfig = getCouponConfig(ordersLength, usedCouponRate);
    const { usedAmount, notUseAmount } = couponConfig;

    let notUsedLimit =
      usedAmount === 0 ? limit : (limit * notUseAmount) / usedAmount - 1;
    console.log("開始執行:\n", couponConfig, "notUsedLimit:\n", notUsedLimit);

    let saveSQL = [];
    for (let i = 0; i < usedAmount; i++) {
      if (i % 1000 === 0) console.log("已執行", i);
      if (i > limit - 1 || usedCouponRate === 0) {
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
        failLog.push(getOneRandomSQL);
        notUsedLimit++;
        continue;
      }
      const timeConfig = genTimeConfig(orderTimeObj);
      // 步驟三 產生 coupon券
      const sql = await genCoupon(paytype, ...lineUser, timeConfig);
      saveSQL.push(sql);
    }
    console.log("完成 已使用 coupon 建立");
    for (let i = 0; i < notUseAmount; i++) {
      if (i % 1000 === 0) console.log("已執行", i);
      if (i > notUsedLimit - 1) {
        break;
      }
      let random = Math.floor(Math.random() * notUseAmount);
      const order = data[random];
      const storeName = order[dbConfig.storeName];
      const orderTimeObj = order[dbConfig.orderTimeColumn];
      const orderTime = dateToString(addHours(8, orderTimeObj));
      const getOneRandomSQL = `SELECT * FROM ${dbConfig.mappingTable} 
    WHERE create_time < date('${orderTime}') AND store_name='${storeName}'
    ORDER BY RAND() LIMIT 1`;
      const lineUser = await executeSQL(getOneRandomSQL);
      if (lineUser.length === 0) {
        continue;
      }
      const timeConfig = genTimeConfig(orderTimeObj);

      const sql = await genCoupon(paytype, ...lineUser, timeConfig, "notUsed");
      saveSQL.push(sql);
    }
    console.log("完成 未使用 coupon 建立");
    saveSQL = saveSQL.sort(() => (Math.random() > 0.5 ? -1 : 1));

    await saveFile(
      `${tableName}_coupon_usage_${start}_${end}.sql`,
      saveSQL.join("\n")
    );
    await saveFile(
      `${tableName}_not_find_user_${start}_${end}.sql`,
      failLog.join("\n")
    );
    console.log(`完成${tableName}建立`);
    console.log("執行設定: \n", couponConfig, "完成時間", new Date());
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
    used_at = "2022/4/2 13:10:00",
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
  if (couponUseRate === 0) {
    return {
      usedPercent: couponUseRate,
      notUsePercent: notUseRate,
      usedAmount: 0,
      notUseAmount: orderLen,
      totalAmount: orderLen,
    };
  }
  const calculator = (len, rate) => {
    return Math.floor((orderLen * 100) / couponUseRate);
  };
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
  // const randomHour = genRandNum(1);
  const randomMin = genRandNum(60);
  const randomSec = genRandNum(60);
  // 設定取得時間 為 亂數時間
  const date = new Date(dateObj);
  date.setTime(date.getTime() - randomMin * 60 * 1000 - randomSec * 1000);
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
    let hex = parseInt(generateRandomBinary(binaryLength * 4), 2);
    // ans.push(hex.toString(16));
    hex = hex.toString(16);
    // 不足位數要補0
    ans.push(hex.padStart(binaryLength, '0'));
  });
  return ans.join("-");
}
// ================================
async function genRandomUsed(
  tableName,
  [start, end],
  {
    //產生使用券的機率百分比
    usedCouponRate = 100,
    //產生多少張 以使用的 coupon
    limit = 56000,
  }
) {
  // 步驟一 依照時間 GET 訂單，訂單已經分成 行動支付和現金 並且確定比例了
  const failLog = [];
  try {
    const getOrdersSQL = `SELECT * FROM ${tableName} WHERE ${dbConfig.orderTimeColumn} > date('${start} 00:00:00') AND ${dbConfig.orderTimeColumn} < date('${end} 00:00:00')`;
    console.log(getOrdersSQL);
    let paytype = 2;
    if (tableName.indexOf("cash") > -1) {
      paytype = 1;
    }
    // 取得訂單s
    const data = await executeSQL(getOrdersSQL);
    let saveSQL = [];
    for (let i = 0; i < limit; i++) {
      if (i % 1000 === 0) console.log("已執行", i);
      const createRandom = (min, max) => {
        return min + Math.round(Math.random() * (max - min));
      };

      let random = createRandom(12000, 22000);
      const order = data[random];
      if (!order) {
        continue;
      }
      const storeName = order[dbConfig.storeName];
      const orderTimeObj = order[dbConfig.orderTimeColumn];
      const orderTime = dateToString(addHours(8, orderTimeObj));
      // 步驟二  根據訂單時間 和 店別 隨機取得一個 LineUser
      const getOneRandomSQL = `SELECT * FROM ${dbConfig.mappingTable} 
        WHERE create_time < date('${orderTime}') AND store_name='${storeName}'
        ORDER BY RAND() LIMIT 1`;

      let lineUser = await executeSQL(getOneRandomSQL);
      if (lineUser.length === 0) {
        failLog.push(getOneRandomSQL);
        continue;
      }
      const timeConfig = genTimeConfig2(orderTimeObj);
      function genTimeConfig2(dateObj) {
        //亂數減少 小時
        const genRandNum = (num) => Math.floor(Math.random() * num);
        const randomMin = genRandNum(40);
        const randomSec = genRandNum(60);
        // 設定取得時間 為 亂數時間
        const date = new Date(dateObj);
        date.setTime(date.getTime() - randomMin * 60 * 1000 - randomSec * 1000);
        const date2 = new Date(date);
        date2.setTime(
          date2.getTime() - randomMin * 60 * 1000 - randomSec * 1000
        );
        return {
          taken_at: dateToString(date2),
          used_at: dateToString(date),
          expired_at: getTomorrowMidnight(date), //日期+一天後 取前面就好 +00:00:00
        };
      }
      // 步驟三 產生 coupon券
      const sql = await genCoupon(paytype, ...lineUser, timeConfig);
      saveSQL.push(sql);
    }

    await saveFile(
      `${tableName}_coupon_usage_${start}_${end}.sql`,
      saveSQL.join("\n")
    );
    await saveFile(
      `_${start}_${end}_${saveSQL.length}_${tableName}.txt`,
      `${saveSQL.length}`
    );
    console.log(`完成${tableName}建立`);
    console.log("完成時間", new Date());
  } catch (error) {
    console.log(error);
  }
}
function main2() {
  const table = [
    "mobile_official",
    // "cash_official"
  ];
  const date = [
    // { period: ["2022-04-01", "2022-05-01"], rate: 100, limit: 227*1.1 },
    // { period: ["2022-05-01", "2022-06-01"], rate: 100, limit: 412*1.1 },
    // { period: ["2022-06-01", "2022-07-01"], rate: 100, limit: 407*1.1 },
    // { period: ["2022-07-01", "2022-08-01"], rate: 100, limit: 10},
    // { period: ["2022-08-01", "2022-09-01"], rate: 100, limit: 120 },
    { period: ["2022-06-01", "2022-07-01"], rate: 100, limit: 10 },

  ];

  table.forEach((table) => {
    date.forEach(async ({ period, rate, limit }) => {
      await genRandomUsed(table, period, {
        usedCouponRate: rate,
        limit,
      });
    });
  });
}
main2();
