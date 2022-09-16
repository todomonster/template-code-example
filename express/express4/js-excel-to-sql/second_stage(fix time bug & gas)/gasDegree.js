
// 1.excel 建好假資料 
// 2. 再利用 csv to JSON 線上工具轉JSON
// 3. 透過 abstract程式轉成要得JSON
// 4. 引用JSON物件 將名稱加密 * 寫入DB
const { executeSQL } = require("./db");
async function insertGasDegree(data) {
  for (let i = 0, len = data.length; i < len; i++) {
    if (i % 500 === 0) console.log(i);
    const item = data[i];
    let { userLineId, userName, year, month, degree } = item;
    userName = userName[0] + "*" + userName[2];
    const sql = `INSERT INTO gas_degree_log_v2 (userLineId, userName, year, month, degree)
     VALUES ('${userLineId}', '${userName}', ${year}, ${month}, ${degree})`;

    await executeSQL(sql);
  }
  console.log("ok", new Date());
}
// insertGasDegree(b);

