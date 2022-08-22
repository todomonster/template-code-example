const howManyPeople = (location, toFixed = 2) => {
  const allPeople = 23190064;
  let ans = 0;
  switch (location) {
    case "基隆":
      ans = 361082;
      break;
    case "台北":
      ans = 2464452;
      break;
    case "新北":
      ans = 3974683;
      break;
    case "桃園":
      ans = 2266824;
      break;
    case "新竹":
      ans = 577026;
      break;
    case "苗栗":
      ans = 535221;
      break;
    case "台中":
    case "臺中":
      ans = 2800981;
      break;
    case "彰化":
      ans = 1246924;
      break;
    case "雲林":
      ans = 665750;
      break;
    case "嘉義":
      ans = 262659;
      break;
    case "台南":
      ans = 1850735;
      break;
    case "高雄":
      ans = 2722904;
      break;
    case "屏東":
      ans = 800138;
      break;
    case "台東":
      ans = 212.891;
      break;
    case "宜蘭":
      ans = 448971;
      break;
    case "澎湖":
      ans = 106221;
      break;
    default:
      ans = false;
  }
  if (ans) console.log((ans / allPeople).toFixed(toFixed));
  else console.log("不存在資料內");
};
howManyPeople("臺中",5);
