require('dotenv').config();
const bcrypt = require('bcrypt');
const prisma = require('../models/queries');
const jwt = require('../utils/jwt');
const { validateUser } = require('../utils/validation');

const signUp = [
  validateUser,
  (req, res) => {
    const role = req.body.role === process.env.AUTHOR_PWD ? 'AUTHOR' : 'USER';
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return res.sendStatus(503);
      }
      try {
        await prisma.createUser({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          role,
        });
      } catch (error) {
        return res
          .status(400)
          .json({ error: `${error.meta.target[0]} already taken.` });
      }
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
  const token = jwt.getToken({ id: user.id });
  const refreshToken = jwt.getRefreshToken({ id: user.id });
  const date = new Date(Date.now());
  date.setDate(date.getDate() + 7);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 900000,
    sameSite: 'lax',
    secure: true,
  });
  res.cookie('refresh', refreshToken, {
    httpOnly: true,
    expires: date,
    sameSite: 'lax',
    secure: true,
    path: '/auth',
  });
  res.json({ id: user.id });
};

const refreshAccessToken = (req, res) => {
  if (req.cookies['refresh']) {
    const result = jwt.verifyRefreshToken(req.cookies['refresh']);
    if (result) {
      const token = jwt.getToken({ id: result });
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 900000,
        sameSite: 'lax',
        secure: true,
      });
      return res.json({ id: result });
    }
  }
  res.sendStatus(401);
};

module.exports = { signUp, logIn, refreshAccessToken };
