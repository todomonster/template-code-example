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
/** 
coupon_id =2
store_id	=3...
user_id =Uafa2aa54e4f010629f3808ae82d4a948
taken_at	
used_at	
taken_id
expired_at
paytype =1 =2
 * 
*/

const { executeSQL } = require("./db");
async function getVcardUser() {
  const getVcardUserSQL = `SELECT u.uid ,u.createTime as create_time,u.creator as line_id FROM vcarduser as u;`;

  const data = await executeSQL(getVcardUserSQL);
  return data;
}

const { idMapStore } = require("./coupon-stores/data");

const newUsers = [];
async function getHowManyAreaUser() {
  try {
    const users = await getVcardUser();
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
          const store_name = idMapStore[store_id]["name"];
          newUsers.push({ ...users[counter], area, store_id, store_name });
          counter++;
        }
        return newUsers;
      }
      for (let i = 0; i < el; i++) {
        const area = uniqueCity[index];
        const store_id = getRandStoreId(area);
        const store_name = idMapStore[store_id]["name"];
        newUsers.push({ ...users[counter], area, store_id, store_name });
        counter++;
      }
    });
    return newUsers;
  } catch (error) {
    console.log(error);
  }
}
const { saveFile } = require("../server/helper/save-file");
async function main() {
  const data = await getHowManyAreaUser();
  saveFile("newUsers.txt", JSON.stringify(data));
}

// 隨機取得LinId
function getRandLineId(users) {
  const random = Math.floor(Math.random() * users.length);
  return users[random].user_id;
}

// 產生Mapping Table 的 SQL
createNewMappingTable();

async function createNewMappingTable() {
  const dataArr = await getHowManyAreaUser();
  // create table sql
  await createTableSQL(
    "create_user_combine_store.sql",
    "test1",
    "user_combine_store"
  );
  // insert data sql
  const result = JsonToSqlParser(dataArr, "test1", "user_combine_store");
  if (result) {
    const fileName = "insert_user_combine_store.sql";
    await saveFile(fileName, result);
    console.log(fileName, "寫入完成");
  } else {
    console.log("檔案為空，請檢查檔案名稱和參數是否相符");
  }
}

async function createTableSQL(fileName, dbName, tableName) {
  let sql =
    "CREATE TABLE `$dbName`.`$tableName` (`id` INT(32) NOT NULL AUTO_INCREMENT , `uid` INT(32) NOT NULL , `create_time` DATETIME NOT NULL , `line_id` VARCHAR(64) NOT NULL , `area` VARCHAR(16) NOT NULL , `store_id` INT(32) NOT NULL , `store_name` VARCHAR(16) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8mb4;";
  sql = sql.replace("$dbName", dbName);
  sql = sql.replace("$tableName", tableName);
  await saveFile(fileName, sql);
  console.log(fileName, "寫入完成");
  return;
}
/**
{
  "uid":1,
  "create_time":"2021-10-26T04:10:15.000Z",
  "line_id":"Uafa2aa54e4f010629f3808ae82d4a948",
  "area":"基隆",
  "store_id":2,
  "store_name":"基隆廟口店"
}
 */

const { users } = require("./usersData");
function JsonToSqlParser(data, dbName, tableName) {
  let result = [];
  data.forEach((el, i) => {
    let {
      uid = null,
      create_time = "",
      line_id = "",
      area = null,
      store_id = null,
      store_name = null,
    } = el;

    //2022/12/20 3:00:00
    const time = create_time.toLocaleString("zh-TW", {
      timeZone: "UTC",
      hour12: false,
    });
    const timeZone = time.replace("上午", "").replace("下午", "");
    if (line_id === "system") {
      line_id = getRandLineId(users);
    }

    result[
      i
    ] = `(${uid},'${timeZone}','${line_id}','${area}',${store_id},'${store_name}')`;
  });

  let header =
    "INSERT INTO `$dbName`.`$tableName` ( `uid`, `create_time`, `line_id`, `area`, `store_id`, `store_name` )";
  header = header.replace("$dbName", dbName);
  header = header.replace("$tableName", tableName);
  return `${header}\n VALUES\n ${result.join(",\n")};;`;
}
