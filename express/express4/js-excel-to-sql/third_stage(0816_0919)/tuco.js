const { saveFile } = require("../server/helper/save-file");
const {
  genRandomDate,
  dateToString,
  addHours,
} = require("../server/helper/date-parser");

const { executeSQL } = require("./db");
const fs = require("fs");
let big = JSON.parse(fs.readFileSync("./LineUserData/big.json"));
let mid = JSON.parse(fs.readFileSync("./LineUserData/mid.json"));
let small = JSON.parse(fs.readFileSync("./LineUserData/small.json"));

const fakeData = {
  more: mid,
  less: [...big, ...small],
};
// const fakeData = {
//   more: ["a", "b", "c", "d", "e", "f", "g", "h"],
//   less: ["i", "j", "k", "l"],
// };

function createRandomNum(max) {
  return Math.floor(Math.random() * max);
}

function draw(peopleObj) {
  const { more, less } = peopleObj;

  const randomNum = createRandomNum(10); //0~9

  if (randomNum > 1) {
    // 2~9 = 80%
    return hyo(more, more.length);
  } else {
    // 0,1 = 20%
    return hyo(less, less.length);
  }

  function hyo(arr) {
    const index = createRandomNum(arr.length);
    return arr[index];
  }
}

async function user連接storeId(data) {
  try {
    const genPayType = (index) => (index % 2 === 1 ? 1 : 2);
    const { more, less } = data;

    // await loop(more);
    await loop(less);

    async function loop(arrayData) {
      const ans = [];
      const len = arrayData.length;
      console.log(len);
      for (let i = 0; i < len; i++) {
        let item = arrayData[i];
        if (i % 100 === 0) console.log(i);
        const vcarduser = await executeSQL(
          `SELECT * FROM user_combine_store WHERE line_id = '${item.lineId}';`
        );
        item = {
          ...item,
          ...vcarduser[0],
          paytype: genPayType(i),
        };
        delete item.id;
        delete item.uid;
        ans.push(item);
      }
      // save
      const date = new Date();
      await saveFile(
        `user結合store_${date.getTime()}.json`,
        JSON.stringify(ans)
      );
      return ans;
    }
  } catch (error) {
    console.log(error);
  }
}
user連接storeId(fakeData);

// ==========================
const config = [
  {
    start: new Date("2022-08-16"),
    end: new Date("2022-08-31"),
    amount: {
      cash: 30181,
      mobile: 18412,
      notUsed: 10666,
    },
  },
  {
    start: new Date("2022-09-01"),
    end: new Date("2022-09-14"),
    amount: {
      cash: Math.floor((32203 * 14) / 19),
      mobile: Math.floor((17723 * 14) / 19),
      notUsed: Math.floor((10225 * 14) / 19),
    },
  },
  {
    start: new Date("2022-09-15"),
    end: new Date("2022-09-19 13:10:00"),
    amount: {
      cash: Math.floor(143),
      mobile: Math.floor(123),
      notUsed: Math.floor(0),
    },
  },
];
const { generateRandomBinary } = require("../server/helper/digit-helper");
async function genCouponNotByOrder(config) {
  let less = JSON.parse(fs.readFileSync("user結合store_less.json"));
  let more = JSON.parse(fs.readFileSync("user結合store_more.json"));
  const { start, end, amount } = config;
  for (let i = 0; i < config.length; i++) {
    const date = new Date();
    // cash
    const cash = await loop("cash", amount.cash);
    await saveFile(`c_cash_${date.getTime()}.json`, JSON.stringify(cash));
    // mobile
    const mobile = await loop("mobile", amount.mobile);
    await saveFile(`c_mobile_${date.getTime()}.json`, JSON.stringify(mobile));
    // notUsed
    const notUsed = await loop("notUsed", amount.notUsed);
    await saveFile(`c_notUsed_${date.getTime()}.json`, JSON.stringify(notUsed));
  }

  async function loop(mode, limit) {
    const ans = [];
    const log = {
      'a':[new Date()]
    }
    for (let i = 0; i < limit; i++) {
      const people = draw({ more, less });

      //  taken_id,
      const taken_id = genTakenId([8, 4, 4, 4, 12]);

      //  taken_at, used_at, expired_at,
      let taken_at;
      let used_at;
      let expired_at;
      if (mode === "notUsed") used_at = null;
      ans.push({});
    }
  }

  function genTakenId(arr) {
    // 產生16進位數字
    const ans = [];
    arr.forEach((binaryLength) => {
      let hex = parseInt(generateRandomBinary(binaryLength * 4), 2);
      // ans.push(hex.toString(16));
      hex = hex.toString(16);
      // 不足位數要補0
      ans.push(hex.padStart(binaryLength, "0"));
    });
    return ans.join("-");
  }
}

function sameDate(a,b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// 剩下產生日期