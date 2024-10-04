import { beforeEach, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useOutletContext } from 'react-router-dom';
import { getFakeAuthor, getFakePost } from '../src/helpers/faker';
import Dashboard from '../src/components/dashboard/Dashboard';

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

globalThis.fetch = vi.fn((url, options) => {
  return {
    status: 200,
    posts: [getFakePost(), getFakePost()],
  };
});

beforeEach(() => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
});

describe('Dashboard', () => {
  it("renders author's dashboard", () => {
    expect(screen.queryByText(author.username)).not.toBeNull();
  });

  it("fetches and renders author's posts", () => {
    expect(globalThis.fetch).toHaveBeenCalled();
    const postBtns = screen.queryAllByRole('button', { name: /details/i });
    expect(postBtns.length).toBe(2);
  });
});
