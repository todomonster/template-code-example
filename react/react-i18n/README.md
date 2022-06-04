├─public
│  └─locales //字典檔
│      ├─en
│      │ └─translation.json
│      ├─es
│      │ └─translation.json
│      ├─jp
│      │ └─translation.json
│      └─zh-tw
│        └─translation.json
└─src
   ├─index.js //import i18n.js & testTranslation.js 
   ├─package.json
   └─i18nTest 
        ├─i18n.js   //i18n設定檔
        └─testTranslation.js  //主要內容

# 問題
i18nKey 功能是什麼?
為Trans元件接收語言json檔的key值，並返回value
<Trans i18nKey="key值">

Suspense 是什麼?
fallback ?
https://www.gss.com.tw/blog/react-suspense-1


React.StrictMode ?
https://www.jianshu.com/p/978bcea8fcb9

參考資料:
https://medium.com/@a401120174/%E4%BD%BF%E7%94%A8-react-i18next-%E4%BE%86%E6%89%93%E9%80%A0%E5%A4%9A%E5%9C%8B%E8%AA%9E%E8%A8%80%E7%B6%B2%E7%AB%99%E5%90%A7-i18n-5b9c70c05d24