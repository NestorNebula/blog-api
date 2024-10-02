import { vi, describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getFakeUser } from '../src/helpers/faker';
import Account from '../src/components/account/Account';

const user = getFakeUser();

beforeEach(() => {
  render(
    <MemoryRouter>
      <Account />
    </MemoryRouter>
  );
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => {
      return {
        user,
        API_URL: null,
      };
    },
  };
});

describe('Account', () => {
  it('renders account', () => {
    expect(screen.queryByText(user.username)).not.toBeNull();
  });
});
