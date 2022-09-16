const { executeSQL } = require("./db");
const { generateRandomBinary } = require("../server/helper/digit-helper");
const {
  dateToString,
  addHours,
  getTomorrowMidnight,
} = require("../server/helper/date-parser");
const { saveFile } = require("../server/helper/save-file");

const dbConfig = {
  onlineOrder: "online_orders",
  userTable: "vcarduser",
  genCouponTable: "coupon_coupon_usages",
  mappingTable: "user_combine_store",
  createTime: "createTime",
  storeName: "店別",
  orderTimeColumn: "結帳時間",
  orderPrice: "款項金額",
};

main();
function main() {
  let table = [
    // "mobile",
    // "cash",
    "cash_official"
  ];
  const date = [
    // { period: ["2022-05-01", "2022-06-01"], rate: 100,  limit: 462,randLimit: 6007 },
    // { period: ["2022-06-01", "2022-07-01"], rate: 100,  limit: 832,randLimit: 5932 },
    // { period: ["2022-07-01", "2022-08-01"], rate: 100,  limit: 999,randLimit: 8182 },
    // { period: ["2022-08-01", "2022-09-01"], rate: 100, limit: 504,randLimit: 2572 }, 
    { period: ["2022-04-01", "2022-05-01"], rate: 100, limit: 4024,randLimit: 50735 }, 

    // {
    //   period: ["2022-05-01", "2022-06-01"],
    //   rate: 100,
    //   limit: 938,
    //   randLimit: 45034,
    // },
    // {
    //   period: ["2022-06-01", "2022-07-01"],
    //   rate: 100,
    //   limit: 1301,
    //   randLimit: 49161,
    // },
    // {
    //   period: ["2022-07-01", "2022-08-01"],
    //   rate: 100,
    //   limit: 1701,
    //   randLimit: 51274,
    // },
    // {
    //   period: ["2022-08-01", "2022-09-01"],
    //   rate: 100,
    //   limit: 895,
    //   randLimit: 20006,
    // }, 
  ];

  table.forEach(async (table) => {
    for (let i = 0, len = date.length; i < len; i++) {
      const item = date[i];
      const { period, rate, limit, randLimit } = item;
      await genRandomUsed(table, period, {
        usedCouponRate: rate,
        limit: limit,
        randLimit: randLimit,
      });
    }
  });
}

async function genCoupon(paytype, lineUser, timeConfig, notUsed) {
  const coupon_id = 2;
  const { line_id, store_id } = lineUser;
  const { taken_at, used_at, expired_at } = timeConfig;
  const taken_id = genTakenId([8, 4, 4, 4, 12]);
  let createSQL = `INSERT INTO ${dbConfig.genCouponTable} 
  (coupon_id, store_id, user_id, taken_at, used_at, taken_id, expired_at, paytype)
  VALUES (${coupon_id}, ${store_id}, '${line_id}', '${taken_at}', '${used_at}', '${taken_id}', '${expired_at}', ${paytype});`;

  if (notUsed === "notUsed") {
    createSQL = `INSERT INTO ${dbConfig.genCouponTable} 
  (coupon_id, store_id, user_id, taken_at, taken_id, paytype, ref_by_user)
  VALUES (${coupon_id}, 0, '${line_id}', '${taken_at}', '${taken_id}', ${paytype}, 'online');`;
  }

  return { sql: createSQL, taken_id, line_id, store_id, taken_at };
}

