require('dotenv').config();
const jwt = require('jsonwebtoken');

const getToken = (user) => {
  const token = jwt.sign(user, process.env.AT, { expiresIn: '15m' });
  return token;
};

const getRefreshToken = (user) => {
  const token = jwt.sign(user, process.env.RT, { expiresIn: '7d' });
  return token;
};

module.exports = { getToken, getRefreshToken };
