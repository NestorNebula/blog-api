import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLoaderData } from 'react-router-dom';
import { getFakeUser, getFakeAuthor } from '../src/helpers/faker';
import App from '../src/App';

beforeEach(() => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLoaderData: () => {
      return {
        user: getFakeAuthor(),
      };
    },
  };
});

describe('App', async () => {
  it('renders normally for author', () => {
    expect(screen.queryByText(/please go/i)).toBeNull();
  });
});
