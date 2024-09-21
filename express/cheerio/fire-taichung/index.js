//!! Node.js 18 LTS or later !!
// npm i cheerio
const cheerio = require("cheerio");

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
      dataList.push(data);
    });

    console.log(dataList);
  };
  await fetchUrl(url, func1);
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
        func(body);
        resolve(body);
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
