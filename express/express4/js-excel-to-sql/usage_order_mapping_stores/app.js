const { executeSQL } = require("./db");

const testData = async (targetTable, limitDate, distributeConfig) => {
  const data = await executeSQL(`SELECT * FROM ${targetTable}
  WHERE 結帳時間 > date('${limitDate[0]} 00:00:00') AND 結帳時間 < date('${limitDate[1]} 00:00:00');`);

  const createRandom = (min, max) => {
    return min + Math.round(Math.random() * (max - min));
  };

  const 依機率產生時間 = () => {
    let minAndSec = ":" + createRandom(0, 59) + ":" + createRandom(0, 59);
    let randomNum = createRandom(1, 10);

    //萬波營業時間11-21
    //(1-5)機率50%，晚上18-21
    if (randomNum <= 5) return createRandom(18, 21) + minAndSec;
    //(6-9)機率40%，下午13-17
    if (randomNum <= 9) return createRandom(13, 17) + minAndSec;
    //(10) 機率10%，上午11-12
    return createRandom(11, 12) + minAndSec;
  };

  const 隨機產生日期 = (start, end) => {
    return createRandom(start, end);
  };

  const 更新資料庫結帳時間 = async (欲修改資料, 參考資料) => {
    const { itemYear, itemID } = 參考資料;
    const { month, start, end } = 欲修改資料;
    let 欲修改日期 = 隨機產生日期(start, end);
    let 欲修改時間 = 依機率產生時間();
    console.log(欲修改日期 + " " + 欲修改時間);
    await executeSQL(`UPDATE ${targetTable}
      SET 結帳時間 = '${itemYear}-${month}-${欲修改日期} ${欲修改時間}'
      WHERE id=${itemID};`);
  };

  let distributeTarget = [];
  distributeConfig.forEach((item) => {
    let itemTimeDataStart = new Date(item[0]);
    let itemTimeDataEnd = new Date(item[1]);
    distributeTarget.push({
      month: itemTimeDataStart.getMonth() + 1, //分配月份
      start: itemTimeDataStart.getDate(), //欲分配月份起
      end: itemTimeDataEnd.getDate(), //欲分配月份迄
      target: item[2], //欲分配月份最多塞幾筆
      nowQuantity: 0, //欲分配月份已塞幾筆
    });
  });

  data.map((item, index) => {
    let distributeLength = distributeTarget.length;
    if (distributeLength <= 0) {
      console.log("分配目標數量不足，剩下的不做分配");
      return;
    }

    let nowIndex = index % distributeLength;
    let itemDistribute = distributeTarget[nowIndex];
    let 欲修改資料 = {
      month: itemDistribute.month,
      start: itemDistribute.start,
      end: itemDistribute.end,
    };

    let itemTimeData = new Date(item.結帳時間);
    let itemYear = itemTimeData.getFullYear();
    let 參考資料 = { itemYear, itemID: item.id };

    更新資料庫結帳時間(欲修改資料, 參考資料);

    itemDistribute.nowQuantity++;

    //假如 當月已塞的數量>當月目標數量，移除之，即不會再塞進此月份
    if (itemDistribute.nowQuantity >= itemDistribute.target) {
      distributeTarget.splice(nowIndex, 1);
    }
  });

  console.log("執行完畢");
};
testData(
  "mobile",
  ["2022-05-01", "2022-05-10"],
  [
    // ["2022-05-01", "2022-05-02", 100],
    ["2022-09-01", "2022-09-10", 200],
    ["2022-10-01", "2022-10-10", 2000],
    ["2022-11-01", "2022-11-10", 2000],
  ]
);
//第一個參數 資料表名稱(字串)
//第二個參數 抓資料(陣列)          [起日期, 迄日期]  ps:日期格式(YYYY-MM-DD)
//第三個參數 放資料(雙層陣列)
//                                [
//                                   [起日期start, 迄日期end, 最多塞幾筆target],  要塞的第一個月份
//                                   [起日期, 迄日期, 最多塞幾筆]                 要塞的第二個月份
//                                ]
