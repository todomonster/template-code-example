// -- 12
// SELECT * FROM `coupon_coupon_usages` WHERE used_at>'2021-12-10' AND used_at<'2021-12-14' ORDER BY RAND() LIMIT 37;
// +8個月
// -- 01
// SELECT * FROM `coupon_coupon_usages` WHERE used_at>'2022-01-10' AND used_at<'2022-01-14' ORDER BY RAND() LIMIT 37;
// +7個月
// -- 02
// SELECT * FROM `coupon_coupon_usages` WHERE used_at>'2022-02-10' AND used_at<'2022-02-14' ORDER BY RAND() LIMIT 37;
// +6個月

const { saveFile } = require("../server/helper/save-file");
const {
  genRandomDate,
  dateToString,
  addMinutes,
  addHours,
  genDifferentDates,
  getTomorrowMidnight,
  isValidDate,
} = require("../server/helper/date-parser");
const { generateRandomBinary } = require("../server/helper/digit-helper");
const { executeSQL } = require("./db");
const fs = require("fs");


function addMonth(dateObj, num = 1, mode = "has_date") {
  var newDate = new Date(dateObj.setMonth(dateObj.getMonth() + num));
  return newDate;
}

// ============== get
const sql = {
  12: `SELECT * FROM coupon_coupon_usages WHERE used_at>'2021-12-10' AND used_at<'2021-12-14' ORDER BY RAND() LIMIT 37;`,
  1: `SELECT * FROM coupon_coupon_usages WHERE used_at>'2022-01-10' AND used_at<'2022-01-14' ORDER BY RAND() LIMIT 37;`,
  2: `SELECT * FROM coupon_coupon_usages WHERE used_at>'2022-02-10' AND used_at<'2022-02-14' ORDER BY RAND() LIMIT 37;`,
};
async function getData() {
  const newData = {
    12: [],
    1: [],
    2: [],
  };
  const sql = {
    12: `SELECT * FROM coupon_coupon_usages WHERE used_at>'2021-12-10' AND used_at<'2021-12-14' ORDER BY RAND() LIMIT 37;`,
    1: `SELECT * FROM coupon_coupon_usages WHERE used_at>'2022-01-10' AND used_at<'2022-01-14' ORDER BY RAND() LIMIT 37;`,
    2: `SELECT * FROM coupon_coupon_usages WHERE used_at>'2022-02-10' AND used_at<'2022-02-14' ORDER BY RAND() LIMIT 37;`,
  };
  newData["12"] = await executeSQL(sql["12"]);
  newData["1"] = await executeSQL(sql["1"]);
  newData["2"] = await executeSQL(sql["2"]);

  await saveFile(`fix12_01_02.json`, JSON.stringify(newData));
}
// save
// getData();

// ==============update +8

let fixData = JSON.parse(fs.readFileSync("fix12_01_02.json"));
const december = fixData["12"];
moveDataWithMonth(december, 8, "ok_fix_12.json");
const jan = fixData["1"];
moveDataWithMonth(jan, 7, "ok_fix_01.json");
const feb = fixData["2"];
moveDataWithMonth(feb, 6, "ok_fix_02.json");

async function moveDataWithMonth(data, moveHowManyMonth, fileName) {
  const ans = [];
  for (let i = 0; i < data.length; i++) {
//   for (let i = 0; i < 2; i++) {
    let item = data[i];
    let id = item.id
    item.taken_at = loop(item,"taken_at", moveHowManyMonth);
    item.used_at = loop(item,"used_at", moveHowManyMonth);
    item.expired_at = loop(item,"expired_at", moveHowManyMonth);

    // update
    const updateSql = `UPDATE coupon_coupon_usages SET taken_at='${item.taken_at}', used_at='${item.used_at}', expired_at='${item.expired_at}' 
    WHERE id=${id} LIMIT 1`
    // ==================
    await executeSQL(updateSql);
    console.log(updateSql)
    // ==================
    ans.push(item);
  }
  function loop(item,keyName, moveHowManyMonth) {
    let date = new Date(item[keyName]);
    date = addHours(8, date);
    date = addMonth(date, moveHowManyMonth);
    return dateToString(date);
  }
//   await saveFile(fileName, JSON.stringify(ans));
}
