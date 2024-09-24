const { body } = require('express-validator');

const validateUser = [
  body('username').trim().blacklist('<>'),
  body('email').trim().blacklist('<>'),
  body('password').trim(),
  body('role').trim(),
];

module.exports = { validateUser };
