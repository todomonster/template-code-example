/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 100424
Source Host           : 127.0.0.1:3306
Source Database       : test1

Target Server Type    : MYSQL
Target Server Version : 100424
File Encoding         : 65001

Date: 2022-08-03 15:02:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for mobile
-- ----------------------------
DROP TABLE IF EXISTS `mobile`;
CREATE TABLE `mobile` (
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
) ENGINE=InnoDB AUTO_INCREMENT=226854 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mobile
-- ----------------------------
INSERT INTO `mobile` VALUES ('226846', '中和環球店', '9500043251', '95', '', '', '', '悠遊卡', '120', '2022-06-30 20:08:00', '    ', '中和環球店員');
INSERT INTO `mobile` VALUES ('226847', '新店大坪林店', '0100057236', '01', '', '', '', '悠遊卡', '60', '2022-06-30 20:44:00', '    ', '新店大坪林店員');
INSERT INTO `mobile` VALUES ('226848', '桃園大園店', '0100037917', '01', '', '', '', '悠遊卡', '70', '2022-06-30 20:53:00', '7436', '桃園大園店員');
INSERT INTO `mobile` VALUES ('226849', '土城裕民店', '8900058855', '89', '', '', '', '悠遊卡', '50', '2022-06-30 20:56:00', '    ', '土城裕民店員');
INSERT INTO `mobile` VALUES ('226850', '三重正義店', '7300058019', '73', '', '', '', '悠遊卡', '60', '2022-06-30 21:04:00', '    ', '三重正義店員');
INSERT INTO `mobile` VALUES ('226851', '三重正義店', '7300058020', '73', '', '', '', '悠遊卡', '55', '2022-06-30 21:18:00', '    ', '三重正義店員');
INSERT INTO `mobile` VALUES ('226852', '台北士林店', '0100055789', '01', '', '', '', '悠遊卡', '88', '2022-06-30 21:18:00', '    ', '台北士林加盟主');
INSERT INTO `mobile` VALUES ('226853', '中壢中央店', '3900125665', '39', '', '', '', '悠遊卡', '90', '2022-06-30 21:28:00', '    ', '中壢中央店員');
SET FOREIGN_KEY_CHECKS=1;
