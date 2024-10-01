import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Homepage from '../src/components/homepage/Homepage';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: vi.fn(() => {
      return {
        user: {
          id: 1,
          username: 'Username',
          email: 'this@email.com',
          role: 'USER',
        },
        API_URL: null,
      };
    }),
  };
});

describe('Homepage', () => {
  it('renders homepage', () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    expect(screen.queryByText(/homepage/i)).not.toBeNull();
  });
});
