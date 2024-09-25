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

const getPost = async (req, res) => {
  const post = await prisma.getPostById(+req.params.postId);
  if (!post) return res.sendStatus(404);
  res.json(post);
};

const updatePost = async (req, res) => {
  const post = await prisma.getPostById(+req.params.postId);
  if (!post) return res.sendStatus(404);
  if (post.userId !== req.user.id) return res.sendStatus(403);
  await prisma.updatePost(+req.params.postId, {
    title: req.body.title || post.title,
    content: req.body.content || post.content,
    published: req.body.published || post.published,
  });
  res.sendStatus(201);
};

const deletePost = async (req, res) => {
  const post = await prisma.getPostById(+req.params.postId);
  if (!post) return res.sendStatus(404);
  if (post.userId !== req.user.id) return res.sendStatus(403);
  await prisma.deletePost(+req.params.postId);
  res.sendStatus(200);
};

module.exports = { getPosts, postPost, getPost, updatePost, deletePost };