async function genCoupon2(paytype, lineUser, timeConfig, notUsed) {
  const coupon_id = 2;
  const { line_id, store_id = 23 } =
    lineUser;
  const {
    taken_at,
    used_at,
    expired_at
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

async function addOrders(config) {
  try {
    let {
      line_id,
      coupon_id,
      store_id,
      store_name,
      pay_type,
      create_at,
      order_price,
      order_amount,
      order_detail,
    } = config;
    if (order_price < 301) {
      order_price += 200;
    }
    const sql = `INSERT INTO ${dbConfig.onlineOrder} (line_id, coupon_id, store_id, store_name, pay_type, create_at, order_price, order_amount, order_detail)
  VALUES ('${line_id}', '${coupon_id}', ${store_id}, '${store_name}', ${pay_type}, '${create_at}', ${order_price}, ${order_amount}, '${order_detail}' );`;
    return await executeSQL(sql);
  } catch (error) {
    console.log(error);
    // INSERT INTO `online_orders` (`id`, `line_id`, `store_id`, `store_name`, `order_price`, `create_at`, `order_amount`, `order_detail`, `coupon_id`, `pay_type`) VALUES ('1', 'aa', '1', 'aa', '1', '2022-08-25 17:34:57.000000', '1', '{}', 'aa', '1');
  }
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

async function genRandomUsed(
  tableName,
  [start, end],
  {
    //產生多少張 已使用的 coupon
    limit = 56000,
    randLimit,
  }
) {
  // 步驟一 依照時間 GET 訂單，訂單已經分成 行動支付和現金 並且確定比例了
  try {
    let getOrdersSQL = `SELECT * FROM ${tableName} WHERE ${dbConfig.orderTimeColumn} > date('${start} 00:00:00') AND ${dbConfig.orderTimeColumn} < date('${end} 00:00:00')`;
    // getOrdersSQL+=`AND (區域='台北' OR 區域='新北' OR 區域='桃園' OR 區域='台中' OR 區域='台南' OR 區域='高雄') AND 款項金額>99 AND 款項金額<801;`
    console.log(getOrdersSQL);
    let paytype = 2;

    if (tableName.indexOf("cash") > -1) {
      paytype = 1;
    }
    // 取得訂單s
    const data = await executeSQL(getOrdersSQL);
    let saveCouponSQL = [];

    let i = 0;
    while (i !== limit) {
      // for (let i = 0; i < limit; i++) {

      if (i % 500 === 0) console.log("已執行", i);
      if (i > 5000) {
        console.log("已執行 5000 次 強制中斷");
        break;
      }
      const createRandom = (min, max) => {
        return min + Math.round(Math.random() * (max - min));
      };

      let random = createRandom(1, randLimit);
      const order = data[random];
      if (!order) {
        continue;
      }
      const storeName = order[dbConfig.storeName];
      const orderPrice = order[dbConfig.orderPrice];

      const orderTimeObj = order[dbConfig.orderTimeColumn];
      const orderTime = dateToString(addHours(8, orderTimeObj));
      // 步驟二  根據訂單時間 和 店別 隨機取得一個 LineUser
      const getOneRandomSQL = `SELECT * FROM ${dbConfig.mappingTable} 
        WHERE create_time < date('${orderTime}') AND store_name='${storeName}'
        ORDER BY RAND() LIMIT 1`;

      let lineUser = await executeSQL(getOneRandomSQL);
      if (lineUser.length === 0) {
        continue;
      }
      const timeConfig = genTimeConfig(orderTimeObj);

      // 步驟三 產生 coupon券
      const sql = await genCoupon2(paytype, ...lineUser, timeConfig);
      saveCouponSQL.push(sql);
      // const { sql, taken_id, line_id, store_id, taken_at } = await genCoupon(
      //   paytype,
      //   ...lineUser,
      //   timeConfig,
      //   "notUsed"
      // );
      // saveCouponSQL.push(sql);

      // 步驟四 產生 線上點餐資料
      // const newConfig = {
      //   line_id: line_id,
      //   coupon_id: taken_id,
      //   store_id: store_id,
      //   store_name: storeName,
      //   pay_type: paytype,
      //   create_at: taken_at,
      //   order_price: orderPrice,
      //   order_amount: 0,
      //   order_detail: "{}",
      // };
      // await addOrders(newConfig);
      // }
      i++;
    }

    await saveFile(
      `${tableName}_coupon_usage_${start}_${end}.sql`,
      saveCouponSQL.join("\n")
    );
    await saveFile(
      `_${start}_${end}_${saveCouponSQL.length}_${tableName}.txt`,
      `${saveCouponSQL.length}`
    );
    console.log(`完成${tableName}建立`);
    console.log("完成時間", new Date());
  } catch (error) {
    console.log(error);
  }
}

function genTimeConfig(dateObj) {
  //亂數減少 小時
  const genRandNum = (num) => Math.floor(Math.random() * num);
  const randomMin = genRandNum(5);
  const randomSec = genRandNum(60);
  // 設定取得時間 為 亂數時間
  const date = new Date(dateObj);
  date.setTime(date.getTime() - randomMin * 60 * 1000 - randomSec * 1000);
  return {
    taken_at: dateToString(date),
    used_at: dateToString(dateObj),
    expired_at: getTomorrowMidnight(dateObj), //日期+一天後 取前面就好 +00:00:00
  };

  // return {
  //   taken_at: dateToString(dateObj),
  //   used_at: dateToString(dateObj),
  //   expired_at: getTomorrowMidnight(dateObj), //日期+一天後 取前面就好 +00:00:00
  // };
}
