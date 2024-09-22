async function main() {
  // Example usage:
  await sendLineNotify("這是一則來自 LINE Notify 的訊息");
}

async function sendLineNotify(message) {
  const url = "https://notify-api.line.me/api/notify";
  const token = "KC93ubtFGfWnLLmopdvZ8tvDIhAp4gCjbX99pIKeLGO"; // 替換成你的 LINE Notify 權杖

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`, // 使用 Bearer Token 驗證
  };

  const body = new URLSearchParams();
  body.append("message", message); // 將 message 加入到請求體中

  await fetch(url, {
    method: "POST",
    headers: headers,
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        console.log("通知成功！");
      } else {
        console.log("通知失敗:", data);
      }
    })
    .catch((error) => {
      console.error("發生錯誤:", error);
    });
}
main();
