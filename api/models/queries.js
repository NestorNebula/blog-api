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
    include: { user: true },
  });
  return posts;
};

const getAllPosts = async (id) => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      Comments: true,
    },
  });
  return posts;
};

// Comment Queries

module.exports = {
  createUser,
  getUserByUsermail,
  getUserById,
  updateUser,
  getUserPosts,
  getAllPosts,
};
