## A. fixTime

fixTime 負責將原本 coupon 日期只有抓到 5/1~5/18 => 5/1~5/31

修改日期的概念

## B. fixNotUsedCouponTime

```md
寫一支補未使用 coupon 的程式 (其實是搬移月份啦)

1.首先刪除多餘的 有算過數量了 留下 5 月多的
後來想想先搬再砍掉也是一個作法 好處是有彈性

DELETE FROM coupon_coupon_usages WHERE DATE_FORMAT(taken_at,'%Y-%m') = '2022-04' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 19303;
DELETE FROM coupon_coupon_usages WHERE DATE_FORMAT(taken_at,'%Y-%m') = '2022-05' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 31764;

2.再來
從 4 月搬到固定數量
3780 6 月
2549 7 月
2597 8 月
運用 RAND()亂數排序搬移方式移動月份和日期
記得 used_at 要 null!，只有改到期日和

程式碼要補上月份客製化

SELECT _ FROM coupon_coupon_usages WHERE DATE_FORMAT(taken_at,'%Y-%m') = '2022-04' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 3780;
SELECT _ FROM coupon_coupon_usages WHERE DATE_FORMAT(taken_at,'%Y-%m') = '2022-04' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 2549;
SELECT \* FROM coupon_coupon_usages WHERE DATE_FORMAT(taken_at,'%Y-%m') = '2022-04' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 2597;

等等 未使用的券要排除 無限日期捏!! 沒事 因為 expired_at LIKE('%23:59:59') 已經過濾掉了!
```

## C.newGas
產生瓦斯自報度數

產生瓦斯電子帳單
