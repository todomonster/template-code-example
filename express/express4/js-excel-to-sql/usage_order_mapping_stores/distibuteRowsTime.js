const { executeSQL } = require("./db");
const { isValidDate } = require("../server/helper/date-parser");

/**
 * @param {Array.<string>} dates
 * @return {string}
 */
const validateDates = (dates) => {
  let log = "ok";
  dates = dates.filter((x) => typeof x === "string");
  for (let i = 0, len = dates.length; i < len; i++) {
    let date = new Date(dates[i]);
    const flag = isValidDate(date);
    // 不合法日期中斷迴圈
    if (!flag) {
      log = date;
      break;
    }
  }
  return log;
};

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const createRandom = (min, max) => {
  return min + Math.round(Math.random() * (max - min));
};

/**
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
const genRandDate = (start, end) => {
  if (start < 1) start = 1;
  if (end > 31) end = 31;
  return createRandom(start, end);
};

/**
 * @param {string} sDate1
 * @param {string} sDate2
 * @return {number}
 */
const dateDiff = (sDate1, sDate2) => {
  const date1 = new Date(sDate1);
  const date2 = new Date(sDate2);
  const diff = parseInt(Math.abs(date1 - date2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
  return diff;
};

/**
 * @param {number} start
 * @param {number} end
 * @return {string}
 */
const genTwoDigitTime = (start = 0, end = 59) => {
  const rand = createRandom(start, end);
  if (rand < 10) return `0${rand}`;
  return `${rand}`;
};

/**
 * @return {number}
 */
const genTimeWithRate = () => {
  /** @type {string} */
  let minAndSec = ":" + genTwoDigitTime(0, 59) + ":" + genTwoDigitTime(0, 59);

  let randomNum = genTwoDigitTime(1, 10);
  let hour = "11";
  //萬波營業時間11-21
  //(1-5)機率50%，晚上18-21
  if (randomNum <= 5) hour = genTwoDigitTime(18, 21);
  //(6-9)機率40%，下午13-17
  else if (randomNum <= 9) hour = genTwoDigitTime(13, 17);
  //(10) 機率10%，上午11-12
  else hour = genTwoDigitTime(11, 12);
  return hour + minAndSec;
};

/** 
第一個參數 資料表名稱(字串)
第二個參數 抓資料(陣列)          [起日期, 迄日期]  ps:日期格式(YYYY-MM-DD)
第三個參數 放資料(雙層陣列)
                               [
                                  [起日期start, 迄日期end, 最多塞幾筆target],  要塞的第一個月份
                                  [起日期, 迄日期, 最多塞幾筆]                 要塞的第二個月份
                               ]
                               若target超過不提示
*/


// 12,1,2
// main(
//   { targetTable: "vcarduser", timeColumn: "createTime", idColumn: "uid" },
//   ["2022-02-01", "2022-03-01"],
//   [
//     ["2021-12-01", "2022-01-01", 3126],
//     ["2022-01-01", "2022-02-01", 7456],
//     ["2022-02-01", "2022-03-01", 19868],
//   ]
// );

// 3,4,5,6,7,8
// main(
//   { targetTable: "vcarduser", timeColumn: "createTime", idColumn: "uid" },
//   ["2022-04-01", "2022-05-01"], //42498
//   [
//     ["2022-03-01", "2022-04-01", 21958],
//     ["2022-04-01", "2022-05-01", 6789],
//     ["2022-05-01", "2022-06-01", 4877],
//     ["2022-06-01", "2022-07-01", 5387],
//     ["2022-07-01", "2022-08-01", 3135],
//     ["2022-08-01", "2022-09-01", 3219],
//   ]
// );

/**
 * @param {{ targetTable: string, timeColumn: string, idColumn: string }} dbConfig
 * @param {Array.<string>} limitDate
 * @param {Array.<Array.<string,string,number>>} distributeConfig
 */
async function main(dbConfig, limitDate, distributeConfig) {
  try {
    const { targetTable, timeColumn, idColumn } = dbConfig;
    const dateArr = [...limitDate, ...distributeConfig.flat(1)];
    const flag = validateDates(dateArr);

    if (flag !== "ok") {
      console.log(flag, "出現不合法日期，終止任務!");
      return;
    }

    const data = await executeSQL(`SELECT * FROM ${targetTable}
    WHERE ${timeColumn} > date('${limitDate[0]} 00:00:00') AND ${timeColumn} < date('${limitDate[1]} 00:00:00');`);

    if (data.length === 0) {
      console.log(
        "該目標區間無資料\n",
        targetTable,
        limitDate,
        distributeConfig
      );
      return;
    }

    /**
     * @param {{ month: number, start: number, end: number }} newData
     * @param {{ itemYear: number, itemID: number}} oldData
     */
    const updateDB = async (newData, oldData) => {
      const { itemYear, itemID } = oldData;
      const { year,month, start, end } = newData;
      let randomDate = genRandDate(start, end);
      let randomTime = genTimeWithRate();
      if (month === 2 && randomDate === 29) randomDate = 27;
      if (month === 4 && randomDate === 31) randomDate = 30;
      if (month === 6 && randomDate === 31) randomDate = 30;
      if (month === 9 && randomDate === 31) randomDate = 30;
      if (month === 11 && randomDate === 31) randomDate = 30;
      await executeSQL(`UPDATE ${targetTable}
        SET ${timeColumn} = '${year}-${month}-${randomDate} ${randomTime}'
        WHERE ${idColumn}=${itemID};`);
    };

    let distributeTarget = [];
    const log = [];

    distributeConfig.forEach((item) => {
      let itemTimeDataStart = new Date(item[0]);
      const year = itemTimeDataStart.getFullYear();
      const startMonth = itemTimeDataStart.getMonth() + 1;
      const startDate = itemTimeDataStart.getDate();
      const diff = dateDiff(item[0], item[1]);

      distributeTarget.push({
        year,
        month: startMonth,
        start: startDate, //分配日 起
        end: startDate + diff, //分配日 迄
        targetQuantity: item[2], //分配 最多塞幾筆
        nowQuantity: 0, //分配 已塞幾筆
      });
    });

    for (let index = 0, len = data.length; index < len; index++) {
      const item = data[index];
      let distributeLength = distributeTarget.length;

      if (distributeLength <= 0) {
        console.log(log, "\n分配目標數量不足，剩下的不做分配");
        break;
      }

      let itemYear = new Date(item[timeColumn]).getFullYear();
      let oldData = { itemYear, itemID: item[idColumn] };

      let nowIndex = index % distributeLength;
      let itemDistribute = distributeTarget[nowIndex];
      let newData = {
        year: itemDistribute.year,
        month: itemDistribute.month,
        start: itemDistribute.start,
        end: itemDistribute.end,
      };

      await updateDB(newData, oldData);

      itemDistribute.nowQuantity++;

      //假如 當月已塞的數量>當月目標數量，移除之，即不會再塞進此月份
      if (itemDistribute.nowQuantity >= itemDistribute.targetQuantity) {
        log.push(distributeTarget[nowIndex]);
        distributeTarget.splice(nowIndex, 1);
      }
    }

    console.log("執行完畢");
  } catch (error) {
    console.log(error);
  }
}

