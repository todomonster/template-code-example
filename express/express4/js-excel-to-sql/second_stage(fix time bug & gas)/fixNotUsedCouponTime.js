const { executeSQL } = require("./db");
const { dateToString, addHours } = require("../server/helper/date-parser");

// 這支程式負責把 之前他們產生的4月5月coupon刪除，接著把多的4月coupon分別轉到6,7,8月，不能重複使用
//要先下刪除SQL
// 直接修改DB:true
// 產生檔案:false

/**
DELETE  FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-04' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 19303;
DELETE  FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-05' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 31764;
 */
const sqls = {
  6: `SELECT *  FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-04' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 3780;`,
  7: `SELECT *  FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-04' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 2549;`,
  8: `SELECT *  FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-04' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 2597;`,
};
const days = {
  6: 30,
  7: 31,
  8: 31,
};

const config = "6";
main(config);

async function main(config) {
  try {
    const setMonth = Number(config);
    
    const sql = sqls[config];
    const day = days[config];
    const coupon_usages = await executeSQL(sql);
    for (let i = 0, len = coupon_usages.length; i < len; i++) {
      if (i % 250 === 0) console.log(i);
      const item = coupon_usages[i];
      const setDate = (i % day) + 1;

      let { id, taken_at, used_at, expired_at } = item;
      if (!taken_at) {
        continue;
      }
      const newData = timeFix({ id, taken_at, used_at, expired_at }, setDate,setMonth);
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
function timeFix({ id, taken_at, used_at, expired_at }, setDate,setMonth) {
  // 0~11 set 7月 setMonth(6)
  taken_at.setMonth(setMonth - 1);
  expired_at.setMonth(setMonth - 1);
  //
  taken_at.setDate(setDate);
  expired_at.setDate(setDate + 1);
  //

  taken_at = toTaiwanTime(taken_at);
  expired_at = toTaiwanTime(expired_at);

  return {
    id,
    taken_at: dateToString(taken_at),
    expired_at: dateToString(expired_at),
  };
}

async function update(data) {
  try {
    const { id, taken_at, expired_at } = data;
    await executeSQL(`UPDATE coupon_coupon_usages SET taken_at='${taken_at}', expired_at='${expired_at}'
         WHERE (id=${id}) LIMIT 1`);
  } catch (error) {
    console.log(error);
  }
}
