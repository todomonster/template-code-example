//比例 62:32:06
// const client = ["店員", "加盟主", "經理"];
// 取得隨機結帳者
function getRandCheckout() {
  const random = Math.floor(Math.random() * 100);
  let client = "";
  // 0-62
  if (random <= 62) client = "店員";
  // 63-94
  else if (random >= 63 && random <= 94) client = "加盟主";
  // 95-99
  else client = "經理";
  return { client, randomNum: random };
  // getRandClient();
}

// Array 抽取特定的 key 變成 Object
function genArr2ObjMapKey(stores, keyName = "address") {
  const areaMapIdObj = {};
  let target = stores.map((x) => x[keyName]);
  let idArr = stores.map((x) => x["id"]);
  target.forEach((area, index) => {
    const id = idArr[index];
    if (!areaMapIdObj[area]) {
      areaMapIdObj[area] = [];
    }
    areaMapIdObj[area].push(id);
  });
  console.log(areaMapIdObj);
}

// 給地區 取得合併後的stor_id SQL條件
function getAreaMapStoreIdSqlCondition(area) {
  if (genArr2ObjMapKey[area]) {
    return (
      "AND (store_id=" + genArr2ObjMapKey[area].join(" OR store_id=") + ");"
    );
  }
  return false;
}

module.exports = {
  getAreaMapStoreIdSqlCondition,
  getRandCheckout,
};