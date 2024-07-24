import { render, screen } from '@testing-library/react';
import Toolbar from './Toolbar';
import '@testing-library/jest-dom';

test('renders the Toolbar component', () => {
  render(<Toolbar />);
  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toBe(21); // Ensure that all buttons are rendered
});
