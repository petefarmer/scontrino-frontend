-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Server-Version: 10.1.19-MariaDB
-- PHP-Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `SIRSDB`
--

-- --------------------------------------------------------

--
-- table structure for table `SIRSvalues`
--

CREATE TABLE `SIRSvalues` (
  `IDPatient` int(11) NOT NULL,
  `temperature` int(11) NOT NULL,
  `heartRate` int(11) NOT NULL,
  `respRate` int(11) NOT NULL,
  `PaCO2` int(11) NOT NULL,
  `WBcellCount` int(11) NOT NULL,
  `immatureBand` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data for Table `SIRSvalues`
--

INSERT INTO `SIRSvalues` (`IDPatient`, `temperature`, `heartRate`, `respRate`, `PaCO2`, `WBcellCount`, `immatureBand`) VALUES
(123, 39, 89, 23, 33, 3965, 16),
(124, 37, 92, 15, 29, 11194, 9),
(125, 37, 82, 21, 32, 9985, 10);

-- --------------------------------------------------------

--
-- table structure for table `SIRSvalues2`
--

CREATE TABLE `SIRSvalues2` (
  `IDPatient` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `temperature` int(11) NOT NULL,
  `heartRate` int(11) NOT NULL,
  `respRate` int(11) NOT NULL,
  `PaCO2` int(11) NOT NULL,
  `WBcellCount` int(11) NOT NULL,
  `immatureBand` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data for Table `SIRSvalues2`
--

INSERT INTO `SIRSvalues2` (`IDPatient`, `Date`, `temperature`, `heartRate`, `respRate`, `PaCO2`, `WBcellCount`, `immatureBand`) VALUES
(123, '2016-08-22 09:30:27', 39, 89, 23, 33, 3965, 16),
(123, '2016-08-22 10:22:38', 37, 80, 17, 35, 11256, 12),
(123, '2016-08-22 15:29:23', 37, 110, 25, 34, 13654, 8),
(123, '2016-08-21 14:18:22', 39, 80, 16, 31, 7563, 11),
(124, '2016-08-22 13:23:34', 35, 82, 21, 32, 13652, 10),
(124, '2016-08-22 11:50:12', 37, 85, 19, 33, 7569, 11),
(125, '2016-08-22 18:31:24', 35, 82, 21, 32, 13652, 10);


