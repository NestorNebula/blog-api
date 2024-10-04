import { beforeEach, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { getFakeAuthor, getFakePost } from '../src/helpers/faker';
import NewPost from '../src/components/newpost/NewPost';

const author = getFakeAuthor();
const post = getFakePost();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => {
      return {
        author,
      };
    },
  };
});

beforeEach(() => {
  render(
    <MemoryRouter>
      <NewPost />
    </MemoryRouter>
  );
});

describe('NewPost', () => {
  it('renders correctly', () => {
    expect(screen.queryByText(/create new post/i)).not.toBeNull();
  });

  it('submit new post', async () => {
    globalThis.fetch = vi.fn((url, options) => {
      return {
        status: 201,
        url,
        options,
      };
    });

    const user = userEvent.setup();
    const title = screen.getByLabelText(/title/i);
    const content = screen.getByLabelText(/content/i);
    const published = screen.getByLabelText(/publish/i);
    await user.type(title, post.title);
    await user.type(content, post.content);
    await user.click(published);
    const submit = screen.getByRole('button', { name: /create/i });
    await user.click(submit);
    expect(JSON.parse(globalThis.fetch.mock.calls[0][1].body)).toEqual({
      title: post.title,
      content: post.content,
      published: true,
    });
  });
});
