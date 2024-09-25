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
      Comments: true,
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

// Comment Queries

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
};
