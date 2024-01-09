# Wt

---

## 科技問卷

### excel 下載

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ExcelDownload</title>
  </head>
  <body>
    <span id="currentVersion">v1.5</span>
    <p>此為內部使用禁止外傳，違者依法辦理</p>
    <!--  -->
    <h2>群組1~3</h2>
    <a href="" id="downloadTagA">下載 最新 大學學生科技想像力 問卷調查 excel</a>
    <!--  -->
    <h2>群組4</h2>
    <a href="" id="downloadTagB">下載 最新 大學學生科技想像力 問卷調查 excel</a>
    <!--  -->
    <h2>群組5</h2>
    <a href="" id="downloadTagC">下載 最新 大學學生科技想像力 問卷調查 excel</a>
    <!--  -->
    <h2>群組6</h2>
    <a href="" id="downloadTagD">下載 最新 大學學生科技想像力 問卷調查 excel</a>
    <!--  -->
    <h2>群組7</h2>
    <a href="" id="downloadTagE">下載 最新 大學學生科技想像力 問卷調查 excel</a>
    <!--  -->
    <h2>群組8</h2>
    <a href="" id="downloadTagF">下載 最新 大學學生科技想像力 問卷調查 excel</a>
    <!--  -->
    <h2>群組9</h2>
    <a href="" id="downloadTagG">下載 最新 大學學生科技想像力 問卷調查 excel</a>
    <!--  -->
    <h2>群組10</h2>
    <a href="" id="downloadTagH">下載 最新 大學學生科技想像力 問卷調查 excel</a>
    <!--  -->
    <h2>群組100(內部測試用)</h2>
    <a href="" id="downloadTagZ">下載 最新 大學學生科技想像力 問卷調查 excel</a>
    <!--  -->

    <div id="link-rapper"></div>

    <script>
      var time = new Date().getTime();
      downloadTagA.href = `https://testing.71box.app/api/fExportExcel?t=${time}`;
      downloadTagB.href = `https://testing.71box.app/api/fExportExcel?group=4&t=${time}`;

      downloadTagZ.href = `https://testing.71box.app/api/fExportExcel?group=100&t=${time}`;

      downloadTagC.href = `https://testing.71box.app/api/fExportExcel?group=5&t=${time}`;
      downloadTagD.href = `https://testing.71box.app/api/fExportExcel?group=6&t=${time}`;
      downloadTagE.href = `https://testing.71box.app/api/fExportExcel?group=7&t=${time}`;
      downloadTagF.href = `https://testing.71box.app/api/fExportExcel?group=8&t=${time}`;
      downloadTagG.href = `https://testing.71box.app/api/fExportExcel?group=9&t=${time}`;
      downloadTagH.href = `https://testing.71box.app/api/fExportExcel?group=10&t=${time}`;
    </script>
    <script src="https://cdn.jsdelivr.net/npm/qs/dist/qs.min.js"></script>
    <script>
      function main() {
        const currentParams = getQueryParams();
        const version = Number(currentParams?.v) || 1;
        const groups = currentParams?.groups?.split(",") || [];
        console.log(groups);
        if (version >= 1.6) {
          // 使用範例
          currentVersion.textContent = `${version}`;
          createLinks(groups);
        }
        function getQueryParams() {
          const qs = Qs;
          const queryString = window.location.search.substring(1);
          const queryParams = qs.parse(queryString);

          return queryParams;
        }
        function createLinks(groupNumbers) {
          const linkWrapper = document.getElementById("link-rapper");

          groupNumbers.forEach((groupNumber) => {
            const h2 = document.createElement("h2");
            h2.textContent = `群組${groupNumber}`;

            const a = document.createElement("a");
            a.href = `https://testing.71box.app/api/fExportExcel?group=${groupNumber}&t=${time}`;
            a.textContent = "下載 最新 大學學生科技想像力 問卷調查 excel";

            linkWrapper.appendChild(h2);
            linkWrapper.appendChild(a);
          });
        }
      }
      main();
    </script>
  </body>
