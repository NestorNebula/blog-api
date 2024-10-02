import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { getFakePost } from '../src/helpers/faker';
import Postpage from '../src/components/post/Postpage';

const post = getFakePost();

describe('Postpage', () => {
  it('renders postpage', () => {
    render(
      <MemoryRouter>
        <Postpage />
      </MemoryRouter>
    );
    expect(screen.queryByRole('button')).not.toBeNull();
  });

  it('renders post', () => {
    render(
      <MemoryRouter>
        <Postpage />
      </MemoryRouter>
    );
    expect(screen.queryByText(post.content)).not.toBeNull();
  });
});
