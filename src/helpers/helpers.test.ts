import { CellStatus, ShipName } from '../types';
import { initializeBoard, allShipsSunk, shipsData } from './';

import { Board } from '../types';

describe('Board Utilities', () => {
  let board: Board;

  beforeEach(() => {
    board = initializeBoard();
  });

  test('initializeBoard should create a 10x10 board', () => {
    expect(board.length).toBe(10);
    board.forEach((row) => {
      expect(row.length).toBe(10);
      expect(row.every((cell) => cell === CellStatus.EMPTY)).toBe(true);
    });
  });

  test('allShipsSunk should return true if all ships are sunk', () => {
    expect(allShipsSunk(board)).toBe(true);
  });

  test('allShipsSunk should return false if any ship is not sunk', () => {
    board[0][0] = CellStatus.SHIP;
    expect(allShipsSunk(board)).toBe(false);
  });

  test('shipsData should match the expected ship sizes', () => {
    expect(shipsData[ShipName.Destroyer].size).toBe(1);
    expect(shipsData[ShipName.Submarine].size).toBe(2);
    expect(shipsData[ShipName.Cruiser].size).toBe(3);
    expect(shipsData[ShipName.Battleship].size).toBe(4);
    expect(shipsData[ShipName.Carrier].size).toBe(5);
  });
});
