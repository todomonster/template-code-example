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
  - basic | 基本啟用 server 方式
  - router-basic | 路由基本 get post 範例
  - router-module | 路由模組化拆分範例
  - param+query | 2 個最常見的參數(變數)
  - body-parser | 後端編碼轉換範例，各版本比較
  - cors | 跨域請求
  - multer | 後端上傳圖片/檔案範例，用 multer 套件
  - express-session | 和前端溝通需要操作 cookie 和 session 的套件

## pixijs

cdn-pixijs-basic | 5.3.12

## react

- cdn-react-basic | 18
- cdn-react-function-component | 18
- npm
  - react-basic
  - react-react-i18 | i18next
  - react-router
  - react-bootstrap
  - react-axios-basic | axios 打 API 套件封裝範例

## vue

- cdn-vue2-basic | 2.6 | vue 框架 cdn
- cdn-vuetify-table | 2.6 | vue+CSS 框架

## web-function

api-fetch | 用 ES6 的 fetch 拿資料
right-click-custom-menu | 自定義滑鼠右鍵選單
mailto | 呼叫 mail 軟體
phone-call | 呼叫電話軟體
map-leaflet | 免費開源地圖(圖資)叫做 Leaflet，可以製作 ex 口罩地圖
before-close-alert | 關閉網頁時阻擋預設動作，可以在還沒有存檔做提示
disable-copy | 禁用複製

## html5-element

- tag-abbr | 文字縮寫
- tag-fieldset | 表單分組 框框
- tag-input-range | slide bar
- tag-meter |儀表 數值,比例

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
