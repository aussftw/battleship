import { Board, Ship, CellStatus, ShipName } from '../types';

function canPlaceShip(board: Board, x: number, y: number, ship: Ship): boolean {
  if (ship.direction === 'HORIZONTAL') {
    for (let i = 0; i < ship.length; i++) {
      if (y + i >= board[x].length || board[x][y + i] !== CellStatus.EMPTY) {
        return false;
      }
    }
  } else {
    for (let i = 0; i < ship.length; i++) {
      if (x + i >= board.length || board[x + i][y] !== CellStatus.EMPTY) {
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
      newBoard[x][y + i] = CellStatus.SHIP;
    }
  } else {
    for (let i = 0; i < ship.length; i++) {
      newBoard[x + i][y] = CellStatus.SHIP;
    }
  }

  return newBoard;
}

export function initializeBoard(): Board {
  const board: Board = Array(10).fill(Array(10).fill(CellStatus.EMPTY));

  return board;
}

export const shipsData: { [key in ShipName]: { size: number } } = {
  [ShipName.Destroyer]: { size: 1 },
  [ShipName.Submarine]: { size: 2 },
  [ShipName.Cruiser]: { size: 3 },
  [ShipName.Battleship]: { size: 4 },
  [ShipName.Carrier]: { size: 5 },
};