</html>
```

### middleware

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- meta start-->
    <title>大學學生科技想像力問卷</title>
    <meta property="og:locale" content="zh_TW" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="大學學生科技想像力問卷" />
    <meta property="og:description" content="填問卷，就送200元禮卷!!!" />
    <meta property="og:site_name" content="大學學生科技想像力問卷" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:description" content="填問卷，就送200元禮卷!!!" />
    <meta name="twitter:title" content="大學學生科技想像力問卷" />
    <!-- meta end -->
  </head>
  <body>
    <p id="lineId"></p>
    <span style="color: #9d9d9d">v1.3</span>

    <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
    <script>
      const BASE_URL = "https://testing.71box.app";
      const currentUrl = window.location.href;
      const VUE_CLI_INDEX = currentUrl.includes("dist")
        ? `${BASE_URL}/dist-tech/index.html`
        : `${BASE_URL}/tech/index.html`;

      const targetMapping = {
        mapping: {},
        rk: "",
        group: "",
      };
    </script>
    <script>
      class Liff {
        async login(bUseRedirectUri = false) {
          try {
            const liffId = "2002344154-4M6QoqmW";
            //初始化
            await liff.init({ liffId });

            if (!liff.isLoggedIn()) {
              (await bUseRedirectUri)
                ? await liff.login({ redirectUri: location.href })
                : await liff.login();
              return;
            }
            // 要login才有辦法取得否則會 LiffId Not find
            const profile = await liff.getProfile();
            const userData = {
              liffId,
              ...profile,
            };

            return { status: true, userData };
          } catch (error) {
            console.log(error);
            return { status: false };
          }
        }
        liffOpenWindow(downloadUrl = "") {
          liff.openWindow({
            url: downloadUrl, // URL for another LIFF app
            external: true,
          });
        }
      }
    </script>
    <script>
      main();

      async function main() {
        initQuery();
        document.getElementById("lineId").textContent = "網頁處理中..";
        const LiffInstance = new Liff();
        const liffResponse = await LiffInstance.login();
        setTimeout(() => {
          let LineId = "";
          if (liffResponse?.status === true) {
            const data = liffResponse.userData;
            const { userId = "", displayName = "" } = data;
            document.getElementById("lineId").textContent = "網頁處理中....";
            localStorage.setItem("takoLineUserId", userId);
            localStorage.setItem("takoLineUserName", displayName);
            LineId = userId;
          }
          //   jump
          // 判斷跳去哪邊
          const toWhichGroup = targetMapping.group;
          if (toWhichGroup) {
            const url = `${BASE_URL}/techV2/index.html`;
            jump(
              `${url}?lineId=${LineId}&t=${makeId(5)}&group=${toWhichGroup}`
            );
            return;
          }
          jump(`${VUE_CLI_INDEX}?lineId=${LineId}&t=${makeId(5)}`);
        }, 500);
      }
      function jump(url) {
        setTimeout(function () {
          // window.location.href = url;
          // 這邊要特別注意 網址最後不能是"/"後端轉port會出錯
          window.location.replace(url);
        }, 25);
      }
      function makeId(val = 5) {
        const genNumber = () => Math.floor(Math.random() * 10);
        let ans = "";
        for (let i = 0; i < val; i++) {
          ans += genNumber();
        }
        return ans;
      }
      function Toast(message = "") {
        alert(message);
      }

      function initQuery() {
        try {
          const webAddress = new URL(window.location.href);
          //解析 query
          let params = webAddress.searchParams;
          for (let pair of params.entries()) {
            const [key, value] = pair;
            if (key === "group") {
              if (value && value !== "null") {
                targetMapping.group = value;
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    </script>
  </body>
</html>
```

---

## Bingo

### BingoCsvToJson(有隱藏顯示數字外掛)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Bingo CSV to JSON</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <br />
    <div class="container">
      <h2>Bingo CSV to JSON</h2>
      <div class="row">
        <a
          href="https://www.taiwanlottery.com.tw/Lotto/BINGOBINGO/drawing.aspx"
          target="_blank"
          >bingo官方網站</a
        >
        <p>v1.3</p>
        <pre>
