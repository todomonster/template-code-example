function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// input '2022-03-22',1 ;
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

// input '2022-03-22',1 ;
function addMonth(dateString, num = 1) {
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
  return dateArr.join("-");
}
// console.log(addMonth("2022-03-33", 0));
// console.log(addMonth("2022-03-13", "aa"));
// console.log(addMonth("2022-03-13", NaN));
// console.log(addMonth("2022-03-13", 1));

module.exports = { addDay, addMonth };
