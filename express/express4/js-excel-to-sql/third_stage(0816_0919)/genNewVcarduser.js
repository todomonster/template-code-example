const { saveFile } = require("../server/helper/save-file");
const {
  genRandomDate,
  dateToString,
  addHours,
} = require("../server/helper/date-parser");

const { executeSQL } = require("./db");

function genHex(arr = [8, 8, 8, 8]) {
  // 產生hex
  function randomDigit() {
    return Math.floor(Math.random() * Math.floor(2));
  }
  function generateRandomBinary(binaryLength) {
    let binary = "";
    for (let i = 0; i < binaryLength; ++i) {
      let digits = String(randomDigit());
      binary += digits;
    }
    return binary;
  }
  const ans = [];
  arr.forEach((binaryLength) => {
    let hex = parseInt(generateRandomBinary(binaryLength * 4), 2);
    hex = hex.toString(16);
    // 不足位數要補0
    ans.push(hex.padStart(binaryLength, "0"));
  });
  return ans.join("");
}

// 產生一組數字array [] 原本用來產生電子帳單瓦斯數量
function 產生隨機分配數值之陣列(
  min = 1, //值最小
  max = null, //值最大
  arrayLength = 30, //陣列長度 人數 該月份天數
  totalAmount = 2796, //全部數值總和上限
  limitMaxRate = 1 //調整比例 * totalAmount
) {
  if (typeof max === "number" && max * arrayLength < totalAmount) {
    console.log("條件不正常，請再想想數字");
    return;
  }
  const arr = [];
  let counter = 0;
  let maxCounter = 0;
  const hasMaxAmount = Math.floor(arrayLength * limitMaxRate);
  for (let i = 0; i < totalAmount; i++) {
    if (counter >= totalAmount) break;
    const random = Math.floor(Math.random() * arrayLength);
    if (max && arr[random] >= max) {
      i--;
      continue;
    }
    // 加次數
    if (arr[random] || arr[random] === 0) {
      arr[random] += 1;
      if (arr[random] === max) {
        maxCounter++;
        // 若超過限制比例的話跳過
        if (maxCounter > hasMaxAmount) {
          arr[random] -= 1;
          i--;
          maxCounter--;
          continue;
        }
      }
      counter++;
    } else {
      arr[random] = min;
      counter += min;
    }
  }

  console.log(arr);
  return arr;
}

const random = (min, max) => Math.round(Math.random() * (max - min)) + min;

const genNumberWithCondition = (length = 10, header = "09") => {
  const loopTimes = length - header.length;
  let ans = header;
  for (let i = 0; i < loopTimes; i++) {
    ans += random(0, 9);
  }
  return ans;
};

// config
const monthDay = 30;
const start = new Date("2022-09-01");
const end = new Date("2022-09-30");
const genHowManyPeople = 2796;
const minHour = "8";
const maxHour = "23";
const fileName = "vcardUser_1663314715016.json";
const 使用者產生到甚麼時候 = "2022-09-19 13:00:59";
//

async function genVcardUser() {
  const arr = 產生隨機分配數值之陣列(1, null, monthDay, genHowManyPeople, 1);
  const ans = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i]; j++) {
      const createDateTime = genRandomDate(start, end, minHour, maxHour);
      const month = createDateTime.getMonth() + 1;
      const year = createDateTime.getFullYear() - 1911;
      const phoneNum = genNumberWithCondition(10, "09");
      ans.push({
        // 長度33 U+32碼
        line_id: "U" + genHex([8, 8, 8, 8]),
        phone: [{ type: "phone", phone: `${phoneNum}` }],
        createTime: dateToString(addHours(8, createDateTime)),
        month,
        year,
      });
    }
  }

  ans.sort((a, b) => {
    a = new Date(a.createTime);
    b = new Date(b.createTime);
    // 日期時間由小到大
    return a > b ? 1 : -1;
  });

  const date = new Date();
  await saveFile(`vcardUser_${date.getTime()}.json`, JSON.stringify(ans));
  return ans;
}
// 產生假vcarduser
// genVcardUser();

// ======================================
async function update(data) {
  try {
    const { phone, createTime, line_id } = data;
    await executeSQL(
      `INSERT INTO vcarduser (phone, createTime, creator )
          VALUES ('${JSON.stringify(phone)}', '${createTime}', '${line_id}' );`
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const fs = require("fs");
let vcarduser = JSON.parse(fs.readFileSync(fileName));
async function main() {
  if (vcarduser) {
    for (let i = 0, len = vcarduser.length; i < len; i++) {
      // 設置時間break
      const creatTime = new Date(vcarduser[i].createTime);
      const limitTime = new Date(使用者產生到甚麼時候);
      if (creatTime > limitTime) {
        console.log("完成到第", i, "筆");
        console.log(vcarduser[i].line_id);
        return;
      }
      await update(vcarduser[i]);
    }
  } else {
    console.log("no data find");
  }
}

// 用產生的資料 塞入DB
// main();

// uid=198320 start=198321 end=200039


