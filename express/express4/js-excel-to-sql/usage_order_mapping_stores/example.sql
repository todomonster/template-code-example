SELECT *
FROM coupon_coupon_usages
WHERE store_id > 0
    AND used_at > date('2022-04-01 00:00:00')
    AND used_at < date('2022-05-01 00:00:00')
    AND store_id = 3
    AND paytype = 2;
;
SELECT *
FROM mobile_official
WHERE 結帳時間 < date('2022-05-1 00:00:00')
    AND 結帳時間 > date('2022-04-01 00:00:00')
    AND 店別 = '台北衡陽店';
;