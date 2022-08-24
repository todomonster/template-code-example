/**
 * @param {Object} d 日期
 * @return {boolean}
 */
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

/**
 * @param {string} dateString
 * @param {number} num
 * @param {string} mode has_date or no_date
 * @return {string} 日期
 */
function addMonth(dateString, num = 1, mode = "has_date") {
  let date = new Date(dateString);
  if (typeof num !== "number" || isNaN(num)) {
    return false;
  }
  if (!isValidDate(date)) return false;
  date.setMonth(date.getMonth() + num);
  const dateArr = [
    date.getFullYear(),
    ("0" + (date.getMonth() + 1)).slice(-2),
    ("0" + date.getDate()).slice(-2),
  ];
  if (mode === "no_date") {
    dateArr.pop();
  }
  return dateArr.join("-");
}
// console.log(addMonth("2022-03-33", 0));
// console.log(addMonth("2022-03-13", "aa"));
// console.log(addMonth("2022-03-13", NaN));
// console.log(addMonth("2022-03-13", 1));

/**
 * @param {string} dateString
 * @param {number} num
 * @return {string} 日期
 */
function addDay(dateString, num = 1) {
  let date = new Date(dateString);
  if (typeof num !== "number" || isNaN(num)) {
    return false;
  }
  if (!isValidDate(date)) return false;
  date.setDate(date.getDate() + num);
  const dateArr = [
    date.getFullYear(),
    ("0" + (date.getMonth() + 1)).slice(-2),
    ("0" + date.getDate()).slice(-2),
  ];
  return dateArr.join("-");
}
// console.log(addDay("2022-03-33", 0));
// console.log(addDay("2022-03-13", "aa"));
// console.log(addDay("2022-03-13", NaN));
// console.log(addDay("2022-03-13", 1));

function dateToString(dateObj) {
  const dateString = dateObj.toLocaleString("zh-TW", {
    timeZone: "UTC",
    hour12: false,
  });
  
  if (dateString.includes("上午")) {
    return dateString.replace("上午", "");
  }
  if (dateString.includes("下午")) {
    return dateString.replace("下午", "");
  }
  return dateString;
}

function addHours(numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  return date;
}

function getTomorrowMidnight(dateObj) {
  const dateString = dateToString(dateObj).slice(0, 9);
  let date = new Date(dateObj);
  date.setDate(date.getDate() + 1);
  const dateArr = [
    date.getFullYear(),
    ("0" + (date.getMonth() + 1)).slice(-2),
    ("0" + date.getDate()).slice(-2),
  ];
  return dateArr.join("-") + " 00:00:00";
}

module.exports = {
  addDay,
  addMonth,
  isValidDate,
  dateToString,
  addHours,
  getTomorrowMidnight,
};
