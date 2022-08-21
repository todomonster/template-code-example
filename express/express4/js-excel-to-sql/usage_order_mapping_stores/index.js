// todo:
// 清空 uid
// 修改花蓮地區店家
// 加入order_id
// 備份


//由上到下做對應
// 引用 JSON data
let coupon_coupon_usages = ""; // as u
let _official = ""; //as order

const { 操作訂單資料, 操作優惠券資料 } = require("./insertData");
const { 取得訂單資料, 取得優惠券資料 } = require("./selectData");

async function main() {
  let [sqlA, sqlB] = ["", ""];
  // 取資料
  coupon_coupon_usages = await 取得訂單資料(sqlA);
  _official = await 取得優惠券資料(sqlB);
  配對訂單();
  // 其實不適合存檔 因為迴圈跑太多次了
  // 直接跑迴圈修改DB?
  // 不行 要直接操作否則永遠配對第一筆
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

      await 操作優惠券資料();
      return u[j]["id"];
    }
  }
}

module.exports = { main };

//log模組 改order_id uid
// 時間模組 亂數秒數後配對 taken_at used_at expired_at
// 改stored_id 模組
