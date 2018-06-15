USE SIRSDB;
DROP TABLE IF EXISTS `sirsvalues`;
CREATE TABLE `sirsvalues`(
`id` int(11) NOT NULL AUTO_INCREMENT,
`IDPatient` int(11) NOT NULL,
`temperature` int(11),
`heartRate` int(11),
`respRate` int(11),
`PaCO2` int(11),
`WBcellCount` int(11),
`immatureBand` int(11),
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `sirsvalues` VALUES (NULL,123,39,89,23,33,3965,16);
INSERT INTO `sirsvalues` VALUES (NULL,124,37,92,15,29,11194,9);
INSERT INTO `sirsvalues` VALUES (NULL,125,35,82,21,32,13652,10);
