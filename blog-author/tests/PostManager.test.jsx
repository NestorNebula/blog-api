import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { getFakeAuthor, getFakePost } from '../src/helpers/faker';
import PostManager from '../src/components/post/PostManager';

const post = getFakePost();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => {
      return {
        author: getFakeAuthor(),
      };
    },
    useParams: () => {
      return {
        postId: post.id,
      };
    },
  };
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

beforeEach(() => {
  render(
    <MemoryRouter>
      <PostManager />
    </MemoryRouter>
  );
});

describe('PostManager', () => {
  it('renders post correctly', () => {
    expect(screen.queryByText(post.title)).not.toBeNull();
  });

  it('let author delete any comment', async () => {
    globalThis.fetch = vi.fn((url, options) => {
      return {
        status: 200,
        url,
        options,
      };
    });

    const user = userEvent.setup();
    const deleteBtn = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteBtn[1]);
    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmBtn);
    expect(globalThis.fetch.mock.results[0].value.url).toMatch(
      post.Comments[1].id
    );
  });

  it('calls fetch when updating post status', async () => {
    globalThis.fetch = vi.fn((url, options) => {
      return {
        status: 201,
        url,
        options,
      };
    });

    const user = userEvent.setup();
    const statusBtn = screen.getByRole('button', { name: /publish/i });
    await user.click(statusBtn);
    const body = globalThis.fetch.mock.calls[0][1].body;
    expect(JSON.parse(body)).toEqual({
      published: !post.published,
    });
  });

  it('submit data when updating post', async () => {
    globalThis.fetch = vi.fn((url, options) => {
      return {
        status: 201,
        url,
        options,
      };
    });

    const updatedPost = getFakePost();
    const user = userEvent.setup();
    const editBtn = screen.getByRole('button', { name: /edit/i });
    await user.click(editBtn);
    const title = screen.getByLabelText(/title/i);
    const content = screen.getByLabelText(/content/i);
    await user.clear(title);
    await user.clear(content);
    await user.type(title, updatedPost.title);
    await user.type(content, updatedPost.content);
    const submitBtn = screen.getByRole('button', { name: /update/i });
    await user.click(submitBtn);
    expect(JSON.parse(globalThis.fetch.mock.calls[0][1].body)).toEqual({
      title: updatedPost.title,
      content: updatedPost.content,
    });
  });
});
