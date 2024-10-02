const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// User queries

const createUser = async (user) => {
  await prisma.user.create({
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    },
  });
};

const getUserByUsermail = async (username) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email: username }],
    },
  });
  return user;
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
  });
  return user;
};

const updateUser = async (id, user) => {
  await prisma.user.update({
    where: { id },
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    },
  });
};

// Post Queries

const getUserPosts = async (id) => {
  const posts = await prisma.post.findMany({
    where: { userId: id },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return posts;
};

const getAllPosts = async (id) => {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
      Comments: true,
    },
  });
  return posts;
};

const createPost = async (post) => {
  await prisma.post.create({
    data: {
      title: post.title,
      content: post.content,
      published: post.published,
      user: {
        connect: { id: post.userId },
      },
    },
  });
};

const getPostById = async (id) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      Comments: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return post;
};

const updatePost = async (id, post) => {
  await prisma.post.update({
    where: { id },
    data: {
      title: post.title,
      content: post.content,
      published: post.published,
    },
  });
};

const deletePost = async (id) => {
  await prisma.post.delete({
    where: { id },
  });
};

// Comment Queries

const createComment = async (comment) => {
  await prisma.comment.create({
    data: {
      content: comment.content,
      post: {
        connect: { id: comment.postId },
      },
      user: {
        connect: { id: comment.userId },
      },
    },
  });
};

const getCommentById = async (id) => {
  const comment = await prisma.comment.findUnique({
    where: { id },
  });
  return comment;
};

const updateComment = async (id, comment) => {
  await prisma.comment.update({
    where: { id },
    data: {
      content: comment.content,
    },
  });
};

const deleteComment = async (id) => {
  await prisma.comment.delete({
    where: { id },
  });
};

module.exports = {
  createUser,
  getUserByUsermail,
  getUserById,
  updateUser,
  getUserPosts,
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
};
