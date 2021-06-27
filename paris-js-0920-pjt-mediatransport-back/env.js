require('dotenv').config();

const getEnv = (varibale) => {
  const value = process.env[varibale];
  return value;
};

const SERVER_PORT = getEnv('SERVER_PORT');
const DB_HOST = getEnv('DB_HOST');
const DB_PORT = getEnv('DB_PORT');
const DB_USER = getEnv('DB_USER');
const DB_PASS = getEnv('DB_PASS');
const DB_NAME = getEnv('DB_NAME');

module.exports = {
  SERVER_PORT,

  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_NAME,
  DB_PASS
};
