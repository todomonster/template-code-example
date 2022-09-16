// 這支程式負責 修改補足gas數量
const { executeSQL } = require("./db");
const { saveFile } = require("../server/helper/save-file");

// setLimitUser(
//   [
//     { cash: 978, mobile: 652, notUsed: 311 },
//     { cash: 1243, mobile: 829, notUsed: 425 },
//     { cash: 566, mobile: 377, notUsed: 167 },
//   ],
//   ["06", "07", "08"]
// );
async function setLimitUser(config = [{}, {}, {}], month = ["06", "07", "08"]) {
  const userLog = { userCounter: 0 };
  for (let i = 0; i < month.length; i++) {
    let cashUserSql = `SELECT DISTINCT(user_id) FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-${month[i]}' AND store_id=0 AND used_at is NULL AND ref_by_user IS NULL`;
    let cashSql = `SELECT id, user_id  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-${month[i]}' AND paytype=1 AND store_id>0 
    ORDER BY RAND() LIMIT 1`;
    await getLoop(cashSql, config[i].cash, "cash", cashUserSql);

    let mobileUserSql = `SELECT  DISTINCT(user_id)  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-${month[i]}' AND paytype=2 AND store_id>0`;
    let mobileSql = `SELECT id, user_id  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-${month[i]}' AND paytype=2 AND store_id>0
    ORDER BY RAND() LIMIT 1`;
    await getLoop(mobileSql, config[i].mobile, "mobile", mobileUserSql);

    let notUsedUserSql = `SELECT DISTINCT(user_id) FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-${month[i]}' AND store_id=0 AND used_at is NULL AND ref_by_user IS NULL`;
    let notUsedSql = `SELECT id, user_id FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-${month[i]}' AND store_id=0 AND used_at is NULL AND ref_by_user IS NULL
    ORDER BY RAND() LIMIT 1`;
    await getLoop(notUsedSql, config[i].notUsed, "notUsed", notUsedUserSql);
  }
  //Save UserLog
  await saveFile(`UserLog.js`, JSON.stringify(userLog));
  async function getLoop(sql, limit, fileName, userSql) {
    try {
      let ans = [];
      let users = await executeSQL(userSql);
      users = users.map((x) => x.user_id);
      // loop
      for (let i = 0; i < limit; i++) {
        if (i % 100 === 0) console.log(i);
        let rand1 = Math.floor(Math.random() * users.length);
        let rand2 = Math.floor(Math.random() * users.length);
        let u1 = users[rand1];
        let u2 = users[rand2];
        let condition = `  AND (user_id='${u1}' OR user_id='${u2}') `;

        let newSql = sql.replace("\n", condition);
        // console.log(newSql)
        const data = await executeSQL(newSql);
        if (!data || data.length < 1) {
          i--;
          console.log(newSql, 999);
          continue;
        }
        const { id, user_id } = data[0];
        // 紀錄 LineID 來符合次數
        if (userLog[user_id]) {
          // 如果紀錄超過 5 的話放棄該次
          if (userLog[user_id] >= 5) {
            i--;
            continue;
          }
          userLog[user_id] += 1;
        } else {
          userLog[user_id] = 1;
          userLog.userCounter++;
          //   限制人數 1500
          if (userLog.userCounter >= 1500) {
            users = Object.keys(userLog);
          }
        }
        ans.push(id);
      }
      //save
      const timestamp = new Date().getTime();
      if (ans.length > 0) {
        await saveFile(`${fileName}_${timestamp}.js`, JSON.stringify(ans));
      }
      console.log(fileName, "ok", new Date());
      return ans;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
// ====================================================

const dataConfig = {
  // UPDATE coupon_coupon_usages SET ref_by_user=NULL WHERE ref_by_user='scgas';
  // SELECT * FROM `coupon_coupon_usages` WHERE ref_by_user='scgas';
  "06": {
    cash: "./cash_1662113507398.js",
    mobile: "./mobile_1662113837303.js",
    notUsed: "./notUsed_1662114000766.js",
  },
  "07": {
    cash: "./cash_1662114700204.js",
    mobile: "./mobile_1662115221887.js",
    notUsed: "./notUsed_1662115654224.js",
  },
  "08": {
    cash: "./cash_1662116154215.js",
    mobile: "./mobile_1662116648034.js",
    notUsed: "./notUsed_1662116998417.js",
  },
};
const settingMonth = "08";
const { cash } = require(dataConfig[settingMonth]["cash"]); //引用
const { mobile } = require(dataConfig[settingMonth]["mobile"]); //引用
const { not_used } = require(dataConfig[settingMonth]["notUsed"]); //引用
main(settingMonth);
async function main(config) {
  try {
    console.log(`開始cash=====`, new Date());
    await loop(cash, "cash");
    console.log(`開始mobile=====`, new Date());
    await loop(mobile, "mobile");
    console.log(`開始not_used=====`, new Date());
    await loop(not_used, "not_used");
    console.log(`ok===`);
    // console.log(cash);
    // console.log(mobile);
    // console.log(not_used);
  } catch (error) {
    console.log(error);
    return;
  }
}
async function loop(data, name) {
  for (let i = 0, len = data.length; i < len; i++) {
    if (i % 250 === 0) console.log(i);
    const id = data[i];
    const result = await update(id);
    if (!result) {
      console.log('失敗',id);
      break;
    }
  }
  console.log(`完成${name}=====`, new Date());
}
async function update(id) {
  try {
    await executeSQL(
      `UPDATE coupon_coupon_usages SET ref_by_user='scgas' WHERE (id=${id}) LIMIT 1`
    );
    return true;
    // console.log(id);
  } catch (error) {
    console.log(error);
    return false;
  }
}

// ====================================================
// const { a } = require("./gasData/a");
// const { b } = require("./gasData/b");
// async function insertGasDegree(data) {
//   for (let i = 0, len = data.length; i < len; i++) {
//     if (i % 500 === 0) console.log(i);
//     const item = data[i];
//     let { userLineId, userName, year, month, degree } = item;
//     userName = userName[0] + "*" + userName[2];
//     const sql = `INSERT INTO gas_degree_log_v2 (userLineId, userName, year, month, degree)
//      VALUES ('${userLineId}', '${userName}', ${year}, ${month}, ${degree})`;

//     await executeSQL(sql);
//   }
//   console.log("ok", new Date());
// }
// insertGasDegree(b);
// insertGasDegree(a);
