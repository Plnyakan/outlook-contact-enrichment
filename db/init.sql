-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `contact_enrichment` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Switch to using our database
USE `contact_enrichment`;

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Contacts table
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `full_name` VARCHAR(255) NOT NULL,
  `department` VARCHAR(100),
  `phone_number` VARCHAR(50),
  `job_title` VARCHAR(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Sample data
INSERT IGNORE INTO `users` (`email`, `password_hash`) VALUES 
('user@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMy.Mrq4W3WYwU0JvXjJZ7w8T7kF0JQ5d6O'); -- password: "password"

INSERT IGNORE INTO `contacts` (`email`, `full_name`, `department`, `phone_number`, `job_title`) VALUES
('sender@example.com', 'John Doe', 'Engineering', '+1234567890', 'Senior Software Engineer'),
('manager@company.com', 'Jane Smith', 'Management', '+1987654321', 'Project Manager');