const employee = require("./first-test");

// 明確描述測試的目標：'拿 200 元買套餐，預期會找 73 元'
test("拿 200 元買套餐，預期會找 73 元", () => {
  const bill = 200; // 小明手中的鈔票
  const price = 127; // 餐點的價格

  // 期望找錢的結果是符合預期的
  expect(employee.deal(bill, price)).toBe(73);
});
