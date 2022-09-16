// 這支程式負責 修改補足gas數量
const { executeSQL } = require("../db");

// old 
// 這支程式負責 在已經產生好的coupon加入scgas標籤方便區分 是否是電子帳單的獲得的5張coupon
// 直接修改DB:true
// 產生檔案:false
const sqls = {
  cash: {
    6: `SELECT id  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-06' AND paytype=1 AND store_id>0 ORDER BY RAND() LIMIT 1464;`,
    7: `SELECT id  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-07' AND paytype=1 AND store_id>0 ORDER BY RAND() LIMIT 1860;`,
    8: `SELECT id  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-08' AND paytype=1 AND store_id>0 ORDER BY RAND() LIMIT 847;`,
  },
  mobile: {
    6: `SELECT id  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-06' AND paytype=2 AND store_id>0 ORDER BY RAND() LIMIT 976;`,
    7: `SELECT id  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-07' AND paytype=2 AND store_id>0 ORDER BY RAND() LIMIT 1240;`,
    8: `SELECT id  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-08' AND paytype=2 AND store_id>0 ORDER BY RAND() LIMIT 564;`,
  },
  not_used: {
    6: `SELECT id FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-06' AND store_id=0 AND ref_by_user IS NULL ORDER BY RAND() LIMIT 465;`,
    7: `SELECT id FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-07' AND store_id=0 AND ref_by_user IS NULL ORDER BY RAND() LIMIT 635;`,
    8: `SELECT id FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-08' AND store_id=0 AND ref_by_user IS NULL ORDER BY RAND() LIMIT 249;`,
  },
};

// const config = "6";
// const config = "7";
const config = "8";
main(config);

async function main(config) {
  try {
    console.log(`開始cash=====`, new Date());
    const cash = await executeSQL(sqls["cash"][config]);
    await loop(cash, "cash");

    console.log(`開始mobile=====`, new Date());
    const mobile = await executeSQL(sqls["mobile"][config]);
    await loop(mobile, "mobile");

    console.log(`開始not_used=====`, new Date());
    const not_used = await executeSQL(sqls["not_used"][config]);
    await loop(not_used, "not_used");
  } catch (error) {
    console.log(error);
    return;
  }
}

async function loop(data, name) {
  for (let i = 0, len = data.length; i < len; i++) {
    const item = data[i];
    await update(item);
  }
  console.log(`完成${name}=====`, new Date());
}

async function update(data) {
  try {
    const { id } = data;
    await executeSQL(
      `UPDATE coupon_coupon_usages SET ref_by_user='scgas' WHERE (id=${id}) LIMIT 1`
    );
    // console.log(id);
  } catch (error) {
    console.log(error);
    return;
  }
}
//=============================

