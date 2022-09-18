const { executeSQL } = require("./db");
const { saveFile } = require("../server/helper/save-file");
const { finalMenu } = require("./itemList");

// 1.get table
const getTable = async (tableName) => {
  const data = await executeSQL(`SELECT * from ${tableName}`);
  return data;
};

const { newOrder } = require("./temp/newOrders.js");
async function update(data) {
  try {
    for (let i = 0, len = data.length; i < len; i++) {
      if (i % 500 == 0) console.log(i);
      const item = data[i];
      const { order_detail, order_amount, order_price, id } = item;
      await executeSQL(`UPDATE online_orders SET order_detail='${JSON.stringify(
        order_detail
      )}', order_amount=${order_amount}, order_price=${order_price}
         WHERE (id=${id}) LIMIT 1`);
      console.log("ok");
    }
  } catch (error) {
    console.log(error);
  }
}

update(newOrder);

async function main(limit) {
  try {
    const orders = await getTable("online_orders");
    const newOrders = [];
    const newMapping = { cash: [], mobile: [] };
    for (let i = 0, len = orders.length; i < len; i++) {
      const order = orders[i];
      // 計算訂單公式
      const mapping = mapMenu(order, finalMenu);
      // 修改 order_detail order_amount order_price
      const newOrder = { ...order, ...mapping };
      newOrders.push(newOrder);

      if (order.pay_type === 1) {
        newMapping.cash.push(mapping.order_price);
      } else if (order.pay_type === 2) {
        newMapping.mobile.push(mapping.order_price);
      } else {
        console.log("error");
        break;
      }
    }
    // 完成後存檔
    const dateTime = new Date();
    await saveFile(
      `__newOrders.js`,
      `const newOrder = ` +
        JSON.stringify(newOrders) +
        "\n module.exports = {newOrder}"
    );
    await saveFile(
      `__newMapping.js`,
      `const newMapping = ` +
        JSON.stringify(newMapping) +
        "\n module.exports = {newMapping}"
    );
    console.log("完成", dateTime);
  } catch (error) {
    console.log(error);
  }
}

function mapMenu(order, menuItems = []) {
  let record = {};
  const rate = [
    [98, 83, 75, 65, 60], //1~25
    [55, 50, 45, 40, 35], //26~75
    [30, 25, 22], //76~95
    [10], //96~100
  ];
  const getRandomItemPrice = () => {
    const num = Math.floor(Math.random() * 100) + 1;
    let index = 0;
    if (num <= 25) {
      index = 0;
    } else if (num > 25 && num <= 75) {
      index = 1;
    } else if (num > 75 && num <= 95) {
      index = 2;
    } else {
      index = 3;
    }
    const len = rate[index].length;
    const randomNum = Math.floor(Math.random() * len);
    // console.log(randomNum, num, rate[index][randomNum]);
    return rate[index][randomNum];
  };
  const getRandomItem = (price) => {
    const items = menuItems[price];
    if (items) {
      const len = items.length;
      const random = Math.floor(Math.random() * len);
      return items[random];
    }
    return { price, message: "not find" };
  };
  const getRandomCombination = (price, pay_type) => {
    let total = 0;
    const ans = [];
    const avg = 61; //合理平均是一杯飲料 45.67元，但是為了符合martin設定的金額需要改成61
    const amount = Math.ceil(price / avg);

    for (let i = 0; i < amount; i++) {
      const itemPrice = getRandomItemPrice();
      const item = getRandomItem(itemPrice);
      ans.push(item);
      total += itemPrice;
    }
    // order_detail order_amount order_price
    return {
      order_detail: ans,
      order_price: total,
      order_amount: amount,
      origin_price: price,
      pay_type,
    };
  };
  const { order_price, pay_type } = order;

  if (order_price) {
    record = getRandomCombination(order_price, pay_type);
  }

  return record;
}

function genArr2ObjMapKey(originDataArr = [{}, {}], keyName = "price") {
  const areaMapIdObj = {};
  let targetKeys = originDataArr.map((x) => x[keyName]);

  targetKeys.forEach((item, index) => {
    const targetItem = originDataArr[index];
    if (!areaMapIdObj[item]) {
      areaMapIdObj[item] = [];
    }
    areaMapIdObj[item].push(targetItem);
  });

  return areaMapIdObj;
}
