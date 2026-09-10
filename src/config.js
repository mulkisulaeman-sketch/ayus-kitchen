require('dotenv').config();

module.exports = {
  port: Number(process.env.PORT || 3000),
  version: process.env.APP_VERSION || '0.1.0',
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl:
    process.env.DATABASE_URL ||
    'postgres://postgres:postgres@localhost:5432/ayus_kitchen',
  logLevel: process.env.LOG_LEVEL || 'info'
};
