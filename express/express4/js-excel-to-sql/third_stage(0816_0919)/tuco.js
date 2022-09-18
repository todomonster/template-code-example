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

function hyo(arr) {
  const index = createRandomNum(arr.length);
  const { lineId, couponAmount } = arr[index];

  //現金:1，行動:2
  const coupon類型 = index % 2 ? 1 : 2;
  const obj = { lineId, couponAmount, coupon類型 };
  console.log(obj);
}

function 產生ID和coupon類型(peopleObj) {
  const { more, less } = peopleObj;

  const randomNum = createRandomNum(10);

  if (randomNum > 1) hyo(more, more.length);
  else hyo(less, less.length);
}

產生ID和coupon類型(fakeData);
