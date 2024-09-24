require('dotenv').config();
const jwt = require('jsonwebtoken');

const getToken = (user) => {
  const jwtUser = {
    username: user.username,
    email: user.email,
    role: user.role,
    posts: user.Posts,
    comments: user.Comments,
  };
  const token = jwt.sign(jwtUser, process.env.AT, { expiresIn: '15m' });
  return token;
};

module.exports = { getToken };
