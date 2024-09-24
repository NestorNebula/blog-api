require('dotenv').config();
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const prisma = require('../models/queries');

const validateUser = [
  body('username').trim().blacklist('<>'),
  body('email').trim().blacklist('<>'),
  body('password').trim(),
  body('role').trim(),
];

const signUp = [
  validateUser,
  (req, res) => {
    const role = req.body.role === process.env.AUTHOR_PWD ? 'AUTHOR' : 'USER';
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return res.sendStatus(503);
      }
      await prisma.createUser({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role,
      });
      res.sendStatus(201);
    });
  },
];

const logIn = async (req, res) => {
  const user = await prisma.getUserByUsermail(req.body.username);
  if (!user) {
    return res.status(400).json('Incorrect username or email');
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(400).json('Incorrect password');
  }
  res.status(200).json('Successful connection');
};

module.exports = { signUp, logIn };
