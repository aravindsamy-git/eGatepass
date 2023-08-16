-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 16, 2023 at 04:38 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `care_epass`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_info`
--

DROP TABLE IF EXISTS `admin_info`;
CREATE TABLE IF NOT EXISTS `admin_info` (
  `empid` varchar(50) NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `dept` varchar(100) DEFAULT NULL,
  `password1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Care@123',
  PRIMARY KEY (`empid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin_info`
--

INSERT INTO `admin_info` (`empid`, `username`, `dept`, `password1`) VALUES
('ad3cc', 'Testuser1', 'none', 'staff@123'),
('bwarden', 'testuser2', 'none', 'staff@123');

-- --------------------------------------------------------

--
-- Table structure for table `egatepass_info`
--

DROP TABLE IF EXISTS `egatepass_info`;
CREATE TABLE IF NOT EXISTS `egatepass_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rollno` varchar(50) DEFAULT NULL,
  `proposed_out_date` date DEFAULT NULL,
  `proposed_in_date` date DEFAULT NULL,
  `proposed_out_time` time DEFAULT NULL,
  `proposed_in_time` time DEFAULT NULL,
  `purpose` varchar(200) DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'pending',
  `arrival` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'no',
  `depature_time` datetime(6) DEFAULT NULL,
  `arrival_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rollno` (`rollno`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `egatepass_info`
--

INSERT INTO `egatepass_info` (`id`, `rollno`, `proposed_out_date`, `proposed_in_date`, `proposed_out_time`, `proposed_in_time`, `purpose`, `status`, `arrival`, `depature_time`, `arrival_time`) VALUES
(1, 'B21AD032', '2023-08-03', '2023-08-03', '23:58:00', '13:00:00', 'holidays', 'approved', 'no', '2023-08-04 14:50:38.616000', '2023-08-04 14:41:52.396000'),
(2, 'B21AD007', '2023-08-04', '2023-08-05', '00:02:00', '00:02:00', 'holidays', 'approved', 'no', '2023-08-04 14:38:10.001000', '2023-08-04 14:43:48.284000'),
(3, 'B21AD007', '2023-08-07', '2023-08-08', '16:35:00', '16:35:00', 'medical_leave', 'rejected', 'no', NULL, NULL),
(4, 'B21AD007', '2023-08-07', '2023-08-08', '16:35:00', '16:35:00', 'medical_leave', 'rejected', 'no', NULL, NULL),
(5, 'B21AD007', '2023-08-07', '2023-08-06', '16:41:00', '16:42:00', 'holidays', 'approved', 'yes', '2023-08-16 16:21:08.808000', '2023-08-16 16:21:02.600000'),
(6, 'B21AD007', '2023-08-07', '2023-08-07', '16:43:00', '16:43:00', 'holidays', 'pending', 'no', NULL, NULL),
(7, 'B21AD007', '2023-08-07', '2023-08-07', '16:45:00', '16:45:00', 'medical_leave', 'pending', 'no', NULL, NULL),
(8, 'B21AD007', '2023-08-07', '2023-08-06', '16:46:00', '16:46:00', 'holidays', 'pending', 'no', NULL, NULL),
(9, 'B21AD007', '2023-08-06', '2023-08-07', '16:48:00', '16:48:00', 'medical_leave', 'pending', 'no', NULL, NULL),
(10, 'B21AD007', '2023-08-06', '2023-08-07', '16:48:00', '16:48:00', 'medical_leave', 'pending', 'no', NULL, NULL),
(11, 'B21AD007', '2023-08-07', '2023-08-07', '17:02:00', '17:02:00', 'holidays', 'pending', 'no', NULL, NULL),
(12, 'B21AD007', '2023-08-07', '2023-08-07', '17:02:00', '17:02:00', 'holidays', 'pending', 'no', NULL, NULL),
(13, 'B21AD007', '2023-08-07', '2023-08-07', '17:02:00', '17:02:00', 'holidays', 'pending', 'no', NULL, NULL),
(14, 'B21AD007', '2023-08-07', '2023-08-08', '17:25:00', '23:31:00', 'medical_leave', 'pending', 'no', NULL, NULL),
(15, 'B21AD007', '2023-08-07', '2023-08-08', '22:13:00', '22:13:00', 'medical_leave', 'pending', 'no', NULL, NULL),
(16, 'B21AD007', '2023-08-07', '2023-08-09', '23:47:00', '02:50:00', 'medical_leave', 'pending', 'no', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_info`
--

DROP TABLE IF EXISTS `student_info`;
CREATE TABLE IF NOT EXISTS `student_info` (
  `rollno` varchar(50) NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `batch` varchar(50) DEFAULT NULL,
  `dept` varchar(100) DEFAULT NULL,
  `h_d` enum('H','D') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `block_no` varchar(10) DEFAULT NULL,
  `room_no` varchar(10) DEFAULT NULL,
  `phone_no` varchar(20) DEFAULT NULL,
  `incharge` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `AIncharge` varchar(50) NOT NULL,
  `password1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Care@123',
  PRIMARY KEY (`rollno`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `student_info`
--

INSERT INTO `student_info` (`rollno`, `username`, `batch`, `dept`, `h_d`, `gender`, `block_no`, `room_no`, `phone_no`, `incharge`, `AIncharge`, `password1`) VALUES
('B21AD007', 'ARAVIND SAMY C', '21-25', 'AD', 'D', 'MALE', NULL, NULL, '9080347770', 'ad3cc', 'ad3cc', 'Care@123'),
('B21AD032', 'NAVAJEEVAN S', '21-25', 'AD', 'H', 'MALE', 'C1', 'S2', '9489238085', 'bwarden', 'ad3cc', 'Care@123'),
('b21ad001', 'unknown', '21-25', 'AD', 'H', 'm', NULL, NULL, '123456780', 'staff3', '', 'Care@123');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
