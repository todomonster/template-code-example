//由上到下做對應
// 引用 JSON data
let coupon_coupon_usages = ""; // as u
let _official = ""; //as order

const { 操作訂單資料, 操作優惠券資料 } = require("./insertData");
const { 取得訂單資料, 取得優惠券資料 } = require("./selectData");

async function main() {
  let [sqlA, sqlB] = ["", ""];
  await 取資料(sqlA, sqlB);
  配對訂單();
  // 其實不適合存檔 因為迴圈跑太多次了
  // 直接跑迴圈修改DB?
  // 不行 要直接操作否則永遠配對第一筆
}

async function 取資料(sqlA, sqlB) {
  coupon_coupon_usages = await 取得訂單資料(sqlA);
  _official = await 取得優惠券資料(sqlB);
}

async function 配對訂單() {
  const order = _official;
  for (let i = 0; i < order.length; i++) {
    //沒有配對到uid才做下去
    if (!order[i]["uid"]) {
      // 回傳第一筆配對到的id
      const uid = 配對優惠券使用(order[i]);
      order[i] = 修改訂單({ uid }, order[i]);
      await 操作訂單資料();
    }
  }
}

function 修改訂單(config, item) {
  const { uid } = config;
  // 加入配對 id
  item["uid"] = uid;
  return item;
}

async function 配對優惠券使用(order_item) {
  const { 結帳時間, id } = order_item;
  const u = coupon_coupon_usages;
  for (let j = 0; j < u.length; j++) {
    //沒有配對到order_id才做下去
    if (!u[j]["order_id"]) {
      // taken_at(亂數)
      // used_at(亂數)
      await 操作優惠券資料();
      return u[j]["id"];
    }
  }
}

module.exports = { main };
// 限制很多 JSON長度不會超過1000
// 將資料存起來變成檔案
// 4月 5月
// SQL
// 找到該ID 做修改
