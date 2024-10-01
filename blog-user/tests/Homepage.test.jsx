import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Homepage from '../src/components/homepage/Homepage';
import { faker } from '@faker-js/faker';

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
    Comments: [getFakeComment(), getFakeComment()],
  };
};

const getFakeComment = (postId, userId) => {
  return {
    id: faker.number.int({ max: 10000 }),
    content: faker.lorem.paragraph({ max: 3 }),
    creationDate: faker.date.recent(),
    postId,
    userId,
  };
};

vi.mock('../src/hooks/useData', () => {
  return {
    useData: () => {
      return {
        data: [getFakePost(), getFakePost()],
        error: null,
        loading: false,
      };
    },
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: vi.fn(() => {
      return {
        user: {
          id: 1,
          username: 'Username',
          email: 'this@email.com',
          role: 'USER',
        },
        API_URL: null,
      };
    }),
  };
});

describe('Homepage', () => {
  it('renders homepage', () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    expect(screen.queryByText(/homepage/i)).not.toBeNull();
  });
});
