fixTime 負責將原本coupon日期只有抓到 5/1~5/18 => 5/1~5/31
修改日期的概念

寫一支補未使用coupon的程式 (其實是搬移月份啦)

1.首先刪除多餘的 有算過數量了 留下5月多的
後來想想先搬再砍掉也是一個作法 好處是有彈性

DELETE  FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-04' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 19303;
DELETE  FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-05' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 31764;

2.再來
從4月搬到固定數量
3780 6月
2549 7月
2597 8月
運用RAND()亂數排序搬移方式移動月份和日期
記得 used_at 要null!，只有改到期日和

程式碼要補上月份客製化

SELECT *  FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-04' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 3780;
SELECT *  FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-04' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 2549;
SELECT *  FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-04' AND store_id=0 AND expired_at LIKE('%23:59:59') ORDER BY RAND() LIMIT 2597;

等等 未使用的券要排除 無限日期捏!! 沒事 因為expired_at LIKE('%23:59:59') 已經過濾掉了!

---

新的gas.js負責加入 flag 證明是瓦斯產生的

EX: 
有使用
    行動支付
        SELECT id  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-06' AND paytype=1 AND store_id>0;
    現金支付
        SELECT id  FROM coupon_coupon_usages WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-06' AND paytype=2 AND store_id>0;
未使用
    SELECT *  FROM coupon_coupon_usages WHERE  DATE_FORMAT(taken_at,'%Y-%m') = '2022-06' AND store_id=0 ORDER BY taken_at;

都一樣掛上 ORDER BY RAND() LIMIT
    1464	
    976
    465