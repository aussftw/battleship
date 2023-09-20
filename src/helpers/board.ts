import { Board } from '../types';

export function initializeBoard(): Board {
  const board: Board = Array(10).fill(Array(10).fill('EMPTY'));

  return board;
}
