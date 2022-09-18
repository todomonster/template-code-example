## compareMenu.js

    0829 修改 online_orders
    建立訂單明細 修改金額

```js
// ## itemList.js
// 裡面有變數finalMenu 是從萬波那邊拿到的菜單JSON物件

// compareMenu.js依照菜單轉乘需要的格式:
// 會產生像是這樣的檔案
const newOrder = [
  {
    id: 1,
    line_id: "Ubb3d6dbb9da9c7dbc6c5ae85c0acd601",
    store_id: 23,
    store_name: "三重正義店",
    order_price: 205,
    create_at: "2022-05-18T07:30:00.000Z",
    order_amount: 5,
    order_detail: [
      { id: "220501", name: "萬波奶茶", classId: "2205", price: 35 },
      { id: "220304", name: "冬瓜檸檬", classId: "2203", price: 40 },
      { id: "220301", name: "冬瓜四季春", classId: "2203", price: 30 },
      { id: "220606", name: "蘭葉三混圓", classId: "2206", price: 55 },
      { id: "220703", name: "黑糖薑茶", classId: "2207", price: 45 },
    ],
    coupon_id: "99f6d749-a20f-e266-f61b-897a2e07070",
    pay_type: 2,
    origin_price: 300,
  },
];
```


## genCoupon 進階版

## online-generator 第一版產 coupon
