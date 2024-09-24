const prisma = require('../models/queries');
const { validatePost } = require('../utils/validation');

const getPosts = async (req, res) => {
  const posts = await prisma.getAllPosts();
  res.json(posts);
};

const postPost = [
  validatePost,
  async (req, res) => {
    if (req.user.role !== 'AUTHOR') return res.sendStatus(403);
    await prisma.createPost({
      userId: req.user.id,
      title: req.body.title,
      content: req.body.content,
      published: req.body.published ? true : false,
    });
    res.sendStatus(201);
  },
];

const getPost = (req, res) => {};

const updatePost = (req, res) => {};

const deletePost = (req, res) => {};

module.exports = { getPosts, postPost, getPost, updatePost, deletePost };
