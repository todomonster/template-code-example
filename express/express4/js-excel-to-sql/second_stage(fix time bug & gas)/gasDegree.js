// 1.excel 建好假資料
// 2. 再利用 csv to JSON 線上工具轉JSON
// https://csvjson.com/csv2json
// 3. 引用JSON物件 將名稱加密 * 寫入DB
const { executeSQL } = require("./db");

const startIndex = 0;
const endIndex = 216; //324*2/3
const fs = require("fs");
let gas_degree_data = JSON.parse(
  fs.readFileSync("fake_gas_degree_data_0916.json")
);

// index=2739 start=2740 end=2956 0901~0919
insertGasDegree(gas_degree_data);

async function insertGasDegree(data) {
  // console.log(data)
  try {
    for (let i = startIndex, len = data.length; i < endIndex; i++) {
      if (i % 500 === 0) console.log(i);
      const item = data[i];
      let { userLineId, userName, year, month, degree } = item;
      let lastName = userName[2] || "";
      userName = userName[0] + "*" + lastName;
      // 之前做錯了 不應該把 gas_degree_log_v2 DB lineID設定成長度32 應該是64
      const sql = `INSERT INTO gas_degree_log_v2 (userLineId, userName, year, month, degree)
     VALUES ('${userLineId.slice(0,32)}', '${userName}', ${year}, ${month}, ${degree})`;
// console.log(sql)
      await executeSQL(sql);
    }
  } catch (error) {
    console.log(error);
  }
  console.log("ok", new Date());
}

// =========================================== 產生 line ids 324筆 0901~0930
async function abstactLineId() {
  if (vcarduser) {
    const ids = vcarduser.map((x) => x.line_id).slice(0, 324);
    const date = new Date();
    await saveFile(`ids${date.getTime()}.json`, JSON.stringify(ids));
  } else {
    console.log("no data find");
  }
}

// abstactLineId();
// ===========================================
