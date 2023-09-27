import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Cell, { CellProps } from './Cell';
import { CellStatus } from '../../types';

describe('Cell Component', () => {
  let props: CellProps;
  let onClick: jest.Mock;
  let onContextMenu: jest.Mock;
  let onMouseOver: jest.Mock;
  let onMouseOut: jest.Mock;

  beforeEach(() => {
    onClick = jest.fn();
    onContextMenu = jest.fn();
    onMouseOver = jest.fn();
    onMouseOut = jest.fn();

    props = {
      status: CellStatus.EMPTY,
      onClick,
      onContextMenu,
      onMouseOver,
      onMouseOut,
      className: 'test-class',
    };
  });

  const renderComponent = () => render(<Cell {...props} />);

  test('renders with correct styles for EMPTY status', () => {
    const { container } = renderComponent();
    expect(container.firstChild).toHaveClass('bg-gray-300');
  });

  test('renders with correct styles for SHIP status', () => {
    props.status = CellStatus.SHIP;
    const { container } = renderComponent();
    expect(container.firstChild).toHaveClass('bg-blue-300');
  });

  test('renders with correct styles for HIT status', () => {
    props.status = CellStatus.HIT;
    const { container } = renderComponent();
    expect(container.firstChild).toHaveClass('bg-red-500');
  });

  test('renders with correct styles for MISS status', () => {
    props.status = CellStatus.MISS;
    const { container } = renderComponent();
    expect(container.firstChild).toHaveClass('bg-gray-100');
  });

  test('handles onClick correctly', () => {
    const { container } = renderComponent();
    fireEvent.click(container.firstChild!);
    expect(onClick).toHaveBeenCalled();
  });

  test('handles onContextMenu correctly', () => {
    const { container } = renderComponent();
    fireEvent.contextMenu(container.firstChild!);
    expect(onContextMenu).toHaveBeenCalled();
  });

  test('handles onMouseOver correctly', () => {
    const { container } = renderComponent();
    fireEvent.mouseOver(container.firstChild!);
    expect(onMouseOver).toHaveBeenCalled();
  });

  test('handles onMouseOut correctly', () => {
    const { container } = renderComponent();
    fireEvent.mouseOut(container.firstChild!);
    expect(onMouseOut).toHaveBeenCalled();
  });
});
