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
});
