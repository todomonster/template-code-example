const fs = require("fs");
const parseExcel = require("../xlsx/index");

async function createTableSQL(fileName, dbName, tableName) {
  let sql =
    "CREATE TABLE `$dbName`.`$tableName` (`id` INT NOT NULL AUTO_INCREMENT, `店別` VARCHAR(16)  , `銷售單號` VARCHAR(16)  , `機號` VARCHAR(16)  , `顧客編號` VARCHAR(16)  , `顧客姓名` VARCHAR(16)  , `持卡人` VARCHAR(16)  , `付款方式` VARCHAR(16)  , `款項金額` FLOAT  , `結帳時間` DATETIME  , `註記` VARCHAR(16)  , `結帳員工` VARCHAR(16) , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8mb4;";
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
    //   toStringParser 傳  [excel資料 資料庫名稱 資料表名稱]
    const result = toStringParser(data, dbName, tableName);
    await saveFile(fileName, result);
    return;
  } catch (error) {
    console.log(error);
  }
}

// 負責將excel轉換後的JSON 轉成SQL需要的String
function toStringParser(obj, dbName, tableName) {
  let result = [];
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

    result[
      i
    ] = `('${店別}','${銷售單號}','${機號}','${顧客編號}','${顧客姓名}','${持卡人}','${付款方式}',${款項金額},'${結帳時間}','${註記}','${結帳員工}')`;
  });

  let header =
    "INSERT INTO `$dbName`.`$tableName` (`店別`, `銷售單號`, `機號`, `顧客編號`, `顧客姓名`, `持卡人`, `付款方式`, `款項金額`, `結帳時間`, `註記`, `結帳員工`)";
  header = header.replace("$dbName", dbName);
  header = header.replace("$tableName", tableName);
  return `${header}\n VALUES\n ${result.join(",\n")};;`;
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
