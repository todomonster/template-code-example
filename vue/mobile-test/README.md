# project

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

改美術的scss

```scss
// \src\assets\custom\_config.scss
$img: '@/assets/images/';

// \src\assets\layout.scss
@import "custom/vue";

// \src\assets\custom\_config.scss
.c-login {
 background: url(#{$img}#{nth($bg-login-image, $style)}) no-repeat center top/cover;
 margin: 0;
 height: 100%;
 overflow: hidden;
}
```

### 如何製作上傳圖片

宣告 myUploadFile,handleFileUpload
若用vue3.0語法務必將2個都return給模板

=======

## 版本紀錄

- v2.0.0 更新UI
- v2.1.1 更新UI包含的功能
- v2.2.0 整合storeUI
- v2.2.1 修正Header問題，完成除了 product 之外的其他區域
- v2.2.2 修正小鈴鐺空資料bug 完成 product
- v2.2.3 修正 filter bug，串接推播token

- v2.2.4 修正 bug
  - 開店狀態
  - bell number read
- v2.2.5 對應 {file: store_settings.txt , "version": 14}
  - 測試鎖定文字
  - 測試ios返回
- v2.3.0 對應 {file: store_settings.txt , "version": 16}
  - 新增移除帳號
  - 鎖定登入頁面不要滑動
  - 鎖定不讓使用者複製文字
  - ios返回路由 先寫死路徑 同步ios+Android
  - 加上版本號
  - 鈴鐺拔掉
- v2.3.1 對應 {file: store_settings.txt , "version": 18}
  - 註冊帳號返回失效bug
  - 無法重新送簡訊表單被阻擋
  - 註冊後沒有更新到編輯模式 清空bug
  - 註冊成功沒有提示bug
  - 後端回傳時間值不是[]提示bug
  - 時間v-for 不知道為什麼變成null bug
- v2.3.2 對應 {file: store_settings.txt , "version": 19}  
  - Fix 註冊還能改手機號碼
  - 移除不用<-返回的頁面
  - 補回小鈴鐺icon
  - 完成客製化路由紀錄
    - 也有處理query
  - 更新破圖處理
  - 店家資料
    - 大分類也改前端必填
    - 店家電話改前端必填
    - 分類標籤改前端必填
- v2.3.3 對應 {file: store_settings.txt , "version": 20}
  - Fix 回饋確認列表滑動問題
  - 商店在編輯能修改回饋級距了
  - boostrap 降版(5.2.2->5.0.2)
- v2.3.4 對應 {file: store_settings.txt , "version": 21}
  - Fix 回饋確認拒絕沒有提示
  - into.js改版成純js
    - \src\assets\custom\_frame.scss
- v2.3.5 對應 {file: store_settings.txt , "version": 22}
  - Fix 商品上架bug
  - Fix 地址顯示bug
- v2.3.6 對應 {file: store_settings.txt , "version": 23}
  - Add 隱藏第一階層的返回功能
  - Fix 商品上架bug
    - 阻擋圖片大小3MB，並清空
    - 直接PUT已上架商品後端回傳500
  - Fix 回饋過期沒顯示bug
- v2.3.7.1 對應 {file: store_settings.txt , "version": 25}
  - Update 隱藏內層小鈴鐺
  - Fix 登入沒清除 pinia 狀態 (註冊流程沒跑完，登入後可以編輯%數)
- v2.3.7.2 對應 {file: store_settings.txt , "version": 25}
  - Fix 離線版本錯誤提示

---
a tag 可能因為沒有加上 `display: block;` 導致圖片不見
