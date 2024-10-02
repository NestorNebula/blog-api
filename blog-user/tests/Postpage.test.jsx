import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { getFakePost } from '../src/helpers/faker';
import Postpage from '../src/components/post/Postpage';

const post = getFakePost();

vi.mock('../src/hooks/useData', () => {
  return {
    useData: () => {
      return {
        data: post,
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
          username: 'username',
          email: 'this@email.com',
          role: 'USER',
        },
        API_URL: null,
      };
    }),
    useParams: vi.fn(() => {
      return { postId: post.id };
    }),
  };
});

describe('Postpage', () => {
  it('renders postpage', () => {
    render(
      <MemoryRouter>
        <Postpage />
      </MemoryRouter>
    );
    expect(screen.queryByRole('button')).not.toBeNull();
  });

  it('renders post', () => {
    render(
      <MemoryRouter>
        <Postpage />
      </MemoryRouter>
    );
    expect(screen.queryByText(post.content)).not.toBeNull();
  });
});
