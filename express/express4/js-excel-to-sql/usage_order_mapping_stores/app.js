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
    if (randomNum <= 5) return createRandom(18, 24) + minAndSec;
    if (randomNum <= 8) return createRandom(12, 17) + minAndSec;
    return createRandom(8, 11) + minAndSec;
  };

  const 依月份隨機產生日期 = (month) => {
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return createRandom(1, 31);
      case 4:
      case 6:
      case 9:
      case 11:
        return createRandom(1, 30);
      default:
        return createRandom(1, 28);
    }
  };

  const 更新資料庫結帳時間 = async (欲修改月份, 參考資料) => {
    const { itemYear, itemID } = 參考資料;
    let 欲修改日期 = 依月份隨機產生日期(欲修改月份);
    let 欲修改時間 = 依機率產生時間();
    console.log(欲修改日期 + 欲修改時間);
    await executeSQL(`UPDATE ${targetTable}
      SET 結帳時間 = '${itemYear}-${欲修改月份}-${欲修改日期} ${欲修改時間}'
      WHERE id=${itemID};`);
  };

  let distributeTarget = [];
  distributeConfig.forEach((item) => {
    let itemTimeData = new Date(item[0]);
    distributeTarget.push({
      month: itemTimeData.getMonth() + 1, //分配月份
      target: item[2], //欲分配月份最多塞幾筆
      nowQuantity: 0, //欲分配月份已塞幾筆
    });
  });

  data.forEach((item, index) => {
    let nowIndex = index % distributeTarget.length;
    let 欲改成此月 = distributeTarget[nowIndex].month;

    let itemTimeData = new Date(item.結帳時間);
    let itemYear = itemTimeData.getFullYear();
    // let itemDate = ("0" + itemTimeData.getDate()).slice(-2);
    // let itemTime = `${itemTimeData.getHours()}:${itemTimeData.getMinutes()}:00`;
    // let 參考資料 = { itemYear, itemDate, itemTime, itemID: item.id };
    let 參考資料 = { itemYear, itemID: item.id };

    // 更新資料庫結帳時間(欲改成此月, 參考資料);

    let itemDistribute = distributeTarget[nowIndex];
    itemDistribute.nowQuantity++;

    //假如5月塞的數量>5月目標數量，把5月移除，就不會再塞進5月份
    if (itemDistribute.nowQuantity >= itemDistribute.target) {
      distributeTarget.splice(nowIndex, 1);
    }
  });

  console.log("done");
};
testData(
  "mobile",
  ["2022-05-03", "2022-05-4"],
  [
    ["2022-05-03", "2022-05-04", 100],
    ["2022-06-01", "2022-06-10", 200],
    ["2022-07-01", "2022-07-11", 1000],
  ]
);
//第一個參數 資料表名稱(字串)
//第二個參數 抓資料(陣列)          [起日期, 迄日期]  ps:日期格式(YYYY-MM-DD)
//第三個參數 放資料(雙層陣列)      [ [起日期start, 迄日期end, 最多塞幾筆target], [起日期, 迄日期, 最多塞幾筆] ]
