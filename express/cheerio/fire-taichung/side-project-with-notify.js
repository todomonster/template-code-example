//!! Node.js 18 LTS or later !!
// npm i cheerio
const cheerio = require("cheerio");

const 每隔x分鐘爬蟲 = 1;
const 開啟Log = false;
const 服務啟動或重啟時提醒 = true;
// ex: "緊急救護,火災,其他";
const includeClass = "緊急救護,火災"; 
// ex: "${notify_token_1},${notify_token_2}";
const tokenString =
"KC93ubtFGfWnLLmopdvZ8tvDIhAp4gCjbX99pIKeLGO,qCaQ3Y563geUOHIEGOLAzuXy5ifstACKNq21xbW5kq5";

let oldData = [];
// 給予多組 token 3組

const main = async () => {
  const url =
    "https://www.fire.taichung.gov.tw/caselist/index.asp?Parser=99,8,226";
  const func1 = (body) => {
    const $ = cheerio.load(body);
    const dataList = [];

    const response = {
      result: true,
      message: "ok",
      data: null,
    };

    try {
      // logWithColor(`====== 爬蟲 start ${new Date()}======`);
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
        // 超過x筆
        const maxItemAmount = 5;
        if (dataList.length >= maxItemAmount) {
          return;
        }
        dataList.push(data);
      });

      //無資料提示
      if (dataList.length <= 0) {
        response.message = "無資料";
      }
      response.data = dataList;
      logWithColor(`====== 爬蟲 end ${new Date()}======`);
    } catch (error) {
      response.result = false;
      response.message = error.message;

      console.log(`====== 爬蟲 fail ${new Date()}======`);
    }

    return response;
  };
  const json = await fetchUrl(url, func1);

  //send log
  const logString = JSON.stringify(json, null, 2);
  if (開啟Log) {
    await sendLineNotify(`\n${logString}`);
  }

  // send real text
  const notifyData = compareAndNotify(json);
  const notifyString = genNotifyText(notifyData);
  if (notifyString) {
    await sendLineNotify(`${notifyString}`);
  }
};

console.log(`${new Date()}`);
const triggerTime = Math.max(每隔x分鐘爬蟲, 1) || 1;
setInterval(() => {
  main();
}, triggerTime * 1000 * 60);
if (服務啟動或重啟時提醒) {
  sendLineNotify(`\n消防相關通知服務 啟動!`);
}

function genNotifyText(notifyData) {
  let ans = "";

  notifyData.forEach((item) => {
    const googleMapAddress = item?.發生地點
      ? `https://www.google.com/maps/search/${item.發生地點}`
      : "-";

    ans += `
受理時間: ${item?.受理時間 || "-"}
案類: ${item?.案類 || "-"}
案別: ${item?.案別 || "-"}
發生地點: ${item?.發生地點 || "-"}
派遣分隊: ${item?.派遣分隊 || "-"}
執行狀況: ${item?.執行狀況 || "-"}
GoogleMap: ${googleMapAddress}
=====`;
  });
  return ans;
}

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

function sendLineNotify(message) {
  const url = "https://notify-api.line.me/api/notify";
  // 替換成你的 LINE Notify 權杖
  const tokenArr = tokenString.split(",");

  const callApi = (token) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`, // 使用 Bearer Token 驗證
    };

    const body = new URLSearchParams();
    body.append("message", message); // 將 message 加入到請求體中

    fetch(url, {
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
  };

  if (tokenArr?.length > 0) {
    // 併發
    tokenArr.forEach((token) => {
      callApi(token);
    });
  }
}

//=======
function compareAndNotify(response) {
  const needNotify = [];
  if (response.result === false) {
    return needNotify;
  }

  const newData = response.data;

  // 如果有上一筆資料(oldData存在)
  if (oldData.length > 0) {
    // 檢查每一筆資料
    newData.forEach((newItem) => {
      const match = oldData.find(
        (oldItem) =>
          oldItem["受理時間"] === newItem["受理時間"] &&
          oldItem["發生地點"] === newItem["發生地點"]
      );

      // 找不到=是新資料
      if (!match) {
        // new
        console.log("通知：新資料");
        needNotify.push(newItem);
      }
    });
  } else {
    // 如果沒有上一筆資料，直接通知
    console.log("直接通知所有資料");
    newData.forEach((newItem) => {
      needNotify.push(newItem);
    });
  }

  // 每次最後將新資料賦值給 oldData
  oldData = [...newData];

  return needNotify;
}
