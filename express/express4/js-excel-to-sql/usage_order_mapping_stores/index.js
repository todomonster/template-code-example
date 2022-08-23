// 1.自己產生新的表
// 2. mapping function

const { executeSQL } = require("./db");

const dbConfig = {
  userTable: "vcarduser",
  genCouponTable: "coupon_coupon_usages",
  mappingTable: "user_combine_store",
  createTime: "createTime",
  storeName: "店別",
  orderTimeColumn: "結帳時間",
};

function yyyy_mm_dd_utc(dateObj, mode = "datetime") {
  let ans = "";
  if ((mode = "datetime")) {
    ans = addHours(8, dateObj)
      .toLocaleString("zh-TW", { timeZone: "UTC" })
      .replace("上午", "")
      .replace("下午", "");
  }
  console.log(ans);
  return ans;
}

function addHours(numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  return date;
}

function randomDigit() {
  return Math.floor(Math.random() * Math.floor(2));
}

function generateRandomBinary(binaryLength) {
  let binary = "";
  for (let i = 0; i < binaryLength; ++i) {
    binary += randomDigit();
  }
  return binary;
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
依照設定檔的條件以中鼎訂單生成Coupon券(
  "mobile_official",
  ["2022-04-01", "2022-05-01"],
  0.61,
  2
);
// (tableName,['2022-04-01','2022-05-01'],0.61,10)
async function 依照設定檔的條件以中鼎訂單生成Coupon券(
  tableName,
  [start, end],
  useCouponRate,
  limit = 50000
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

    for (let i = 0, len = data.length; i < len; i++) {
      if (i > limit - 1) {
        break;
      }
      const order = data[i];

      const storeName = order[dbConfig.storeName];
      const orderTime = yyyy_mm_dd_utc(
        order[dbConfig.orderTimeColumn],
        "datetime"
      ); //UTC+0 要改+8

      // 步驟二  根據訂單時間 和 店別 隨機取得一個 LineUser
      const getOneRandomSQL = `SELECT * FROM ${dbConfig.mappingTable} 
        WHERE create_time < date('${orderTime}') AND store_name='${storeName}'
        ORDER BY RAND() LIMIT 1`;

      const lineUser = await executeSQL(getOneRandomSQL);
      const timeConfig = genTimeConfig(date);
      // 步驟三 產生 coupon券
      await genCoupon(paytype, ...lineUser, timeConfig, useCouponRate);
    }
  } catch (error) {
    console.log(error);
  }
}

function genTimeConfig(date) {
  //亂數減少 小時
  const randomHour = Math.floor(Math.random() * 2);
  const randomMin = Math.floor(Math.random() * 60);
  const randomSec = Math.floor(Math.random() * 60);
  const rand = date.setTime(
    date.getTime() -
      randomHour * 60 * 60 * 1000 -
      randomMin * 60 * 1000 -
      randomSec * 1000
  );
  return {
    taken_at: yyyy_mm_dd_utc(rand, "datetime"),
    used_at: yyyy_mm_dd_utc(date, "datetime"),
    expired_at: yyyy_mm_dd_utc(addHours(24, date), "datetime"),
  };
}

async function genCoupon(paytype, lineUser, timeConfig, useCouponRate) {
  const coupon_id = 2;
  const { line_id, store_id } = lineUser;
  const { used_at, taken_at, expired_at } = timeConfig;

  // get
  const taken_id = genTakenId([8, 4, 4, 4, 12]);
  //
  const createSQL = `INSERT INTO ${dbConfig.genCouponTable} 
  (coupon_id, store_id, user_id, taken_at, used_at, taken_id, expired_at, paytype)
  VALUES (${coupon_id}, ${store_id}, '${line_id}', '${taken_at}', '${used_at}', '${taken_id}', '${expired_at}', ${paytype});`;
  // await executeSQL(createSQL);
  console.log(createSQL);
}
/** 
  {
coupon_id =2
store_id	=3...
user_id =Uafa2aa54e4f010629f3808ae82d4a948
taken_at	
used_at	
taken_id
expired_at
paytype =1 =2
  },
  */
