import { faker } from '@faker-js/faker';

const getFakePerson = () => {
  const username = faker.person.firstName();
  return {
    id: faker.number.int({ max: 1000 }),
    username,
    email: faker.internet.email({ firstName: username }),
  };
};

const getFakeUser = () => {
  const user = getFakePerson();
  user.role = 'USER';
  return user;
};

const getFakeAuthor = () => {
  const user = getFakePerson();
  user.role = 'AUTHOR';
  return user;
};

const getFakePost = () => {
  const postId = faker.number.int({ max: 1000 });
  const userId = faker.number.int({ max: 100 });

  return {
    id: postId,
    title: faker.word.words({ max: 5 }),
    content: faker.lorem.paragraphs({ max: 5 }),
    creationDate: faker.date.recent(),
    upDate: new Date(Date.now()),
    published: true,
    userId: userId,
    user: {
      username: faker.person.firstName(),
    },
    Comments: [
      getFakeComment(postId, userId),
      getFakeComment(postId, userId + 1),
    ],
  };
};

const getFakeComment = (postId, userId) => {
  return {
    id: faker.number.int({ max: 10000 }),
    content: faker.lorem.paragraph({ max: 3 }),
    creationDate: faker.date.recent(),
    postId,
    userId,
    user: {
      username: faker.person.firstName(),
    },
  };
};

export { getFakeUser, getFakeAuthor, getFakePost, getFakeComment };
