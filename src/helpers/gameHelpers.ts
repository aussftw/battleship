import { Board, Ship } from '../types';

function canPlaceShip(board: Board, x: number, y: number, ship: Ship): boolean {
  if (ship.direction === 'HORIZONTAL') {
    for (let i = 0; i < ship.length; i++) {
      if (y + i >= board[x].length || board[x][y + i] !== 'EMPTY') {
        return false;
      }
    }
  } else {
    for (let i = 0; i < ship.length; i++) {
      if (x + i >= board.length || board[x + i][y] !== 'EMPTY') {
        return false;
      }
    }
  }
  return true;
}

export function placeShip(
  board: Board,
  x: number,
  y: number,
  ship: Ship,
): Board {
  if (!canPlaceShip(board, x, y, ship)) {
    return board;
  }

  const newBoard = [...board].map((row) => [...row]);

  if (ship.direction === 'HORIZONTAL') {
    for (let i = 0; i < ship.length; i++) {
      newBoard[x][y + i] = 'SHIP';
    }
  } else {
    for (let i = 0; i < ship.length; i++) {
      newBoard[x + i][y] = 'SHIP';
    }
  }

  return newBoard;
}
