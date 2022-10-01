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

let less = JSON.parse(fs.readFileSync("user結合store_less.json"));
let more = JSON.parse(fs.readFileSync("user結合store_more.json"));

async function 分類(data, keyName = "paytype", fileName) {
  const ans = {
    cash: [],
    mobile: [],
    others: [],
  };
  data.forEach((element) => {
    const type = element[keyName];
    if (type === 1) {
      ans.cash.push(element);
    } else if (type === 2) {
      ans.mobile.push(element);
    } else {
      ans.others.push(element);
    }
  });
  await saveFile(fileName, JSON.stringify(ans));
}
// 分類(less, "paytype", `sort_user結合store_less_copy.json`);
// 分類(more, "paytype", `sort_user結合store_more_copy.json`);
