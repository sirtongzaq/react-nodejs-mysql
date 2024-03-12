CREATE DATABASE ropa;
USE ropa;

CREATE TABLE `users` (
  `user_id` int(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL, 
  `user_email` varchar(100) NOT NULL,
  `user_firstname` varchar(100) NOT NULL,
  `user_lastname` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `departments` (
  `dept_id` varchar(4) NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(30) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `activitys` (
  `act_id` int(4) NOT NULL AUTO_INCREMENT,
  `act_name` varchar(50) NOT NULL,
  `datacontroller_firstname` varchar(50) NOT NULL,
  `datacontroller_lastname` varchar(50) NOT NULL,
  `datacontroller_email` varchar(50) NOT NULL,
  `datacontroller_number` varchar(10) NOT NULL,
  `recorder_firstname` varchar(50) NOT NULL,
  `recorder_lastname` varchar(50) NOT NULL,
  `dept_id` int(4) NOT NULL,
  `dept_name` varchar(50) NOT NULL,
  `dpo_firstname` varchar(50) NOT NULL,
  `dpo_lastname` varchar(50) NOT NULL,
  `dpo_contact_place` varchar(50) NOT NULL,
  `dpo_email` varchar(50) NOT NULL,
  `dpo_number` varchar(10) NOT NULL,
  `recordreviewer_firstname` varchar(50) NOT NULL,
  `recordreviewer_lastname` varchar(50) NOT NULL,
  PRIMARY KEY (`act_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;