const fs = require("fs");
const parseExcel = require("../xlsx/index");

async function createTableSQL(fileName, dbName, tableName) {
  let sql =
    "CREATE TABLE `$dbName`.`$tableName` (`id` INT NOT NULL AUTO_INCREMENT, `uid` INT, `區域` VARCHAR(16)  , `店別` VARCHAR(16)  , `銷售單號` VARCHAR(16)  , `機號` VARCHAR(16)  , `顧客編號` VARCHAR(16)  , `顧客姓名` VARCHAR(16)  , `持卡人` VARCHAR(16)  , `付款方式` VARCHAR(16)  , `款項金額` FLOAT  , `結帳時間` DATETIME  , `註記` VARCHAR(16)  , `結帳員工` VARCHAR(16) ,FOREIGN KEY (uid) REFERENCES lineuser(id), PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8mb4;";
  sql = sql.replace("$dbName", dbName);
  sql = sql.replace("$tableName", tableName);
  await saveFile(fileName, sql);
  console.log(fileName, "寫入完成");
  return;
}

async function saveExcelToSQL(excelPath, sheetsName, fileName, dbConfig) {
  try {
    const { tableName, dbName } = dbConfig;
    const limit = 15;
    //引入模組   parseExcel 傳 [檔案路徑 資料表名稱 限制limit筆數]
    const data = await parseExcel(excelPath, sheetsName);
    if (data.err) {
      console.log(excelPath, sheetsName, "找不到該工作表");
      return;
    }

    // toStringParser 傳  [excel資料 資料庫名稱 資料表名稱]
    const result = JsonToSqlParser(data, dbName, tableName);
    // save .sql file
    if (result) {
      await saveFile(fileName, result);
    } else {
      console.log("檔案為空，請檢查檔案名稱和參數是否相符");
    }
    return;
  } catch (error) {
    console.log(error);
  }
}

// 負責將excel轉換後的JSON 轉成SQL需要的String
const { cityObj } = require("./city");
const { getRandomUser } = require("./user");
function JsonToSqlParser(obj, dbName, tableName) {
  let result = [];
  let result2 = [];
  try {
    if (obj.data) {
      obj?.data.forEach((el, i) => {
        const {
          店別 = "",
          銷售單號 = "",
          機號 = "",
          顧客編號 = "",
          顧客姓名 = "",
          持卡人 = "",
          付款方式 = "",
          款項金額 = 0,
          結帳時間 = "",
          註記 = "",
          結帳員工 = "",
        } = el;
        //condition 判斷區域
        const intersection = intersectionString(店別, 結帳員工);
        if (!intersection) console.log(店別, 結帳員工);
        result2[i] = intersection || "台北市";
        //隨機分配使用者 id
        const uid = getRandomUser();

        result[
          i
        ] = `('${result2[i]}','${店別}','${銷售單號}','${機號}','${顧客編號}','${顧客姓名}','${持卡人}','${付款方式}',${款項金額},'${結帳時間}','${註記}','${結帳員工}',${uid})`;
      });

      let header =
        "INSERT INTO `$dbName`.`$tableName` (`區域`, `店別`, `銷售單號`, `機號`, `顧客編號`, `顧客姓名`, `持卡人`, `付款方式`, `款項金額`, `結帳時間`, `註記`, `結帳員工`,`uid`)";
      header = header.replace("$dbName", dbName);
      header = header.replace("$tableName", tableName);
      return `${header}\n VALUES\n ${result.join(",\n")};;`;
    }
    return "";
  } catch (error) {
    console.log(error.message);
  }
}
// 判斷區域名稱交集的 邏輯
const { areaObj, areaType, othersArea } = require("./area");
function intersectionString(店別, 結帳員工) {
  const a = 店別.split("");
  const b = 結帳員工.split("");
  let intersect = a.filter((v) => new Set(b).has(v));
  if (intersect.length > 2) {
    intersect.pop();
  }
  let ans = "";

  for (let i = 0, len = intersect.length; i < len; i++) {
    if (intersect[i + 1]) {
      const target = intersect[i] + intersect[i + 1];
      // 找到
      if (cityObj[target]) {
        ans = target;
        break;
      } else {
        //打API判斷是否有該area
        ans = findCityByArea(target, intersect);
        if (ans) {
          break;
        } else {
          ans = "";
        }
      }
    }
  }
  return ans;

  const v = intersect;
  return `${v}`;
}

function findCityByArea(target, intersect) {
  for (let j = 0, areaLen = areaType.length; j < areaLen; j++) {
    let key = target + areaType[j];

    const area = areaObj[key];
    if (area) {
      // if (area.length > 1) console.log(intersect.join(""), key, area);
      return area[0].slice(0, 2);
    }
    // 特殊區域(不在DB)
    const other = othersArea[key];
    if (other) {
      return other[0].slice(0, 2);
    }
  }
  return;
}

// 存檔
function saveFile(myFileName, writeData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(myFileName, writeData, function (err) {
      if (err) {
        console.log(err);
        return reject(err);
      } else {
        return resolve();
      }
    });
  });
}

module.exports = {
  saveExcelToSQL,
  createTableSQL,
};
