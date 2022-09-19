const { saveFile } = require("../server/helper/save-file");
const {
  genRandomDate,
  dateToString,
  addMinutes,
  addHours,
  genDifferentDates,
  getTomorrowMidnight,
} = require("../server/helper/date-parser");
const { generateRandomBinary } = require("../server/helper/digit-helper");
// const { executeSQL } = require("./db");
const fs = require("fs");
// ===============
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

function draw(peopleObj, paytype) {
  //1,2
  const { more, less } = peopleObj;

  const randomNum = createRandomNum(10); //0~9

  if (randomNum > 1) {
    // 2~9 = 80%
    return getArrayItem(more, paytype);
  } else {
    // 0,1 = 20%
    return getArrayItem(less, paytype);
  }

  function getArrayItem(data, paytype) {
    let arr = [];
    if (paytype === 1) {
      arr = data["cash"];
    }
    if (paytype === 2) {
      arr = data["mobile"];
    }
    let index = createRandomNum(arr.length);
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
      // console.log(len);
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
// user連接storeId(fakeData);

// ==========================
// {
//   start: new Date("2022-08-16"),
//   end: new Date("2022-08-31"),
//   amount: {
//     cash: 30,
//     mobile: 30,
//     notUsed: 30,
//   },
//   limitPersonUseCoupon: 4,
// },
const config = [
  // {
  //   start: new Date("2022-08-16"),
  //   end: new Date("2022-08-31"),
  //   amount: {
  //     cash: 30181,
  //     mobile: 18412,
  //     notUsed: 10666,
  //   },
  //   limitPersonUseCoupon: 4,
  // },
  // {
  //   start: new Date("2022-09-01"),
  //   end: new Date("2022-09-14"),
  //   amount: {
  //     cash: Math.floor((32203 * 14) / 19),
  //     mobile: Math.floor((17723 * 14) / 19),
  //     notUsed: Math.floor((10225 * 14) / 19),
  //   },
  //   limitPersonUseCoupon: 4,
  // },
  {
    start: new Date("2022-09-15"),
    end: new Date("2022-09-18"),
    amount: {
      cash: Math.floor(143),
      mobile: Math.floor(123),
      notUsed: Math.floor(0),
    },
    limitPersonUseCoupon: 2,
  },
];

const ef = 0;
const  hourStart= "09";
const  hourEnd= "22";
genCouponNotByOrder(config);

async function genCouponNotByOrder(config) {
  let less = JSON.parse(fs.readFileSync("sort_user結合store_less_copy.json"));
  let more = JSON.parse(fs.readFileSync("sort_user結合store_more_copy.json"));

  let start;
  let end;
  let amount = {};
  let limitPersonUseCoupon = 1;

  for (let i = 0; i < config.length; i++) {
    start = config[i].start;
    end = config[i].end;
    amount = config[i].amount;
    limitPersonUseCoupon = config[i].limitPersonUseCoupon;
    const date = dateToString(new Date())
      .replaceAll("/", "_")
      .replaceAll(" ", "_")
      .replaceAll(":", "_");
    console.log(date);
    // cash
    const cash = loop("cash", amount.cash);
    await saveFile(`c_cash_${date}.json`, JSON.stringify(cash));
    // mobile
    const mobile = loop("mobile", amount.mobile);
    await saveFile(`c_mobile_${date}.json`, JSON.stringify(mobile));
    // notUsed
    const notUsed = loop("notUsed", amount.notUsed);
    await saveFile(`c_notUsed_${date}.json`, JSON.stringify(notUsed));
  }

  function loop(mode, limit) {
    console.log(mode, limit, "開始執行");
    let PAYTYPE = 1;
    if (mode === "mobile") PAYTYPE = 2;
    const ans = [];
    let counter = 0;
    const samePerson = {};
    for (let i = 0; i < limit; i++) {
      if (i % 1000 === 0) console.log(i);
      const people = draw({ more, less }, PAYTYPE);
      const { line_id, store_id, couponAmount, paytype } = people;
      // 重複的人 跳過繼續抽
      if (samePerson[line_id]) {
        i--;
        continue;
      }

      const random = (max = 1) => Math.round(Math.random() * (max - 1)) + 1;
      const dates = genDifferentDates(random(limitPersonUseCoupon), {
        start: start,
        end: end,
        hourStart: hourStart,
        hourEnd: hourEnd,
      });
      // console.log(dates) //ok

      for (let j = 0; j < dates.length; j++) {
        // 中斷條件
        if (counter === limit) {
          return ans;
        }

        // 超過上限
        // 放棄實作 因為已經機率已經很低了 20%
        //
        const date = dates[j];
        // console.log(date,111111111,i)
        const taken_id = genTakenId([8, 4, 4, 4, 12]);

        const timeConfig = genTimeConfig(date);

        let { taken_at, used_at, expired_at } = timeConfig;
        if (ef) expired_at = null;
        if (mode === "notUsed") used_at = null;
        ans.push({
          line_id,
          taken_id,
          store_id,
          paytype,
          coupon_id: 2,
          ref_by_user: null,
          //  taken_at, used_at, expired_at,
          taken_at,
          used_at,
          expired_at,
        });
        samePerson[line_id] = true;
        counter++;
      }
    }
    console.log("完成任務", mode, limit, counter);
    return ans;
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

function genTimeConfig(dateObj) {
  const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  let newDateObj = new Date(dateObj)
  newDateObj = addHours(8, newDateObj)
  return {
    taken_at: dateToString(newDateObj),
    used_at: dateToString(addMinutes(newDateObj, randomNumber(2, 25))),
    expired_at: getTomorrowMidnight(newDateObj), //日期+一天後 取前面就好 +00:00:00
  };
}

// function sameDate(a, b) {
//   return (
//     a.getFullYear() === b.getFullYear() &&
//     a.getMonth() === b.getMonth() &&
//     a.getDate() === b.getDate()
//   );
// }
