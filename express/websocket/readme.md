# nodejs-websocket 筆記

https://juejin.cn/post/6863437773571883021

```js
前端
    js 原生就有 new WebSocket
    socket.addEventListener
    [close, error, message, open]

    socket.send
    socket.close
後端
    broadcast廣播string
        type, msg, time
    ws.createServer => connect
        connect.send
        connect.on
            text close error
```
