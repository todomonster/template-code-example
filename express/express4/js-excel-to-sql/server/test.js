const express = require("express");
const app = express();
const parseExcel = require("./xlsx/index");

app.get("/mobile", async function (req, res) {
  try {
    const excelPath = "../excel/APPLEPAY/2022.xlsx";
    const sheetsName = "5月";
    const limit = 15;
    //   function 可以傳 [檔案路徑 資料表名稱 限制limit筆數]
    const data = parseExcel(excelPath, sheetsName, limit);

    const dbName = `test2`;
    const tableName = `aaa`;
    //   寫入資料模組 SQL [資料庫名稱 資料表名稱]
    const result = parser(data, dbName, tableName);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
});

const parser = (obj, dbName, tableName) => {
  let result = [];
  obj.data.forEach((el, i, arr) => {
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

  //Date沒有處理
};


app.listen(3011, () => console.log("http://localhost:3011/"));
