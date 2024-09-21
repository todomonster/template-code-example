//!! Node.js 18 LTS or later !!
// npm i cheerio
const cheerio = require("cheerio");

const includeClass = "火災";
const 每隔x分鐘爬蟲 = null;
const 開啟Log = null;
// const filterClass = "緊急救護,火災,其他";

const main = async () => {
  const url =
    "https://www.fire.taichung.gov.tw/caselist/index.asp?Parser=99,8,226";
  const func1 = (body) => {
    const $ = cheerio.load(body);
    logWithColor("======開始爬蟲======");

    const dataList = [];
    const listItems = $(".rwd-table > li:not(.list_head)");

    listItems.each((index, element) => {
      const fields = $(element).find("span");
      const getAddress = (dom) => {
        const childBtn = $(dom).find("button");
        return childBtn.attr("js_addr").trim();
      };
      const getDomText = (dom) => $(dom).text().trim();
      const data = {
        受理時間: getDomText(fields.get(0)),
        案類: getDomText(fields.get(1)),
        案別: getDomText(fields.get(2)),
        發生地點: getAddress(fields.get(3)),
        派遣分隊: getDomText(fields.get(5)),
        執行狀況: getDomText(fields.get(6)),
      };
      // 不在案類白名單
      const filterClassRules = includeClass.split(",");
      if (!filterClassRules.includes(data.案類)) {
        return;
      }
      // 超過5筆
      if (dataList.length >= 5) {
        return;
      }
      dataList.push(data);
    });

    return dataList;
  };
  const json = await fetchUrl(url, func1);
  if (json.length <= 0) {
    console.log("無資料");
    return;
  }

  // Example usage:
  const dataString = JSON.stringify(json, null, 2);
  await sendLineNotify(`\n${dataString}`);
};

main();

function fetchUrl(url, func) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          reject(response);
          //   throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((body) => {
        resolve(func(body));
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function logWithColor(str) {
  console.log("\x1b[36m%s\x1b[0m", `${str}`);
}

console.log(new Date());

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
