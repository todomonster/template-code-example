SELECT (id) as '4月' FROM `mobile` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-04' LIMIT 18013;
SELECT (id) as '5月' FROM `mobile` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-05' LIMIT 18131;
SELECT (id) as '6月' FROM `mobile` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-06' LIMIT 26253;
SELECT (id) as '7月' FROM `mobile` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-07' LIMIT 18593;
SELECT (id) as '8月' FROM `mobile` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-08' LIMIT 17083;

SELECT (id) as "4月" FROM `cash` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-04' LIMIT 29296;
SELECT (id) as "5月" FROM `cash` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-05' LIMIT 30189;
SELECT (id) as "6月" FROM `cash` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-06' LIMIT 35650;
SELECT (id) as "7月" FROM `cash` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-07' LIMIT 34976;
SELECT (id) as "8月" FROM `cash` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-08' LIMIT 24780;

---

SELECT COUNT(id) as '4月' FROM `mobile_official` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-04' ;
SELECT COUNT(id) as '5月' FROM `mobile_official` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-05' ;
SELECT COUNT(id) as '6月' FROM `mobile_official` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-06' ;
SELECT COUNT(id) as '7月' FROM `mobile_official` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-07' ;
SELECT COUNT(id) as '8月' FROM `mobile_official` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-08' ;

SELECT COUNT(id) as "4月" FROM `cash_official` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-04' ;
SELECT COUNT(id) as "5月" FROM `cash_official` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-05' ;
SELECT COUNT(id) as "6月" FROM `cash_official` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-06' ;
SELECT COUNT(id) as "7月" FROM `cash_official` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-07' ;
SELECT COUNT(id) as "8月" FROM `cash_official` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-08' ;
--------- 線上點餐
SELECT (id) as '5月',款項金額 FROM `mobile` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-05' 
AND 款項金額>300;

SELECT (id) as '6月',款項金額 FROM `mobile` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-06' 
AND 款項金額>300;

SELECT (id) as '7月',款項金額 FROM `mobile` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-07' 
AND 款項金額>300;

SELECT (id) as '8月',款項金額 FROM `mobile` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-08' 
AND 款項金額>270;



SELECT (id) as '5月',款項金額 FROM `cash` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-05' 
AND 款項金額>300;

SELECT (id) as '6月',款項金額 FROM `cash` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-06' 
AND 款項金額>300;

SELECT (id) as '7月',款項金額 FROM `cash` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-07' 
AND 款項金額>300;

SELECT (id) as '8月',款項金額 FROM `cash` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-08' 
AND 款項金額>300;

--------- 一般
SELECT (id) as '5月' FROM `mobile` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-05' LIMIT 2640;
SELECT (id) as '6月' FROM `mobile` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-06' LIMIT 3480;
SELECT (id) as '7月' FROM `mobile` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-07' LIMIT 5920;
SELECT (id) as '8月' FROM `mobile` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-08' LIMIT 6300;

SELECT (id) as "5月" FROM `cash` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-05' LIMIT 5360;
SELECT (id) as "6月" FROM `cash` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-06' LIMIT 8520;
SELECT (id) as "7月" FROM `cash` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-07' LIMIT 10080;
SELECT (id) as "8月" FROM `cash` WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-08' LIMIT 11700;

---
SELECT COUNT(id) as '4月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-04' AND  paytype=1;
SELECT COUNT(id) as '5月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-05' AND  paytype=1;
SELECT COUNT(id) as '6月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-06' AND  paytype=1;
SELECT COUNT(id) as '7月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-07' AND  paytype=1;
SELECT COUNT(id) as '8月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-08' AND  paytype=1;

SELECT COUNT(id) as '4月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-04' AND  paytype=2;
SELECT COUNT(id) as '5月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-05' AND  paytype=2;
SELECT COUNT(id) as '6月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-06' AND  paytype=2;
SELECT COUNT(id) as '7月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-07' AND  paytype=2;
SELECT COUNT(id) as '8月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-08' AND  paytype=2;

---
SELECT COUNT(id) as '4月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-04' AND  used_at LIKE '% 00:00:00';
SELECT COUNT(id) as '4月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-04' ;

SELECT COUNT(id) as '5月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-05' AND  used_at LIKE '% 00:00:00';
SELECT COUNT(id) as '5月' FROM `coupon_coupon_usages` WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-05' ;
---
--------- 線上點餐
-- AND (區域='台北' OR 區域='新北' OR 區域='桃園' OR 區域='台中' OR 區域='台南' OR 區域='高雄')

SELECT (id) as '5月',款項金額 FROM `mobile` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-05' 
AND (區域='台北' OR 區域='新北' OR 區域='桃園' OR 區域='台中' OR 區域='台南' OR 區域='高雄')
AND 款項金額>99 AND 款項金額<801;

SELECT (id) as '6月',款項金額 FROM `mobile` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-06' 
AND (區域='台北' OR 區域='新北' OR 區域='桃園' OR 區域='台中' OR 區域='台南' OR 區域='高雄')
AND 款項金額>99 AND 款項金額<801;

SELECT (id) as '7月',款項金額 FROM `mobile` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-07' 
AND (區域='台北' OR 區域='新北' OR 區域='桃園' OR 區域='台中' OR 區域='台南' OR 區域='高雄')
AND 款項金額>99 AND 款項金額<801;

