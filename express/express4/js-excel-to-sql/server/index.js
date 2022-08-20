const {
  saveExcelToSQL,
  createTableSQL: createTable,
} = require("./helper/index");

const config = {
  dbName: `test1`,
  mobile: `mobile`,
  cash: `cash`,
  fileExtension: ".sql",
  // months: ["3月", "4月", "5月", "6月","7月","8月"],
  months: ["8月"],
  mobilePath: [
    "../excel/悠遊付(卡)/2022.xlsx",
    "../excel/APPLEPAY/2022.xlsx",
    "../excel/LINEPAY/2022.xlsx",
  ],
  cashPath: ["../excel/現金/2022.xlsx"],
};

main(config);

async function main(config) {
  try {
    const {
      cash: cashTable,
      mobile: mobileTable,
      dbName,
      fileExtension,
      months,
      mobilePath,
      cashPath,
    } = config;

    //  Create Table SQL
    // await createTable("mobile.sql", dbName, mobileTable);
    // await createTable("cash.sql", dbName, cashTable);
    months.forEach(async (item) => {
      //生成  Add行動支付SQL
      await genInsertSQL(mobilePath, item, fileExtension, {
        tableName: mobileTable,
        dbName,
      });

      //生成  Add現金支付SQL
      await genInsertSQL(cashPath, item, fileExtension, {
        tableName: cashTable,
        dbName,
      });
    });
    console.log("任務結束");
  } catch (error) {
    console.log(error);
  }
}

async function genInsertSQL(path, monthItem, fileExtension, dbConfig) {
  try {
    path.forEach(async (fileItem) => {
      const fileName = fileItem.split("/")[2] + monthItem + fileExtension;
      await saveExcelToSQL(fileItem, monthItem, fileName, dbConfig);
    });
  } catch (error) {
    console.log(error);
  }
}
