// todo:
// 清空 uid
// 修改花蓮地區店家
// 加入order_id
// 備份

// 1.自己產生新的表

const { executeSQL } = require("./db");
const { isValidDate } = require("../server/helper/date-parser");
// (['2022-04-01','2022-05-01'],0.61)

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

async function 依照設定檔的條件以中鼎訂單生成Coupon券(
  tableName,
  [start, end],
  useCouponRate
) {
  // 步驟一 依照時間 GET 訂單，訂單已經分成 行動支付和現金 並且確定比例了
  const getOrdersSQL = `SELECT * FROM ${tableName} WHERE ${dbConfig.orderTimeColumn} > date('${start} 00:00:00') AND ${dbConfig.orderTimeColumn} < date('${end} 00:00:00')`;
  const data = await executeSQL(getOrdersSQL);
  const dataLength = data.length;
  data.forEach(async (element) => {
    // 內埔廣濟店
    const storeName = element[dbConfig.storeName];
    const orderTime = yyyy_mm_dd(element[dbConfig.orderTimeColumn]);

    const oneRandomSQL = `SELECT * FROM ${dbConfig.mappingTable} 
    WHERE ${dbConfig.createTime} < date('${orderTime} 00:00:00') AND ${dbConfig.storeName}=${storeName} 
    ORDER BY RAND() LIMIT 1`;

    const lineUser = await executeSQL(oneRandomSQL);
    const {lineId,storId} = lineUser
    genCoupon(lineId);
  });
}

function genCoupon() {}
