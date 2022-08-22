// 1.自己產生新的表
// 2. mapping function

const { executeSQL } = require("./db");

const dbConfig = {
  userTable: "vcarduser",
  mappingTable: "store_map_vcarduser",
  createTime: "createTime",
  storeName: "店別",
  orderTimeColumn: "結帳時間",
};

function yyyy_mm_dd(dateObj) {
  return date.toISOString().slice(0, 10);
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
    const hex = parseInt(generateRandomBinary(binaryLength * 4) , 2);
    ans.push(hex.toString(16));
  });
  return ans.join('-');
}

// (tableName,['2022-04-01','2022-05-01'],0.61,10)
async function 依照設定檔的條件以中鼎訂單生成Coupon券(
  tableName,
  [start, end],
  useCouponRate,
  limit = 50000
) {
  // 步驟一 依照時間 GET 訂單，訂單已經分成 行動支付和現金 並且確定比例了
  const getOrdersSQL = `SELECT * FROM ${tableName} WHERE ${dbConfig.orderTimeColumn} > date('${start} 00:00:00') AND ${dbConfig.orderTimeColumn} < date('${end} 00:00:00')`;
  let paytype = 2;
  if (tableName.indecOf("cash") > -1) {
    paytype = 1;
  }
  const data = await executeSQL(getOrdersSQL);

  for (let i = 0, len = data.length; i < len; i++) {
    if (i > limit - 1) {
      break;
    }
    const order = data[i];
    // 內埔廣濟店
    const storeName = order[dbConfig.storeName];
    const orderTime = yyyy_mm_dd(order[dbConfig.orderTimeColumn]);

    const getOneRandomSQL = `SELECT * FROM ${dbConfig.mappingTable} 
        WHERE create_time < date('${orderTime} 00:00:00') AND store_name=${storeName} 
        ORDER BY RAND() LIMIT 1`;

    const lineUser = await executeSQL(getOneRandomSQL);

    await genCoupon(paytype, lineUser, order, useCouponRate);
  }
}

async function genCoupon(paytype, lineUser, order, useCouponRate) {
  const coupon_id = 2;
  const { user_id, store_id } = lineUser;
  const used_at = order.結帳時間;
  const taken_at = used_at - 1;
  const expired_at = used_at + 1;
  // get
  const taken_id = genTakenId([8, 4, 4, 4, 12]);
  //
  const createSQL = `INSERT INTO coupon_coupon_usages 
  (coupon_id, store_id, user_id, taken_at, used_at, taken_id, expired_at, paytype)
  VALUES (${coupon_id}, ${store_id}, '${user_id}', '${taken_at}', '${used_at}', '${taken_id}', '${expired_at}', ${paytype});`;
  await executeSQL(createSQL);
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
