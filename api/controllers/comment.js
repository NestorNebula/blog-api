const prisma = require('../models/queries');

const getComment = async (req, res) => {
  const comment = await prisma.getCommentById(+req.params.commentId);
  if (!comment) return res.sendStatus(404);
  res.json(comment);
};

const udpateComment = (req, res) => {};

const deleteComment = (req, res) => {};

module.exports = { getComment, udpateComment, deleteComment };
