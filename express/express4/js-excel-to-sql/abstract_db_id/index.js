"use strict";

const fs = require("fs");
const { saveFile } = require("../server/helper/save-file");

// let cash = JSON.parse(fs.readFileSync("cash_move.json"));
// abstractId("cash_move", cash);
let cash = JSON.parse(fs.readFileSync("cash_move_5月.json"));
abstractId("cash_move_少資料_", cash);

// let mobile = JSON.parse(fs.readFileSync('mobile_move.json'));
// abstractId("mobile_move", mobile);



function abstractId(myFileName, arr) {
  let ans = {};
  console.log(typeof arr);

  arr.forEach((element) => {
    const keys = Object.keys(element);
    const firstKey = keys[0];
    if (!ans[firstKey]) {
      ans[firstKey] = [];
    }
    ans[firstKey].push(element[firstKey]);
  });
  const allKeys = Object.keys(ans);
  allKeys.forEach((key) => {
    saveFile(`${myFileName}_${key}.txt`, JSON.stringify(ans[key]));
  });
}

