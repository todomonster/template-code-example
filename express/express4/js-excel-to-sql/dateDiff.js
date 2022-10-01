const fs = require("fs");
const parseExcel = require("./server/xlsx/index");
const excelPath = "./index.xlsx";
const sheetsName = "work2";

// 產生紀錄
// main1('cycle');

// 產生週期
// main2('cycle','cycle');
// 產生 lastDate
// main2('cycle','lastDate',['2022-07-15','2022-08-15']);

async function main1(outputKeyname='cycle') {
  // 引入 excel
  const excel = await parseExcel(excelPath, sheetsName);
  const ans = 顧客回購週期計算依天數合併(excel.data);
  await saveFile(`coupon_usage_${outputKeyname}_log.json`, JSON.stringify(ans));
}

async function main2(readkeyname='cycle',outputKeyname='cycle',condition){
  // log to 顧客回購週期計算依天數合併 JSON
  const ans2 = {};
  let ans = JSON.parse(fs.readFileSync(`coupon_usage_${readkeyname}_log.json`));
  ans.lineIds.forEach((el) => {
    // 加入時間條件模組
    if(condition){
      const now = new Date(ans[el][outputKeyname]);
      const startDate = new Date(condition[0]);
      const endDate = new Date(condition[1]);
      if(now>=startDate&&now<=endDate){
        ans2[el] = ans[el][outputKeyname];
      }
    }else{
      ans2[el] = ans[el][outputKeyname];
    }
  });
  await saveFile(`coupon_usage_${outputKeyname}_ok.json`, JSON.stringify(ans2));
// JSON to csv
  const csvHeader='lineId\txxx\n';
  let csv = csvHeader;
  const keys = Object.keys(ans2)
  keys.forEach((el) => {
    csv += el + '\t' + ans[el] + '\n'
  });
  await saveFile(`coupon_usage_${outputKeyname}_ok.csv`, (csv));
}

function calculateAvg(aDates) {
  return aDates.reduce((a, b) => a + b) / aDates.length;
}

function 顧客回購週期計算依天數合併(aData) {
  const ans = { lineIds: [] };
  for (let i = 0, len = aData.length; i < len; i++) {
    if (i % 2000 === 0) console.log("目前次數:", i);
    if (i === len - 1) break;
    const data1 = aData[i];
    const data2 = aData[i + 1];
    const { user_id: id1, used_at: time1 } = data1;
    const { user_id: id2, used_at: time2 } = data2;
    // 塞入預設值
    if (!ans[id1]) {
      ans[id1] = { record: [], cycle: 0, lastDate: 0 };
    }

    // 1. 同LineId有大於2筆才繼續
    if (id1 !== id2) {
      // 判斷下一筆資料 如果是不同人&有紀錄長度 結算該 LineId
      if (ans[id1]["record"].length > 0) {
        ans[id1]["cycle"] = calculateAvg(ans[id1]["record"]);
        ans.lineIds.push(id1);
        // 紀錄最後一次時間
        const lastDate = new Date(time1)
        if(lastDate>ans[id1]['lastDate']){
          ans[id1]['lastDate'] = time1;
        }
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
