const prisma = require('../models/queries');
const { validatePost } = require('../utils/validation');

const getComment = async (req, res) => {
  const comment = await prisma.getCommentById(+req.params.commentId);
  if (!comment) return res.sendStatus(404);
  res.json(comment);
};

const udpateComment = [
  validatePost,
  async (req, res) => {
    const comment = await prisma.getCommentById(+req.params.commentId);
    if (!comment) return res.sendStatus(400);
    if (comment.userId !== req.user.id) return res.sendStatus(403);
    await prisma.updateComment(+req.params.commentId, {
      content: req.body.content,
    });
    res.sendStatus(201);
  },
];

const deleteComment = async (req, res) => {
  const comment = await prisma.getCommentById(+req.params.commentId);
  if (!comment) return res.sendStatus(404);
  const post = await prisma.getPostById(comment.postId);
  if (!post) return res.sendStatus(404);
  const allowed = [comment.userId, post.userId];
  if (!allowed.includes(req.user.id)) return res.sendStatus(403);
  await prisma.deleteComment(+req.params.commentId);
  res.sendStatus(200);
};

module.exports = { getComment, udpateComment, deleteComment };
