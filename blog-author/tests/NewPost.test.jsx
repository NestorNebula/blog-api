import { beforeEach, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { getFakeAuthor } from '../src/helpers/faker';
import NewPost from '../src/components/newpost/NewPost';

const author = getFakeAuthor();

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
});
