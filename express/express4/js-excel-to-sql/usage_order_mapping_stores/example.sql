SELECT *
FROM coupon_coupon_usages
WHERE used_at > date('2022-04-01 00:00:00')
    AND used_at < date('2022-05-01 00:00:00')
    -- AND store_id = 3
    AND paytype = 2;
;
SELECT *
FROM coupon_coupon_usages
WHERE paytype = 2
AND used_at > date('2022-04-01 00:00:00')
AND used_at < date('2022-05-01 00:00:00')
AND (store_id=3 OR store_id=4 OR store_id=5 OR store_id=6 OR store_id=7 OR store_id=8 OR store_id=9 OR store_id=10 OR store_id=11 OR store_id=12 OR store_id=13 OR store_id=14 OR store_id=15)
;

-- GET 每月份的 資料筆數
SELECT COUNT(id) FROM `mobile_official` WHERE 結帳時間 > date('2022-04-01') AND 結帳時間 < date('2022-05-01');