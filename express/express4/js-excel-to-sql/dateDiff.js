const fs = require("fs");
const parseExcel = require("./server/xlsx/index");
const excelPath = "./index.xlsx";
const sheetsName = "work2";
main3();

async function main1() {
  // 引入 excel
  const excel = await parseExcel(excelPath, sheetsName);
  const ans = 顧客回購週期計算依天數合併(excel.data);
  await saveFile("coupon_usage_cycle_log.json", JSON.stringify(ans));
}

// log to 顧客回購週期計算依天數合併 JSON
async function main2(){
  const ans2 = {};
  let ans = JSON.parse(fs.readFileSync("coupon_usage_cycle_log.json"));
  ans.lineIds.forEach((el) => {
    ans2[el] = ans[el].cycle;
  });
  //   JSON檔案後面再跑回圈 做抽取
  await saveFile("coupon_usage_cycle_ok.json", JSON.stringify(ans2));
}

// JSON to csv
async function main3(){
  let ans2 = 'lineId\t顧客回購週期(計算依天數合併)\n';
  const ans = JSON.parse(fs.readFileSync("coupon_usage_cycle_ok.json"));
  const keys = Object.keys(ans)
  keys.forEach((el) => {
    ans2 += el + '\t' + ans[el] + '\n'
  });
  //   JSON檔案後面再跑回圈 做抽取
  await saveFile("coupon_usage_cycle_ok.csv", (ans2));
}

function calculateAvg(aDates) {
  return aDates.reduce((a, b) => a + b) / aDates.length;
}

function 顧客回購週期計算依天數合併(aData) {
  const ans = { lineIds: [] };
  for (let i = 0, len = aData.length; i < len; i++) {
    if (i % 500 === 0) console.log("目前次數:", i);
    if (i === len - 1) break;
    const data1 = aData[i];
    const data2 = aData[i + 1];
    const { user_id: id1, used_at: time1 } = data1;
    const { user_id: id2, used_at: time2 } = data2;
    // 塞入預設值
    if (!ans[id1]) {
      ans[id1] = { record: [], cycle: 0 };
    }

    // 1. 同LineId有大於2筆才繼續
    if (id1 !== id2) {
      // 判斷下一筆資料 如果是不同人&有紀錄長度 結算該 LineId
      if (ans[id1]["record"].length > 0) {
        ans[id1]["cycle"] = calculateAvg(ans[id1]["record"]);
        ans.lineIds.push(id1);
      }
      continue;
    }
    // 2. 是同一人 開始計算天數差異 dateDiff(sDate1, sDate2)
    const diff = dateDiff(time1, time2);
    // 3. diff 塞入 ans
    ans[id1]["record"].push(diff);
  }
  return ans;
}

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

function dateDiff(Date1, Date2) {
  const oDate1 = new Date(Date1);
  const oDate2 = new Date(Date2);
  const date1 = oDate1.getDate();
  const date2 = oDate2.getDate();

  const diffHour = Math.abs(oDate1 - oDate2) / 1000 / 60 / 60;
  const iHour = Math.floor(diffHour);
  const iDays = Math.floor(diffHour / 24); // 把相差的毫秒數轉換為天數

  if (date1 === date2) {
    // 同一天
    return 0;
  } else {
    // 不同天
    // 不同天小時差異小於24小時算差一天
    return iHour > 23 ? iDays : 1;
  }
  // var GetDateDiff3 = dateDiff("2022/1/1  00:00:01", "2022/1/2  23:59:58");
  // console.log(GetDateDiff3);

  // var GetDateDiff4 = dateDiff("2022/1/2  23:59:58", "2022/1/3  00:00:58"); //差3秒算同一天
  // console.log(GetDateDiff4);
}
