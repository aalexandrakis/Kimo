-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Host: 127.3.55.130:3306
-- Generation Time: Nov 30, 2014 at 12:15 AM
-- Server version: 5.5.40
-- PHP Version: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `kimo`
--
CREATE DATABASE IF NOT EXISTS `kimo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `kimo`;

-- --------------------------------------------------------

--
-- Table structure for table `active_bets`
--

DROP TABLE IF EXISTS `active_bets`;
CREATE TABLE IF NOT EXISTS `active_bets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `betId` bigint(20) DEFAULT '0',
  `betDateTime` char(19) COLLATE utf8_unicode_ci NOT NULL,
  `userId` bigint(20) NOT NULL,
  `repeatedDraws` int(11) NOT NULL,
  `randomChoice` int(11) NOT NULL,
  `gameType` int(11) NOT NULL,
  `betCoins` float NOT NULL,
  `multiplier` int(11) NOT NULL,
  `betNumber1` int(11) NOT NULL,
  `betNumber2` int(11) NOT NULL,
  `betNumber3` int(11) NOT NULL,
  `betNumber4` int(11) NOT NULL,
  `betNumber5` int(11) NOT NULL,
  `betNumber6` int(11) NOT NULL,
  `betNumber7` int(11) NOT NULL,
  `betNumber8` int(11) NOT NULL,
  `betNumber9` int(11) NOT NULL,
  `betNumber10` int(11) NOT NULL,
  `betNumber11` int(11) NOT NULL,
  `betNumber12` int(11) NOT NULL,
  `drawTimeStamp` char(19) COLLATE utf8_unicode_ci NOT NULL,
  `matches` int(11) DEFAULT NULL,
  `returnRate` float DEFAULT NULL,
  `draws` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `betDateTime` (`betDateTime`,`userId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=23 ;

--
-- Dumping data for table `active_bets`
--

INSERT INTO `active_bets` (`id`, `betId`, `betDateTime`, `userId`, `repeatedDraws`, `randomChoice`, `gameType`, `betCoins`, `multiplier`, `betNumber1`, `betNumber2`, `betNumber3`, `betNumber4`, `betNumber5`, `betNumber6`, `betNumber7`, `betNumber8`, `betNumber9`, `betNumber10`, `betNumber11`, `betNumber12`, `drawTimeStamp`, `matches`, `returnRate`, `draws`) VALUES
(20, 489, '2014-11-29 23:47:56', 10, 1, 0, 5, 0.5, 1, 1, 15, 29, 43, 57, 0, 0, 0, 0, 0, 0, 0, '', NULL, NULL, 0),
(21, 490, '2014-11-29 23:48:00', 10, 1, 0, 12, 0.5, 1, 1, 6, 9, 19, 21, 30, 32, 38, 40, 49, 55, 62, '', NULL, NULL, 0),
(22, 491, '2014-11-30 00:17:15', 10, 1, 0, 6, 0.5, 1, 1, 15, 43, 29, 57, 71, 0, 0, 0, 0, 0, 0, '', NULL, NULL, 0);

--
-- Triggers `active_bets`
--
DROP TRIGGER IF EXISTS `getBetId`;
DELIMITER //
CREATE TRIGGER `getBetId` BEFORE INSERT ON `active_bets`
 FOR EACH ROW BEGIN
update bet_id set betId = betId + 1 where id = 1;
SET NEW.betId = (Select betId from bet_id where id = 1);
END
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `bet_id`
--

DROP TABLE IF EXISTS `bet_id`;
CREATE TABLE IF NOT EXISTS `bet_id` (
  `id` int(11) NOT NULL,
  `betId` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `bet_id`
--

INSERT INTO `bet_id` (`id`, `betId`) VALUES
(1, 491);

-- --------------------------------------------------------

--
-- Table structure for table `bets_archive`
--

DROP TABLE IF EXISTS `bets_archive`;
CREATE TABLE IF NOT EXISTS `bets_archive` (
  `betId` bigint(20) NOT NULL,
  `betDateTime` char(19) COLLATE utf8_unicode_ci NOT NULL,
  `userId` bigint(20) NOT NULL,
  `repeatedDraws` int(11) NOT NULL,
  `randomChoice` int(11) NOT NULL,
  `gameType` int(11) NOT NULL,
  `betCoins` float NOT NULL,
  `multiplier` int(11) NOT NULL,
  `betNumber1` int(11) NOT NULL,
  `betNumber2` int(11) NOT NULL,
  `betNumber3` int(11) NOT NULL,
  `betNumber4` int(11) NOT NULL,
  `betNumber5` int(11) NOT NULL,
  `betNumber6` int(11) NOT NULL,
  `betNumber7` int(11) NOT NULL,
  `betNumber8` int(11) NOT NULL,
  `betNumber9` int(11) NOT NULL,
  `betNumber10` int(11) NOT NULL,
  `betNumber11` int(11) NOT NULL,
  `betNumber12` int(11) NOT NULL,
  `drawTimeStamp` char(19) COLLATE utf8_unicode_ci NOT NULL,
  `matches` int(11) NOT NULL,
  `returnRate` float DEFAULT NULL,
  `draws` int(11) NOT NULL DEFAULT '0',
  `notified` int(11) DEFAULT '0',
  KEY `betDateTime` (`userId`),
  KEY `betId` (`betId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `draw`
--

DROP TABLE IF EXISTS `draw`;
CREATE TABLE IF NOT EXISTS `draw` (
  `drawDateTime` char(19) COLLATE utf8_unicode_ci NOT NULL,
  `drawNumber1` int(11) NOT NULL,
  `drawNumber2` int(11) NOT NULL,
  `drawNumber3` int(11) NOT NULL,
  `drawNumber4` int(11) NOT NULL,
  `drawNumber5` int(11) NOT NULL,
  `drawNumber6` int(11) NOT NULL,
  `drawNumber7` int(11) NOT NULL,
  `drawNumber8` int(11) NOT NULL,
  `drawNumber9` int(11) NOT NULL,
  `drawNumber10` int(11) NOT NULL,
  `drawNumber11` int(11) NOT NULL,
  `drawNumber12` int(11) NOT NULL,
  `drawNumber13` int(11) NOT NULL,
  `drawNumber14` int(11) NOT NULL,
  `drawNumber15` int(11) NOT NULL,
  `drawNumber16` int(11) NOT NULL,
  `drawNumber17` int(11) NOT NULL,
  `drawNumber18` int(11) NOT NULL,
  `drawNumber19` int(11) NOT NULL,
  `drawNumber20` int(11) NOT NULL,
  PRIMARY KEY (`drawDateTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Draws table';

--
-- Dumping data for table `draw`
--

INSERT INTO `draw` (`drawDateTime`, `drawNumber1`, `drawNumber2`, `drawNumber3`, `drawNumber4`, `drawNumber5`, `drawNumber6`, `drawNumber7`, `drawNumber8`, `drawNumber9`, `drawNumber10`, `drawNumber11`, `drawNumber12`, `drawNumber13`, `drawNumber14`, `drawNumber15`, `drawNumber16`, `drawNumber17`, `drawNumber18`, `drawNumber19`, `drawNumber20`) VALUES
('2014-11-29 21:33:08', 1, 19, 20, 21, 22, 27, 31, 42, 43, 44, 45, 49, 52, 54, 58, 63, 64, 67, 75, 76);

-- --------------------------------------------------------

--
-- Table structure for table `next_draw`
--

DROP TABLE IF EXISTS `next_draw`;
CREATE TABLE IF NOT EXISTS `next_draw` (
  `id` int(11) NOT NULL,
  `nextDraw` char(19) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `next_draw`
--

INSERT INTO `next_draw` (`id`, `nextDraw`) VALUES
(1, '2014-11-30 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
CREATE TABLE IF NOT EXISTS `payments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `payDateTime` text COLLATE utf8_unicode_ci NOT NULL,
  `userId` int(11) NOT NULL,
  `payKey` text COLLATE utf8_unicode_ci NOT NULL,
  `tranId` char(100) COLLATE utf8_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `status` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`,`userId`),
  UNIQUE KEY `tranId` (`tranId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=11 ;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `payDateTime`, `userId`, `payKey`, `tranId`, `amount`, `status`) VALUES
(1, '2014-10-25T11:42:31.480-07:00', 10, 'AP-7UL16059F7644532J', '4EX820801G9728508', 1, 'COMPLETED'),
(3, '2014-10-25T12:59:49.699-07:00', 10, 'AP-68T31275M9959004T', '84Y25980VB140441J', 1, 'COMPLETED'),
(4, '2014-10-25T13:30:00.041-07:00', 10, 'AP-8S352180L4814974V', '7CR440889W330473Y', 2, 'PENDING'),
(5, '2014-10-25T13:35:30.540-07:00', 10, 'AP-3PV22374ME761425D', '53J6490148372550F', 2, 'COMPLETED'),
(7, '2014-10-25T14:04:56.973-07:00', 10, 'AP-6S4022332Y722780T', '71X20137F6367405F', 2, 'PENDING'),
(8, '2014-10-25T14:08:49.723-07:00', 10, 'AP-8FH41413NG3701829', '5DX621709M388204T', 2, 'COINS NOT ADDED TO USER ACCOUNT'),
(9, '2014-10-25T14:10:34.894-07:00', 10, 'AP-883454337T741333J', '99547923E87536354', 2, 'COMPLETED'),
(10, '2014-10-25T14:20:33.705-07:00', 10, 'AP-9H673300DC7790206', '9ES29068HU839020P', 4, 'COMPLETED');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userId` bigint(20) NOT NULL AUTO_INCREMENT,
  `userName` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `userEmail` char(100) COLLATE utf8_unicode_ci NOT NULL,
  `userPassword` char(160) COLLATE utf8_unicode_ci NOT NULL,
  `userCoins` float NOT NULL,
  `userLevel` int(11) NOT NULL,
  `regId` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userName` (`userName`,`userEmail`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Users' AUTO_INCREMENT=39 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userEmail`, `userPassword`, `userCoins`, `userLevel`, `regId`) VALUES
(10, 'aalexand', 'aalexandrakis@hotmail.com', 'e9d71f5ee7c92d6dc9e92ffdad17b8bd49418f98', 1853.3, 0, 'APA91bGRb3Ad70sqWSUlNl4Jp2_EFLv8wXKW5dwUay3rSfsLPPbqD_XQQofWtw2q27e8bjz5ZEYAC5zL-uaD3UofiplnrJBNp8IL888XveAByZdOA63A9zoktgOTurcaBkow40bnZKMN6lZZzvuVGAZ0L3UOraSVYRJ1qSb6kQhFL7BglCSmM8o'),
(38, 'kimodrawer', 'kimo@kimo.com', 'f8df04fa43781a7dbb062a6cc4d38739f9117648', 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `winners_per_draw`
--

DROP TABLE IF EXISTS `winners_per_draw`;
CREATE TABLE IF NOT EXISTS `winners_per_draw` (
  `drawDateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `betId` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