SELECT (id) as '8月',款項金額 FROM `mobile` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-08' 
AND (區域='台北' OR 區域='新北' OR 區域='桃園' OR 區域='台中' OR 區域='台南' OR 區域='高雄')
AND 款項金額>99 AND 款項金額<801;

---

SELECT (id) as '5月',款項金額 FROM `cash` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-05' 
AND (區域='台北' OR 區域='新北' OR 區域='桃園' OR 區域='台中' OR 區域='台南' OR 區域='高雄')
AND 款項金額>99 AND 款項金額<801;

SELECT (id) as '6月',款項金額 FROM `cash` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-06' 
AND (區域='台北' OR 區域='新北' OR 區域='桃園' OR 區域='台中' OR 區域='台南' OR 區域='高雄')
AND 款項金額>99 AND 款項金額<801;

SELECT (id) as '7月',款項金額 FROM `cash` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-07' 
AND (區域='台北' OR 區域='新北' OR 區域='桃園' OR 區域='台中' OR 區域='台南' OR 區域='高雄')
AND 款項金額>99 AND 款項金額<801;

SELECT (id) as '8月',款項金額 FROM `cash` 
WHERE  DATE_FORMAT(結帳時間,'%Y-%m') = '2022-08' 
AND (區域='台北' OR 區域='新北' OR 區域='桃園' OR 區域='台中' OR 區域='台南' OR 區域='高雄')
AND 款項金額>99 AND 款項金額<801;
---
INSERT INTO `linelife`.`coupon_coupon_usages`
(`coupon_id`,
`store_id`,
`user_id`,
`taken_at`,
`used_at`,
`taken_id`,
`expired_at`,
`ref_to_user`,
`ref_by_user`,
`paytype`)
VALUES
---

UPDATE `coupon_coupon_usages` SET `id`='.' WHERE (`id`='549183') LIMIT 1

---
SELECT
coupon_coupon_usages.user_id as LineID,
coupon_coupon_usages.taken_id as CouponID,
coupon_coupon_usages.taken_at as '獲取時間',
coupon_coupon_usages.used_at as '使用時間',
coupon_coupon_usages.paytype as '付款方式'
FROM `coupon_coupon_usages`

WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-04' AND  paytype=1
ORDER BY expired_at

WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-05' AND  paytype=1
ORDER BY expired_at

WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-06' AND  paytype=1
ORDER BY expired_at

WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-07' AND  paytype=1
ORDER BY expired_at

WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-08' AND  paytype=1
ORDER BY expired_at

---
WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-04' AND  paytype=2
ORDER BY expired_at

WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-05' AND  paytype=2
ORDER BY expired_at

WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-06' AND  paytype=2
ORDER BY expired_at

WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-07' AND  paytype=2
ORDER BY expired_at

WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-08' AND  paytype=2
ORDER BY expired_at

---
SELECT
*
FROM `online_orders`
WHERE  DATE_FORMAT(used_at,'%Y-%m') = '2022-08' AND  paytype=2


UPDATE `online_orders` SET `create_at`=date('2022/12/31 12:00:00');
SELECT * FROM `online_orders` WHERE create_at =date('2022/12/31 12:00:00');

---
SELECT
coupon_coupon_usages.user_id as LineID,
coupon_coupon_usages.taken_id as CouponID,
coupon_coupon_usages.taken_at as '獲取時間',
coupon_coupon_usages.paytype as '付款方式'
FROM `coupon_coupon_usages`

WHERE ref_by_user="online" AND DATE_FORMAT(taken_at,'%Y-%m') = '2022-05' AND  paytype=1
ORDER BY expired_at

WHERE ref_by_user="online" AND DATE_FORMAT(taken_at,'%Y-%m') = '2022-06' AND  paytype=1
ORDER BY expired_at

WHERE ref_by_user="online" AND DATE_FORMAT(taken_at,'%Y-%m') = '2022-07' AND  paytype=1
ORDER BY expired_at

WHERE ref_by_user="online" AND DATE_FORMAT(taken_at,'%Y-%m') = '2022-08' AND  paytype=1
ORDER BY expired_at

---
WHERE ref_by_user="online" AND DATE_FORMAT(taken_at,'%Y-%m') = '2022-05' AND  paytype=2
ORDER BY expired_at

WHERE ref_by_user="online" AND DATE_FORMAT(taken_at,'%Y-%m') = '2022-06' AND  paytype=2
ORDER BY expired_at

WHERE ref_by_user="online" AND DATE_FORMAT(taken_at,'%Y-%m') = '2022-07' AND  paytype=2
ORDER BY expired_at

WHERE ref_by_user="online" AND DATE_FORMAT(taken_at,'%Y-%m') = '2022-08' AND  paytype=2
ORDER BY expired_at

---

select user_id, COUNT(id) as times from coupon_coupon_usages
 WHERE DATE_FORMAT(taken_at,'%Y-%m') = '2022-04'
 GROUP BY user_id
 ORDER BY times DESC;
--  user_id ASC;



select user_id,taken_id,taken_at,used_at  from coupon_coupon_usages
 WHERE DATE_FORMAT(used_at,'%Y-%m') = '2022-04' AND paytype = 1
 ORDER BY user_id ASC;