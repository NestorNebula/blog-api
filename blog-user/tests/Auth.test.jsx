import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useOutletContext } from 'react-router-dom';
import LoginForm from '../src/components/auth/login/LoginForm';
import SignupForm from '../src/components/auth/signup/SignupForm';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: vi.fn(() => {
      return { API_URL: 'http://localhost:3000' };
    }),
  };
});

globalThis.fetch = vi.fn((url, value) => {
  return {
    status: 200,
    json: async () => {
      return { id: 1, url: url, value: value };
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

describe('Signup Form', () => {
  it('renders form', () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
    const button = screen.queryByText(/sign up/i);
    expect(button).not.toBeNull();
  });

  it('handles submit data', async () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const btn = screen.queryByText(/sign up/i);
    const username = screen.queryByLabelText(/username/i);
    const email = screen.queryByLabelText(/email/i);
    const password = screen.queryByLabelText('password');
    const confirm = screen.queryByLabelText(/confirm/i);
    const type = async (u, e, p, c) => {
      await user.clear(username);
      await user.clear(email);
      await user.clear(password);
      await user.clear(confirm);
      await user.type(username, u);
      await user.type(email, e);
      await user.type(password, p);
      await user.type(confirm, c);
      await user.click(btn);
    };
    await type('username', 'this@email.com', 'password', 'pasword');
    await type('us', 'this@email.com', 'password', 'password');
    await type('_username_', 'this@email.com', 'password', 'pasword');
    expect(globalThis.fetch).not.toHaveBeenCalled();
    await type('username', 'this@email.com', 'password', 'password');
    expect(globalThis.fetch).toHaveBeenCalled();
  });
});
