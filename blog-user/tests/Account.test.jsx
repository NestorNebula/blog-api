import { vi, describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getFakeUser } from '../src/helpers/faker';
import Account from '../src/components/account/Account';

const fakeUser = getFakeUser();

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
        user: fakeUser,
        API_URL: null,
      };
    },
  };
});

describe('Account', () => {
  it('renders account', () => {
    expect(screen.queryByText(fakeUser.username)).not.toBeNull();
  });

  it('display update form', async () => {
    const user = userEvent.setup();
    const displayFormBtn = screen.getByRole('button', {
      name: /update account/i,
    });
    expect(screen.queryByLabelText(/username/i)).toBeNull();
    await user.click(displayFormBtn);
    expect(screen.queryByLabelText(/username/i)).not.toBeNull();
  });
});
