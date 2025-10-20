-- Create profiles and scores tables for the game
-- This script creates the database and tables, and also creates a local user
-- suitable for XAMPP / local MySQL installations using mysql_native_password.

CREATE DATABASE IF NOT EXISTS game_db;
USE game_db;

CREATE TABLE IF NOT EXISTS profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  score INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create local user (game_user) with mysql_native_password for compatibility
-- NOTE: adjust password if you prefer a different one
CREATE USER IF NOT EXISTS 'game_user'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY 'game_pass';
GRANT ALL PRIVILEGES ON game_db.* TO 'game_user'@'127.0.0.1';
FLUSH PRIVILEGES;

-- Optional sample seed
INSERT INTO profiles (username, data) VALUES ('test', JSON_OBJECT('nivel', 1)) ON DUPLICATE KEY UPDATE username=username;
INSERT INTO scores (username, score) VALUES ('test', 100) ON DUPLICATE KEY UPDATE username=username;
