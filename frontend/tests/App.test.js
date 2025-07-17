import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from '../src/App';
import { vi } from 'vitest';

vi.mock('axios');

describe('App', () => {
  it('renders todo app heading', () => {
    render(<App />);
    expect(screen.getByText('Todo App')).toBeInTheDocument();
  });

  it('shows error for empty todo', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Add Todo'));
    expect(screen.getByText('Todo cannot be empty')).toBeInTheDocument();
  });
});