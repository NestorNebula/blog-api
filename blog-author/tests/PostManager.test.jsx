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
});
