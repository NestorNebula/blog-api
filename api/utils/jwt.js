require('dotenv').config();
const jwt = require('jsonwebtoken');

const getToken = (user) => {
  const token = jwt.sign(user, process.env.AT, { expiresIn: '15m' });
  return token;
};

module.exports = { getToken };