欄位格式: 期別 獎號 超級獎號 猜大小 猜單雙
規則: 會將第一列bypass; 有做由小排到大;
</pre
        >
      </div>
      <br />
      <div class="row">
        <div class="col">
          <div class="form-floating">
            <textarea
              id="inputArea"
              class="form-control"
              style="height: 100px"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex p-2 justify-content-center align-items-center">
          <button type="button" class="btn btn-primary btn-lg m-2" id="mainBtn">
            轉換
          </button>
          <button
            type="button"
            class="btn btn-outline-primary btn-lg m-2"
            onclick="copy('outputArea')"
          >
            複製
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-floating">
            <textarea
              id="outputArea"
              class="form-control"
              placeholder="output"
              style="height: 500px"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button
            type="button"
            class="btn btn-outline-primary btn-lg m-2"
            onclick="copy('外掛')"
          >
            複製外掛
          </button>
        </div>
        <div class="col">
          <div class="form-floating">
            <textarea id="外掛" class="form-control" placeholder="output">
            </textarea>
          </div>
        </div>
      </div>
    </div>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
      crossorigin="anonymous"
    ></script>
    <script>
      const text = `期別	獎號	超級獎號	猜大小	猜單雙
112069954	05 09 16 18 22 23 27 28 29 33 37 40 41 42 44 57 60 61 75 80	61	－	小單
112069953	13 14 16 21 26 36 37 41 44 45 46 48 49 55 59 68 69 74 77 78	46	大	和`;
      inputArea.value = text;
      main();
      外掛.value = setHint();

      mainBtn.onclick = () => {
        main();
      };

      function main() {
        try {
          const input = inputArea.value;
          const arr = input.split("\n");
          const reverseArr = arr.reverse();
          // outputArea.value = "[\n" + genJson(arr, arr.length) + "]";
          outputArea.value = `${genJson(reverseArr, reverseArr.length)}`;
        } catch (error) {
          console.log(error);
          alert(error.message);
        }
        function genJson(inputArr, arrLen) {
          let output = [];
          for (let i = 0; i < arrLen; i++) {
            if (i === arrLen - 1) {
              continue;
            }

            const arr = inputArr[i].split("\t");
            if (arr.length <= 1) {
              continue;
            }
            if (arr.length >= 2) {
              const 期別 = arr[0].trim();
              const 獎號 = arr[1].trim().split(" ");
              const 超級獎號 = arr[2].trim();
              const 猜大小 = arr[3].trim();
              const 猜單雙 = arr[3].trim();

              const obj = { 期別, 獎號 };
              output.push(obj);
            }
          }
          return JSON.stringify(output, null, 2);
        }
      }

      function copy(elId) {
        const text = document.getElementById(elId);
        text.select();
        text.setSelectionRange(0, 99999);
        document.execCommand("copy");
      }

      function setHint() {
        return `var dataTable = document.querySelectorAll(
  "#Panel1 > table.tableFull > tbody > tr > td > table > tbody > tr"
);
var arr = Array.from(dataTable);
arr = arr.reverse();
arr.forEach((el, index) => {
  const pEl = document.createElement("p");
  pEl.textContent = index + 1;
  pEl.height = "1px";
  pEl.width = "1px";
  pEl.className = "c-index";
  el.appendChild(pEl);
});

// 顯示數字
function showIndex() {
  document
    .querySelectorAll(".c-index")
    .forEach((item) => (item.style.display = ""));
}
// 隱藏數字
function hideIndex() {
  document
    .querySelectorAll(".c-index")
    .forEach((item) => (item.style.display = "none"));
}

function genBtn(id, triggerFunc, css = { top: 0, right: 0 }) {
  var btnText = id;
  var targetBtn = document.getElementById(id);
  if (targetBtn) {
    targetBtn.textContent = btnText;
    targetBtn.style.display = "";
  } else {
    var style = \`position:fixed; top:\${css.top}; right:\${css.right}; background-color:black; color:white; padding:5px; border-radius: 5px; max-width:30px;\`;
    var btnHtml = \`<button style="\${style}" id="\${id}">\${btnText}</button>\`;
    //   插入元素
    document.body.insertAdjacentHTML("afterend", btnHtml);
    setTimeout(() => {
      var btn = document.getElementById(id);
      btn.onclick = () => {
        // 開啟對話窗
        triggerFunc();
      };
    }, 500);
  }
}
genBtn("顯示", showIndex, { top: "2%", right: "2%" });
genBtn("隱藏", hideIndex, { top: "6%", right: "2%" });
`;
      }
    </script>
  </body>
