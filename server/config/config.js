// server/config/config.js
/* Load environment variables from .env for database configuration */
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || 'library_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    dialect: process.env.DB_DIALECT || 'postgres'
  },

  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || 'library_test',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    dialect: process.env.DB_DIALECT || 'postgres'
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    dialect: process.env.DB_DIALECT || 'postgres'
  }
};
