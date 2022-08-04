/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 100424
Source Host           : 127.0.0.1:3306
Source Database       : test1

Target Server Type    : MYSQL
Target Server Version : 100424
File Encoding         : 65001

Date: 2022-08-03 14:56:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cash
-- ----------------------------
DROP TABLE IF EXISTS `cash`;
CREATE TABLE `cash` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `店別` varchar(16) DEFAULT NULL,
  `銷售單號` varchar(16) DEFAULT NULL,
  `機號` varchar(16) DEFAULT NULL,
  `顧客編號` varchar(16) DEFAULT NULL,
  `顧客姓名` varchar(16) DEFAULT NULL,
  `持卡人` varchar(16) DEFAULT NULL,
  `付款方式` varchar(16) DEFAULT NULL,
  `款項金額` float DEFAULT NULL,
  `結帳時間` datetime DEFAULT NULL,
  `註記` varchar(16) DEFAULT NULL,
  `結帳員工` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=985900 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cash
-- ----------------------------
INSERT INTO `cash` VALUES ('985892', '平鎮環南店', '8300095591', '83', '', '', '', '現金', '60', '2022-06-30 22:23:00', '', '平鎮環南店員');
INSERT INTO `cash` VALUES ('985893', '中壢中央店', '3900125683', '39', '', '', '', '現金', '60', '2022-06-30 22:24:00', '', '中壢中央店員');
INSERT INTO `cash` VALUES ('985894', '中壢中央店', '3900125682', '39', '', '', '', '現金', '55', '2022-06-30 22:24:00', '', '中壢中央店員');
INSERT INTO `cash` VALUES ('985895', '平鎮環南店', '8300095592', '83', '', '', '', '現金', '70', '2022-06-30 22:30:00', '', '平鎮環南店員');
INSERT INTO `cash` VALUES ('985896', '平鎮環南店', '8300095593', '83', '', '', '', '現金', '30', '2022-06-30 22:36:00', '', '平鎮環南店員');
INSERT INTO `cash` VALUES ('985897', '平鎮環南店', '8300095594', '83', '', '', '', '現金', '45', '2022-06-30 22:39:00', '', '平鎮環南店員');
INSERT INTO `cash` VALUES ('985898', '平鎮環南店', '8300095595', '83', '', '', '', '現金', '30', '2022-06-30 22:40:00', '', '平鎮環南店員');
INSERT INTO `cash` VALUES ('985899', '平鎮環南店', '8300095598', '83', '', '', '', '現金', '337', '2022-06-30 23:05:00', '', '平鎮環南店員');
SET FOREIGN_KEY_CHECKS=1;
