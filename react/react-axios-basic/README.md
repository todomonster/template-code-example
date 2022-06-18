# 指令

```bash

# 初始化 | npx是下載後自動砍掉不要的安裝包
npx create-react-app react-basic-axios
# 去安裝好的資料夾
cd react-basic-axios
# 啟動
npm start

#OK 接著安裝 axios和dotenv
npm i axios dotenv
# 在src資料夾加入apis資料夾，接著新增2個檔案檔案
# instance.js
# api.js
#在根目錄新增.env環境超級全域變數用的檔案
    #   // 修改baseUrl的方式在apis/instance.js下方try裡面加入
    #   // apiInstance({ url: url, baseURL: 'http://new-url.com' })


# 完成開發
npm run build

```

## 參考文章(我是將 3 篇融合)

這篇單純是 Vue

https://ithelp.ithome.com.tw/articles/10273786

這篇沒有封裝 try catch

https://medium.com/i-am-mike/%E4%BD%BF%E7%94%A8axios%E6%99%82%E4%BD%A0%E7%9A%84api%E9%83%BD%E6%80%8E%E9%BA%BC%E7%AE%A1%E7%90%86-557d88365619

這篇多包一層

https://ithelp.ithome.com.tw/articles/10230336
