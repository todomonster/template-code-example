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
// 產生一組數字array [] 原本用來產生電子帳單瓦斯數量
// function genRandomGas(
//   min = 1,
//   max = 5,
//   people = 1400,
//   totalCoupon = 4648,
//   limitMaxRate = 0.2
// ) {
//   const arr = [];
//   let counter = 0;
//   let maxCounter = 0;
//   const hasMaxAmountPeople = Math.floor(people * limitMaxRate);
//   for (let i = 0; i < totalCoupon; i++) {
//     if (counter >= totalCoupon) break;
//     const random = Math.floor(Math.random() * people);
//     if (arr[random] >= max) {
//       i--;
//       continue;
//     }
//     // 加次數
//     if (arr[random] || arr[random] === 0) {
//       arr[random] += 1;
//       if (arr[random] === max) {
//         maxCounter++;
//         // 若超過限制比例的話跳過
//         if (maxCounter > hasMaxAmountPeople) {
//           arr[random] -= 1;
//           i--;
//           maxCounter--;
//           continue;
//         }
//       }
//       counter++;
//     } else {
//       arr[random] = min;
//       counter += min;
//     }
//   }
//   const log = [];
//   for (let i = min; i < max + 1; i++) {
//     log.push(i);
//   }
//   console.log("迴圈包含:", log, maxCounter);
//   console.log(arr);
//   return arr;
// }
// const arr = genRandomGas();
// console.log('排序後',arr.sort());
