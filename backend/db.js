const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || process.env.MYSQL_USER || 'game_user',
  password: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || 'game_pass',
  database: process.env.DB_NAME || process.env.MYSQL_DATABASE || 'game_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
