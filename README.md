# template-code-example

`建議用ctrl+F搜尋`

這邊主要放跟網頁相關的範例程式碼，省去跑官網查文件的時間，未來工作可能會用上!

- 若是使用 cdn 記得加上 cdn-xxx.html
- npm 版本記得用資料夾包起來
- 可以的話結尾加上大的版本號碼
- 有新增的話記得在 README 更新

---

## bootstrap

cdn-bootstrap5 | 5.0

## express

- express4 建議依順序閱讀
  - basic
    - basic | 基本啟用 server 方式
    - setter & getter | express 有 set 和 get 可以設值/取值
    - static | 可以渲染靜態檔案 能搭配 ejs 等套件
    - setter & getter
  - router-basic | 路由基本 get post 範例
  - router-module | 路由模組化拆分範例
  - param+query | 2 個最常見的參數(變數)
  - body-parser | 後端編碼轉換範例，各版本比較
  - session | 傳遞資料請參考範例的圖片
  - ejs | 渲染引擎可以當成是 php 動態改 html 變數
  - cors | 跨域請求
  - multer | 後端上傳圖片/檔案範例，用 multer 套件
  - express-session | 和前端溝通需要操作 cookie 和 session 的套件
  - mysql |和 MySQL 串接
  - js-excel-to-sql | 解析excel套件

補充

- file-type | 套件可以幫忙判斷上傳檔案的格式是否串改(png,jpg...)

## pixijs

cdn-pixijs-basic | 5.3.12

## react

[https://github.com/dpes8693/react-teach](https://github.com/dpes8693/react-teach)

- cdn-react-basic | 18
- cdn-react-function-component | 18
- npm
  - react-basic
  - react-react-i18 | i18next
  - react-router
  - react-bootstrap
  - react-axios-basic | axios 打 API 套件封裝範例

## vue

- loader | loading 動畫
- cdn-vue2-basic | 2.6 | vue 框架 cdn
- cdn-vuetify-table | 2.6 | vue+CSS 框架
- cdn-vue3-basic | vue@3

vue3

- cdn-vue3-basic | vue3 新語法範例 composition API
- loader | 模擬網站loading動畫

## web-function

- normalize | CSS 歸零預設值(每個瀏覽器不同)
- api-fetch | 用 ES6 的 fetch 拿資料
- disable-copy | 禁用複製
- mailto | 呼叫 mail 軟體
- map-leaflet | 免費開源地圖(圖資)叫做 Leaflet，可以製作 ex 口罩地圖
- phone-call | 呼叫電話軟體
- right-click-custom-menu | 自定義滑鼠右鍵選單
- sidebar-right | 手刻側邊欄

## html5-element

- tag-abbr | 文字縮寫
- tag-fieldset | 表單分組 框框
- tag-input-range | slide bar
- tag-meter |儀表 數值,比例

## php
### laravel
- basic | 初始專案


---

## 講解遠端協作的公司是如何合併程式碼

### 推上去

1. 拉群組成員，ex:我們創一個叫做`todomonster`的群組
2. 組長用公司帳號創建一個`repo`
3. 組員使用`fork`將該專案拉回到私人專案
4. 組員更新程式碼後`commit`+`push`到私人專案，之後使用`pull request`推到公司的`repo`
5. 組長會看到 PR 提交的通知，`code review`後執行`merge`，Github 檢查是否有衝突`conflict`，沒有的話完成合併

其實正式上線的專案會分成不同分支`branch`，有開發新功能和穩定版...等

`fork`和`clone`剛開始會以為都是複製，但其實差很大!

### 同步(拉取下來)

https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork?fbclid=IwAR26m6sX2oyMJhv9OV5nlVLDIzZFhFX4G7XqhK2yHGN4Ix5_JWVaClpVNVE

