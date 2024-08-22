# 說明文件

<https://developers.google.com/youtube/iframe_api_reference?hl=zh-tw>

## 重點

- autoplay=1
  - 想要自動播放需要先和網頁 DOM 互動過! 否則不會自動播放
  - autoplay=1&mute=0 可以播放但是沒聲音

## Exmaple-1

### player-ended.html

這邊範例是用 自動插入 script 方式

```js
// 加載 IFrame Player API
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
```

個人是推薦一開始就注入

```html
<script src="https://www.youtube.com/iframe_api"></script>
```

===

new YT.Player 接受 2 個參數
元素 id 字串
{參數}

要注意的是該元素會變成 <iframe>
所以有包 class 的記得要套 2 層

```js
// 參數說明
player = new window.YT.Player("myYTplayer", {
  height: "360",
  width: "640",
  videoId: "yspWm_Y1NUM", // 在此替換成你要播放的影片ID
  playerVars: {
    autoplay: 1, //自動播放
    controls: 1, //控制列表
    fs: 0, // fullscreen
    rel: 0, // 影片結束後不顯示推薦影片
  },
  // 事件
  events: {
    onStateChange: onPlayerStateChange,
  },
});
// YT.PlayerState = {
//     "UNSTARTED": -1,
//     "ENDED": 0,
//     "PLAYING": 1,
//     "PAUSED": 2,
//     "BUFFERING": 3,
//     "CUED": 5 //已準備好 ex 清單
// }
```

===

有注入 script OK 時會觸發這個 function
onYouTubeIframeAPIReady

## Exmaple-2

### vue3_cdn_player_ended.html

這個是 vue3 option api 的範例

重點在把封裝進 vue 的 function 在 mounted 的時候做 onYouTubeIframeAPIReady

記得是先引用 vue 才引入 youtube script

=> 當成yt api 必定成功載入