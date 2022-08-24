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