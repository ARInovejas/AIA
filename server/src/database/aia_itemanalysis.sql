-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: aia
-- ------------------------------------------------------
-- Server version	5.7.29-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `itemanalysis`
--
use aia;
DROP TABLE IF EXISTS `itemanalysis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemanalysis` (
  `empno` int(11) NOT NULL,
  `itemanalysis_id` int(11) NOT NULL AUTO_INCREMENT,
  `total_rawscore` int(11) NOT NULL DEFAULT '0',
  `total_num_of_students` int(11) NOT NULL DEFAULT '0',
  `number_of_items` int(11) NOT NULL DEFAULT '50',
  `mean` int(11) NOT NULL DEFAULT '0',
  `students_above_mean` int(11) NOT NULL DEFAULT '0',
  `students_equals_mean` int(11) NOT NULL DEFAULT '0',
  `students_below_mean` int(11) NOT NULL DEFAULT '0',
  `section` varchar(50) NOT NULL,
  PRIMARY KEY (`itemanalysis_id`),
  KEY `itemanalysis_empno_fk` (`empno`),
  CONSTRAINT `itemanalysis_empno_fk` FOREIGN KEY (`empno`) REFERENCES `teacher` (`empno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemanalysis`
--

LOCK TABLES `itemanalysis` WRITE;
/*!40000 ALTER TABLE `itemanalysis` DISABLE KEYS */;
/*INSERT INTO `itemanalysis` VALUES (1,1,0,0,50,0,0,0,0,'Mabini'),(1,2,0,0,50,0,0,0,0,'Rizal'),(2,3,0,0,50,0,0,0,0,'Rizal');
/*!40000 ALTER TABLE `itemanalysis` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-20 18:12:37
