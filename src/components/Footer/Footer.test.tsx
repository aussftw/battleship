import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from './Footer';

describe('Footer Component', () => {
  test('renders correctly', () => {
    render(<Footer />);

    expect(screen.getByText(/Developed and Made with/)).toBeInTheDocument();
    expect(
      screen.getByText(/by Alexander Kaminskiy © 2023/),
    ).toBeInTheDocument();

    const heartSymbol = screen.getByText(/♥/);
    expect(heartSymbol).toHaveClass('text-red-500');
  });
});
