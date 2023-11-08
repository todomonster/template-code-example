//模擬網路延遲
async function mockApi(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, Math.random() * 1000);
  });
}

// 會亂數
var array = [1, 2, 3];
array.forEach(async (item) => {
  const result = await mockApi(item);
  console.log(result);
});

// 解决这个问题的方法是，使用 for…of 循环代替 forEach，因为 for…of 循环会等待异步操作执行结束再进行下一次循环。
var array = [1, 2, 3];
for (const item of array) {
  const result = await mockApi(item);
  console.log(result);
}

// 參考文章:
// https://zhuanlan.zhihu.com/p/613245022