畫面運作: 點超連結→轉換到相對應畫面

程式運作:
1.點Link組件，to會改變網址，但不會刷新頁面
<Link to="/hyo">hyo</Link>

2.Route判斷目前網址，並刷新頁面
<Route path="/hyo" element={ <某個component /> } />
(像node課程教到的express，根據網址渲染畫面)

補充:在Route內加入exact就會進行嚴格比對path
<Route exact path="/hyo" element={ <另一個component /> } />

參考資料:
https://ithelp.ithome.com.tw/articles/10204137 (作者雖使用的是較舊版的react-router，覺得他的講解蠻清晰且有附圖)
https://codesandbox.io/s/gifted-easley-jghgu (像codePen的網站有展示react-router，可以玩看看)