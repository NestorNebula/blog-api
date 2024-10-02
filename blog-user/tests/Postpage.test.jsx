import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { getFakePost } from '../src/helpers/faker';
import Postpage from '../src/components/post/Postpage';

const post = getFakePost();

beforeEach(() => {
  render(
    <MemoryRouter>
      <Postpage />
    </MemoryRouter>
  );
});

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
          id: post.Comments[0].userId,
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
    expect(screen.queryByRole('button', { name: /post/i })).not.toBeNull();
  });

  it('renders post', () => {
    expect(screen.queryByText(post.title)).not.toBeNull();
  });

  it('add comment', async () => {
    globalThis.fetch = vi.fn((url, options) => {
      return {
        status: 201,
      };
    });
    const user = userEvent.setup();
    const btn = screen.getByRole('button', { name: /post/i });
    const content = screen.getByLabelText(/comment/i);
    await user.type(content, 'a comment');
    await user.click(btn);
    expect(globalThis.fetch).toHaveBeenCalled();
  });

  it('let user remove its comment', async () => {
    globalThis.fetch = vi.fn((url, options) => {
      return {
        status: 200,
        url,
      };
    });
    const user = userEvent.setup();
    const btn = screen.getByRole('button', { name: /delete/i });
    expect(btn).not.toBeNull();
    await user.click(btn);
    const confirmbtn = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmbtn);
    const url = globalThis.fetch.mock.results[0].value.url;
    expect(url).toMatch(post.Comments[0].id);
  });
});
