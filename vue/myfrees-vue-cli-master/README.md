# myfrees-vue-cli

my福利社 store 端因為用flutter2寫無法上架，要打掉用框架包webview

HeaderArea.vue => pelin fixed
HeaderArea2.vue => ally no-fixed

## 使用套件

- vue-qrcode
  - npm install vue@3 qrcode@1 @chenfengyuan/vue-qrcode@2
- vue-loading-overlay
  - npm i vue-loading-overlay
- bootstrap
- sweetalert2
- axios
- pinia
- vue-router

## 重構成模板

1. 路由新增例外路徑
2. logout => 要清除 cookie 所以在 instance 多一個 logout 控制
3. footer 做動態的寫法
4. 多國語系就先不做了
5. 完成路由守衛
6. 把 accessToken
7. 加入 qrcode 套件 + 下載圖片功能

可以更好的地方: 共用顏色變數+footer路由設定檔案

### 命名規則

component名稱一律全部大駝峰，而且要2個單字組成，因為git的關係所以統一檔案名稱用小寫開頭
常用組合之單字: index, edit, view, list

### 資料夾分區

慢慢補充

### myfrees 版本號

- v1.0.0
  - 套件+外框+開發規則+共用方法+撰寫風格已完成95%，剩下細部的頁面實作
  - profile GET,小鈴鐺List,Unread,setting-menu,QRcode
  - page router + api router

#### 可能會感到奇怪的地方

1. 左上角箭頭=上一頁功能
2. GET user 資料沒有 cache
3. 顏色是紅色+橘色(因為沒有橘色的.svg圖片)

## 全域引用 scss 的變數

要先解除安裝 Node Scss 再設定 `vue.config.js`

<https://blog.csdn.net/weixin_44841138/article/details/124385977>

<https://medium.com/unalai/vue-%E5%B0%88%E6%A1%88%E4%B8%AD%E5%BC%95%E5%85%A5-scss-%E6%AA%94%E6%A1%88%E7%9A%84%E5%9B%9B%E7%A8%AE%E6%96%B9%E6%B3%95-%E8%A9%B2%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E5%91%A2-9babcd3a4ef1>

## 文件

<https://chiayilai.com/image-%E5%90%84%E7%A8%AE%E5%9E%8B%E6%85%8B%E8%BD%89%E6%8F%9Bblob-dataurl-canvas-in-javascript/>

## 注意事項

若用到 `new Date()` 在ios是不吃`"2022-09-01"`減號格式的!
