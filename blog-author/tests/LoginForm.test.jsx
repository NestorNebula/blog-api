import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../src/components/login/LoginForm';

globalThis.fetch = vi.fn((url, options) => {
  return {
    status: 200,
    json: async () => {
      return { id: 1, url, options };
    },
  };
});

describe('LoginForm', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Log In');
  });

  it('handles wrong inputs properly', async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const usernameInput = screen.getByLabelText(/username/i);
    await user.type(usernameInput, '.user');
    expect(
      screen.queryByText(
        'Username must start/end with a letter and can only contain letters, numbers, dashes and points.'
      )
    ).not.toBeNull();
    await user.clear(usernameInput);
    await user.type(usernameInput, 'u');
    expect(
      screen.queryByText(/Username\/Email must be at least 3 characters long./)
    ).not.toBeNull();

    const pwdInput = screen.getByLabelText('password');
    await user.type(pwdInput, 'Wrong');
    expect(
      screen.queryByText('Password must be at least 8 characters long.')
    ).not.toBeNull();
  });

  it('handles submit data', async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const btn = screen.getByRole('button');
    const username = screen.queryByLabelText(/username/i);
    const password = screen.queryByLabelText(/password/i);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    await user.type(username, 'username');
    await user.type(password, 'password');
    await user.click(btn);
    expect(globalThis.fetch).toHaveBeenCalled();
  });
});
