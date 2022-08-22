const uniqueCity = [
  "基隆",
  "台北",
  "新北",
  "桃園",
  "新竹",
  "苗栗",
  "台中",
  "彰化",
  "雲林",
  "嘉義",
  "台南",
  "高雄",
  "屏東",
  "台東",
  "宜蘭",
  "澎湖",
];

const howManyPeople = (location, toFixed = 2) => {
  const allPeople = 23190064;
  let ans = 0;
  switch (location) {
    case "基隆":
      ans = 361082;
      break;
    case "台北":
      ans = 2464452;
      break;
    case "新北":
      ans = 3974683;
      break;
    case "桃園":
      ans = 2266824;
      break;
    case "新竹":
      ans = 577026;
      break;
    case "苗栗":
      ans = 535221;
      break;
    case "台中":
    case "臺中":
      ans = 2800981;
      break;
    case "彰化":
      ans = 1246924;
      break;
    case "雲林":
      ans = 665750;
      break;
    case "嘉義":
      ans = 262659;
      break;
    case "台南":
      ans = 1850735;
      break;
    case "高雄":
      ans = 2722904;
      break;
    case "屏東":
      ans = 800138;
      break;
    case "台東":
      ans = 212891;
      break;
    case "宜蘭":
      ans = 448971;
      break;
    case "澎湖":
      ans = 106221;
      break;
    default:
      ans = false;
  }
  if (ans) {
    return (ans / allPeople).toFixed(toFixed);
  } else console.log("不存在資料內");
};
function getRandArea() {
  const random = Math.floor(Math.random() * 16);
  return uniqueCity[random];
}

const areaMapId = {
  基隆: [2],
  台北: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  新北: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  桃園: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
  新竹: [44, 45, 46, 47, 48],
  苗栗: [49, 50],
  台中: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 86, 179],
  彰化: [64, 65, 66, 67],
  雲林: [68],
  嘉義: [69],
  台南: [70, 71, 72, 73],
  高雄: [74, 75, 76, 77, 78, 178],
  屏東: [79, 80, 81, 82],
  台東: [83],
  宜蘭: [84],
  澎湖: [85],
};
function getRandStoreId(area) {
  const ids = areaMapId[area];
  const random = Math.floor(Math.random() * ids.length);
  return ids[random];
}

const { users } = require("./usersData");
const { idMapStore } = require("./coupon-stores/data");

const newUsers = [];
function getHowManyAreaUser(users) {
  const userLength = users.length;
  const cityLoop = [];
  uniqueCity.forEach((el) => {
    const getRate = howManyPeople(el, 3);
    cityLoop.push(Math.floor(getRate * userLength));
  });
  cityLoop.push(2607); //32082-29475
  console.log(cityLoop.reduce((a, b) => a + b));

  let counter = 0;
  cityLoop.forEach((el, index) => {
    if (el === 2607) {
      for (let i = 0; i < 2607; i++) {
        const area = getRandArea();
        const store_id = getRandStoreId(area);
        const name = idMapStore[store_id]["name"];
        newUsers.push({ user_id: users[counter], area, store_id, name });
        counter++;
      }
      return newUsers;
    }
    for (let i = 0; i < el; i++) {
      const area = uniqueCity[index];
      const store_id = getRandStoreId(area);
      const name = idMapStore[store_id]["name"];
      newUsers.push({ user_id: users[counter], area, store_id, name });
      counter++;
    }
  });
  return newUsers;
}
const data = getHowManyAreaUser(users);
const { saveFile } = require("../server/helper/save-file");
saveFile("newUsers.js", JSON.stringify(data));
