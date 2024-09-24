const { body } = require('express-validator');

const validateUser = [
  body('username').trim().blacklist('<>'),
  body('email').trim().blacklist('<>'),
  body('password').trim(),
  body('role').trim(),
];

const validatePost = [
  body('title').trim().blacklist('<>'),
  body('content').trim().blacklist('<>'),
];

module.exports = { validateUser, validatePost };
