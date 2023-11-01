// const employee = require("./first-test");
// // 原始碼
// const fns = {
//   add: (num1, num2) => num1 + num2,
//   isNull: () => null,
//   isUndefined: () => undefined,
//   isNaN: () => NaN,
//   checkValue: (val) => val,
//   createUser: () => {
//     return {
//       name: "小明",
//     };
//   },
// };
// // 明確描述測試的目標：'拿 200 元買套餐，預期會找 73 元'
// test('拿 200 元買套餐，預期會找 73 元', () => {
//   const bill = 200;  // 小明手中的鈔票
//   const price = 127; // 餐點的價格

//   // 期望找錢的結果是符合預期的
//   expect(employee.deal(bill, price)).toBe(73);
// });

// test('拿 300 元買套餐，預期會找 100 元', () => {
//   const bill = 300;
//   const price = 100;
//   expect(employee.deal(bill, price)).toBe(200);
// });
// describe("群組測試", () => {
//   it("測試數值 是否小於 2000", () => {
//     const num1 = 1000;
//     const num2 = 900;
//     expect(num1 + num2).toBeLessThan(2000);
//   });

//   it("測試數值 是否小於或等於 2000", () => {
//     const num1 = 1000;
//     const num2 = 1000;
//     expect(num1 + num2).toBeLessThanOrEqual(2000);
//   });
//   it("陣列是否包含 Bob 物件", () => {
//     const newArray = [{ name: "Bob" }, { name: "Someone" }];
//     // 錯誤expect(newArray).toContain({ name: "Bob" });
//     expect.arrayContaining([{ name: "Bob" }]);
//   });
// });
// describe("群組", () => {
//   it("測試", () => {
//     expect(1 + 1).toBe(2);
//   });
// });

test("變量應該被定義", () => {
  const myValue = 10;
  expect(myValue).toBeDefined();
});

test("0.1 + 0.2 應該接近 0.3", () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3, 5); // 5 表示小數點後五位
});

describe("僅運行這個測試", () => {
  test.only("這個測試將被執行", () => {
    // 測試邏輯
  });

  test("這個測試不會被執行", () => {
    // 測試邏輯
  });
});
