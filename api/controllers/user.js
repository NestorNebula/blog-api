const prisma = require('../models/queries');
const bcrypt = require('bcrypt');
const { validateUser } = require('../utils/validation');

const getUser = async (req, res) => {
  const user = await prisma.getUserById(+req.params.userId);
  if (!user || req.user.id !== +req.params.userId) {
    return res.sendStatus(404);
  }
  res.json(user);
};

const updateUser = [
  validateUser,
  async (req, res) => {
    const user = await prisma.getUserById(+req.params.userId);
    if (!user || req.user.id !== +req.params.userId) return res.sendStatus(400);
    let role;
    if (user.role === 'AUTHOR') {
      role = 'AUTHOR';
    } else {
      role = req.body.role === process.env.AUTHOR_PWD ? 'AUTHOR' : 'USER';
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return res.sendStatus(503);
      }
      await prisma.updateUser(+req.params.userId, {
        username: req.body.username || user.username,
        email: req.body.email || user.email,
        password: match ? user.password : hashedPassword,
        role,
      });
      res.sendStatus(201);
    });
  },
];

const getUserPosts = async (req, res) => {
  const user = await prisma.getUserById(+req.params.userId);
  if (!user) {
    return res.sendStatus(404);
  }
  const posts = await prisma.getUserPosts(+req.params.userId);
  res.json(posts);
};

module.exports = { getUser, updateUser, getUserPosts };
