const { executeSQL } = require("./db");
const { dateToString, addHours } = require("../server/helper/date-parser");

const sqls = {
  4: `SELECT *  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-04' AND paytype=1 AND store_id>0;`,
  5: `SELECT *  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-05' AND paytype=1 AND store_id>0;`,
  6: `SELECT *  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-06' AND paytype=1 AND store_id>0`,
  7: `SELECT *  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-07' AND paytype=1 AND store_id>0`,
};
const days = {
  4: 30,
  5: 31,
  6: 30,
  7: 31,
};

const config = "4";
main(config);

async function main(config) {
  try {
    const sql = sqls[config];
    const day = days[config];
    const coupon_usages = await executeSQL(sql);
    for (let i = 0, len = coupon_usages.length; i < len; i++) {
      if (i % 1000 === 0) console.log(i);
      const item = coupon_usages[i];
      const setDate = (i % day) + 1;

      let { id, taken_at, used_at, expired_at } = item;
      if (!taken_at) {
        continue;
      }
      const newData = timeFix({ id, taken_at, used_at, expired_at }, setDate);
      await update(newData);
    }
    console.log("完成=====", new Date());
  } catch (error) {
    console.log(error);
  }
}
function toTaiwanTime(at) {
  return addHours(8, at);
}
function timeFix({ id, taken_at, used_at, expired_at }, setDate) {
  //目標是改日期就好 不要改時間
  // 目標是2 要變成3
  taken_at.setDate(setDate);
  used_at.setDate(setDate);
  expired_at.setDate(setDate + 1);

  taken_at = toTaiwanTime(taken_at);
  used_at = toTaiwanTime(used_at);
  expired_at = toTaiwanTime(expired_at);

  return {
    id,
    taken_at: dateToString(taken_at),
    used_at: dateToString(used_at),
    expired_at: dateToString(expired_at),
  };
}

async function update(data) {
  try {
    const { id, taken_at, used_at, expired_at } = data;
    await executeSQL(`UPDATE coupon_coupon_usages SET taken_at='${taken_at}', used_at='${used_at}', expired_at='${expired_at}'
         WHERE (id=${id}) LIMIT 1`);
  } catch (error) {
    console.log(error);
  }
}
