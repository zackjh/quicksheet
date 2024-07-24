import { render, screen } from '@testing-library/react';
import WordCounter from './WordCounter';

test('renders the WordCounter component', () => {
  render(<WordCounter />);
  expect(screen.getByText(/Word Count:/i)).toBeInTheDocument();
});