</html>
```
### 新Bingo網站外掛
```js
// ==UserScript==
// @name         新bingo外掛
// @namespace    http://tampermonkey.net/
// @version      2024-01-08
// @description  try to take over the world!
// @author       You
// @match        https://www.taiwanlottery.com/lotto/result/bingo_bingo
// @icon         https://www.google.com/s2/favicons?sz=64&domain=taiwanlottery.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  //
  var myTableBody = "";
  var okJson = {};

  setTimeout(() => {
    var input = `<textarea rows="8" cols="60" id="apiText">
        https://api.taiwanlottery.com/TLCAPIWeB/Lottery/BingoResult?openDate=${getToday()}&pageNum=1&pageSize=999
      </textarea>
      <button id="APIBTN">[外掛]查看中獎紀錄</button>`;

    insertUI(".search-area", input);

    APIBTN.onclick = (e) => {
      main();
    };
  }, 1000);

  async function main() {
    var parent = document.querySelector(".result-area");
    if (!parent) {
      alert("請先點查詢");
      return;
    }
    await getApi();
    var customEl = createTableStr(myTableBody);
    insertUI(".result-area", customEl);
  }

  function createTableStr(tbody) {
    return `<div data-v-7aaf2b1e="" class="result-item">
      <div data-v-7aaf2b1e="" class="result-item-simple-area-container">
        <div data-v-7aaf2b1e="" class="result-item-simple-area">
          <div data-v-7aaf2b1e="" class="">
            <div data-v-7aaf2b1e="" class="">
                <textarea rows="50" cols="50">${JSON.stringify(
                  okJson
                )}</textarea>
            </div>
          </div>
          <div
            data-v-7aaf2b1e=""
            class="result-item-simple-area-order-container"
          >

<table style="border-collapse: collapse; border: 1px solid black;">
    <thead style="border: 1px solid black;">
        <tr>
        <th>期別</th>
        <th>獎號</th>
        </tr>
    </thead>
    <tbody style="border: 1px solid black;">

        ${tbody}
    </tbody>
</table>

          </div>
        </div>
      </div>
    </div>`;
  }

  function insertUI(query, customEl) {
    console.log("insertUI start");
    var parent = document.querySelector(query);
    if (parent) {
      var firstChild = parent.firstChild;
      var range = document.createRange();

      var fragment = range.createContextualFragment(customEl);
      parent.insertBefore(fragment, firstChild);
    } else {
      alert("找不到元素");
    }
    console.log("insertUI end");
  }

  function getApi() {
    return new Promise((resolve, reject) => {
      console.log("getApi start");
      const url = document.getElementById("apiText")?.value;
      if (!url) {
        alert("找不到apiText");
        return;
      }

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            reject(response);
            console.log("getApi end");
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })

        .then((data) => {
          const tbodyArr = [];
          okJson = parser(data);
          if (okJson?.length > 0) {
            okJson.forEach((element) => {
              const 期別 = element.期別;
              const 獎號 = element.獎號;
              const basicTr = `<tr style="border: 1px solid black;"><td>${期別}</td><td style="border: 1px solid black;">${獎號.join(
                " "
              )}</td><td></td><td></td><td></td></tr>`;
              tbodyArr.push(basicTr);
            });
          }

          myTableBody = tbodyArr.join("");
          resolve({});
          console.log("getApi end");
        })
        .catch((error) => {
          console.log("getApi end");
          reject(error);
        });
    });
  }

  function parser(data, isReverse = true) {
    var arr = data?.content?.bingoQueryResult;
    const strArrToNumArr = (arr) => arr.map((str) => Number(str));
    if (arr) {
      const data = arr?.map((item) => {
        return {
          期別: String(item?.drawTerm),
          獎號: strArrToNumArr(item?.openShowOrder),
        };
      });
      return isReverse ? data.reverse() : data;
    }
    return [];
  }

  function getToday() {
    const todayTW = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Taipei" })
    )
      .toISOString()
      .split("T")[0];
    return todayTW;
  }
  //
})();
```

### twllm 外掛

```js
// ==UserScript==
// @name         twllm 外掛
// @namespace    http://tampermonkey.net/
// @version      v1.2
// @description  try to take over the world!
// @author       You
// @match        https://twllm.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twllm.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  var isAutoSend = true;
  genCheckbox();
  貼上事件();
  // handleNewBtn();

  function genCheckbox() {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "w-full";
    checkbox.style =
      "top: -10%; height:20px; width:20px; top:50%; right:0; position: fixed;";
    checkbox.id = "cCheckbox";
    checkbox.checked = true;

    document.body.appendChild(checkbox);
    checkbox.addEventListener("change", function () {
      isAutoSend = this.checked ? true : false;
    });
  }
  function 貼上事件() {
    var query = ".relative.min-w-0.flex-1 > textarea";
    var el = document.querySelector(query);

    var dT = null;
    try {
      dT = new DataTransfer();
    } catch (e) {}
    // var evt = new ClipboardEvent("paste", { clipboardData: dT });

    el.onpaste = async function (e) {
      // var currentTxt = e.clipboardData.getData("text/plain");
      let currentTxt = (event.clipboardData || window.clipboardData).getData(
        "text"
      );
      console.log(currentTxt);

      if (isAutoSend === false) {
        return;
      }
      setTimeout(() => {
        自動送出(el);
      }, 500);
    };
    // 測試自動點 觸發event
    // el.dispatchEvent(evt);
    function 自動送出() {
      // //
      var query = `button[type="submit"]`;
      var btn = document.querySelector(query);

      console.log(btn);
      btn.click();
      console.log("ok");
    }
  }
  // function handleNewBtn() {
  //   var query = ".flex.items-center.rounded-xl.text-lg.font-semibold";
  //   var btn = document.querySelector(query).nextElementSibling;
  //   console.log(btn);
  //   btn.onclick = (e) => {
  //     console.log(e);
  //     setTimeout(() => {
  //       貼上事件();
  //     }, 500);
  //   };
  // }
})();
```

---

## 台汽綠

### 台電

```js
// ==UserScript==
// @name         台電腳本
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://service.taipower.com.tw/powerwheeling/expenseList*
// @icon         https://www.taipower.com.tw/tc/images/logoicon.png
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  main();

  function main() {
    var contractList = document.getElementById("contractList");

    contractList.onchange = () => {
      bindLinkEvent();
    };
    setTimeout(() => bindLinkEvent(), 1000);
  }

  function bindLinkEvent() {
    setTimeout(() => {
      var linkList = document.getElementById("historyBill");
      var arr = Array.from(linkList.childNodes);
      arr.forEach((el) => {
        el.onclick = () => {
          setTimeout(() => copyExcelGenBtn(), 500);
        };
      });
    }, 500);
  }

  function copyExcelGenBtn() {
    try {
      console.log(jsonExpAggr);
      genBtn();
    } catch (err) {
      if ((msg = `jsonExpAggr is not defined`)) alert("未找到費用清單");
    }
  }

  function genBtn() {
    var btnText = "送出資料";
    var targetBtn = document.getElementById("callApiBtn");
    if (targetBtn) {
      targetBtn.textContent = btnText;
      targetBtn.style.display = "";
    } else {
      var style = `position:fixed; top:0; right:0; background-color:black; color:white; padding:5px; border-radius: 5px; max-width:30px;`;
      var btnHtml = `<button style="${style}" id="callApiBtn">${btnText}</button>`;
      //   插入元素
      document.body.insertAdjacentHTML("afterend", btnHtml);
      setTimeout(() => {
        var btn = document.getElementById("callApiBtn");
        btn.onclick = () => {
          postApi(btn);
        };
      }, 500);
    }
  }

  function postApi(targetBtn) {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    targetBtn.textContent = "傳送中";
    // start
    fetch("https://api.71box.app/api/fRichardTest", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(jsonExpAggr),
    })
      .then((response) => {
        if (!response.ok) {
          // make the promise be rejected if we didn't get a 2xx response
          throw new Error("Not 2xx response", { cause: response });
        } else {
          return response;
        }
      })
      .then((response) => response.json())
      .then((json) => {
        // 處理回應
        console.log(json);
        alert("成功");
        targetBtn.style.display = "none";
      })
      .catch((err) => {
        targetBtn.textContent = "重送";
        alert(`失敗_${err.message}`);
      });
    //end
  }
})();
```

### 憑證中心腳本

```js
// ==UserScript==
// @name         憑證中心腳本
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://billing.trec.org.tw/*
// @icon         https://billing.trec.org.tw/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  genBtn();

  function genBtn() {
    var btnText = "開啟插件";
    var targetBtn = document.getElementById("callApiBtn");
    if (targetBtn) {
      targetBtn.textContent = btnText;
      targetBtn.style.display = "";
    } else {
      var style = `position:fixed; top:0; right:0; background-color:black; color:white; padding:5px; border-radius: 5px; max-width:30px;`;
      var btnHtml = `<button style="${style}" id="callApiBtn">${btnText}</button>`;
      //   插入元素
      document.body.insertAdjacentHTML("afterend", btnHtml);
      setTimeout(() => {
        var btn = document.getElementById("callApiBtn");
        btn.onclick = () => {
          // 開啟對話窗
          popup3(btn);
        };
      }, 500);
    }
  }

  function popup3(btn) {
    var billId = window.prompt(
      `請輸入繳費單編號,
    ex: 2209200221`,
      ""
    );
    if (billId) {
      postApi(btn, billId);
    } else {
      console.log("您已取消輸入");
    }
  }

  function postApi(targetBtn, billId) {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // start
    fetch("https://api.71box.app/api/fRichardTest", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ billId }),
    })
      .then((response) => {
        if (!response.ok) {
          // make the promise be rejected if we didn't get a 2xx response
          throw new Error("Not 2xx response", { cause: response });
        } else {
          return response;
        }
      })
      .then((response) => response.json())
      .then((json) => {
        // 處理回應
        console.log(json);
        alert("成功");
      })
      .catch((err) => {
        alert(`失敗_${err.message}`);
      });
    //end
  }
})();
```
