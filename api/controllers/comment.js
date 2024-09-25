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

const deleteComment = (req, res) => {};

module.exports = { getComment, udpateComment, deleteComment };
