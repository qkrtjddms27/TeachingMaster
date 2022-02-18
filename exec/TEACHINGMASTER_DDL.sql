-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: i6e107.p.ssafy.io    Database: ssafy_web_db
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

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
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcement` (
  `announcement_index` bigint NOT NULL AUTO_INCREMENT,
  `announcement_date` datetime(6) DEFAULT NULL,
  `announcement_memo` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `announcement_score` int NOT NULL,
  `student_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`announcement_index`),
  KEY `FKt2h4cve1y1csn097nvxghkpmd` (`student_id`),
  KEY `FKiyptpr2q3m60hxqwto4rpe5uv` (`user_id`),
  CONSTRAINT `FKiyptpr2q3m60hxqwto4rpe5uv` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKt2h4cve1y1csn097nvxghkpmd` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `quiz_id` bigint NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`quiz_id`,`user_id`),
  KEY `FK3ogdxsxa4tx6vndyvpk1fk1am` (`user_id`),
  CONSTRAINT `FK3ogdxsxa4tx6vndyvpk1fk1am` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK5yfu4ckvgfe41co71504lvcow` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`quiz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `conference`
--

DROP TABLE IF EXISTS `conference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference` (
  `conference_id` bigint NOT NULL AUTO_INCREMENT,
  `call_end_time` datetime(6) DEFAULT NULL,
  `call_start_time` datetime(6) DEFAULT NULL,
  `conference_title` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `lesson_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `thumbnail_url` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rood_id` bigint DEFAULT NULL,
  PRIMARY KEY (`conference_id`),
  KEY `FKo3v3gjuiot0j4lfmqro7r65is` (`rood_id`),
  CONSTRAINT `FKo3v3gjuiot0j4lfmqro7r65is` FOREIGN KEY (`rood_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `conference_history`
--

DROP TABLE IF EXISTS `conference_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference_history` (
  `conference_index` int NOT NULL AUTO_INCREMENT,
  `conference_date` date DEFAULT NULL,
  `conference_end_time` time DEFAULT NULL,
  `conference_start_time` time DEFAULT NULL,
  `conference_id` bigint DEFAULT NULL,
  PRIMARY KEY (`conference_index`),
  KEY `FKda70ddbr5qsee4nr5e2h8yjhq` (`conference_id`),
  CONSTRAINT `FKda70ddbr5qsee4nr5e2h8yjhq` FOREIGN KEY (`conference_id`) REFERENCES `conference` (`conference_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `conference_log`
--

DROP TABLE IF EXISTS `conference_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference_log` (
  `conference_long_id` bigint NOT NULL AUTO_INCREMENT,
  `event` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `event_time` datetime(6) DEFAULT NULL,
  `conference_id` bigint DEFAULT NULL,
  `conference_index` int DEFAULT NULL,
  `student_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`conference_long_id`),
  KEY `FKm5sk2iron0j13mw2m15toecsm` (`conference_id`),
  KEY `FKcmuocl3tti8t5fcae7540lo8` (`conference_index`),
  KEY `FKnfbbv8o78tpamqs0nmhn0meci` (`student_id`),
  CONSTRAINT `FKcmuocl3tti8t5fcae7540lo8` FOREIGN KEY (`conference_index`) REFERENCES `conference_history` (`conference_index`),
  CONSTRAINT `FKm5sk2iron0j13mw2m15toecsm` FOREIGN KEY (`conference_id`) REFERENCES `conference` (`conference_id`),
  CONSTRAINT `FKnfbbv8o78tpamqs0nmhn0meci` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `folder`
--

DROP TABLE IF EXISTS `folder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `folder` (
  `folder_id` bigint NOT NULL AUTO_INCREMENT,
  `folder_name` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`folder_id`),
  KEY `FK5fd2civdi8s832iyrufpk400k` (`user_id`),
  CONSTRAINT `FK5fd2civdi8s832iyrufpk400k` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `folder_quiz`
--

DROP TABLE IF EXISTS `folder_quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `folder_quiz` (
  `folder_quiz_id` bigint NOT NULL AUTO_INCREMENT,
  `folder_id` bigint DEFAULT NULL,
  `quiz_id` bigint DEFAULT NULL,
  PRIMARY KEY (`folder_quiz_id`),
  KEY `FKkssy85t2f52865tya4oj7t893` (`folder_id`),
  KEY `FKjjppt91uskn3c0jj3jpe48mh0` (`quiz_id`),
  CONSTRAINT `FKjjppt91uskn3c0jj3jpe48mh0` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`quiz_id`),
  CONSTRAINT `FKkssy85t2f52865tya4oj7t893` FOREIGN KEY (`folder_id`) REFERENCES `folder` (`folder_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `memo`
--

DROP TABLE IF EXISTS `memo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memo` (
  `student_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `memo_content` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `memo_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`student_id`,`user_id`),
  KEY `FK5vlmhksso19pshk0ac1qo1p82` (`user_id`),
  CONSTRAINT `FK5vlmhksso19pshk0ac1qo1p82` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKnmuvbe8d3krfy32xpsvxu7exu` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `quiz_id` bigint NOT NULL AUTO_INCREMENT,
  `open_status` bit(1) DEFAULT NULL,
  `option1` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `option2` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `option3` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `option4` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quiz_answer` int NOT NULL,
  `quiz_contents` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `quiz_grade` int NOT NULL,
  `quiz_photo` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quiz_timeout` int NOT NULL,
  `quiz_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `subject` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`quiz_id`),
  KEY `FK1tofsm1qynhakggx7ttqh8ihu` (`user_id`),
  CONSTRAINT `FK1tofsm1qynhakggx7ttqh8ihu` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quiz_log`
--

DROP TABLE IF EXISTS `quiz_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_log` (
  `quiz_id` bigint NOT NULL,
  `student_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `quiz_date` datetime(6) DEFAULT NULL,
  `quiz_result` bit(1) DEFAULT NULL,
  `student_answer` int NOT NULL,
  PRIMARY KEY (`quiz_id`,`student_id`),
  KEY `FKej81qs952sf66w3wuf9ev4veq` (`student_id`),
  CONSTRAINT `FKbkbhutjtgu4wx0jth3bpb3tcq` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`quiz_id`),
  CONSTRAINT `FKej81qs952sf66w3wuf9ev4veq` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` bigint NOT NULL AUTO_INCREMENT,
  `room_grade` int NOT NULL,
  `room_num` int NOT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `counting_star` int NOT NULL,
  `parents_name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `parents_phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `relation` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `student_email` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `student_name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `student_phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `student_profile` longtext COLLATE utf8mb4_general_ci,
  `student_score` int NOT NULL,
  `room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `FKp18j1374fj5si14u9xjty9b2o` (`room_id`),
  CONSTRAINT `FKp18j1374fj5si14u9xjty9b2o` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `master` bit(1) NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_homeroom` bit(1) NOT NULL,
  `user_name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `user_profile` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FKr7pfjaqkuj79ip1vhtfu0ypa5` (`room_id`),
  CONSTRAINT `FKr7pfjaqkuj79ip1vhtfu0ypa5` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18  2:57:08
