import { createSelector } from 'reselect';

import { RootState } from '../store/store';
import { GameStatus, Player } from '../features/gameReducer';
import { Board, CellStatus } from '../types';

const isShipPlaced = (cell: CellStatus) => cell === CellStatus.SHIP;

export const player1AllShipsPlacedSelector = createSelector(
  (state: RootState) => state.game.player1Board,
  (player1Board): boolean => {
    // Logic to check if all ships are placed for player 1
    let shipsPlaced = 0;
    for (const row of player1Board) {
      for (const cell of row) {
        if (isShipPlaced(cell)) {
          shipsPlaced += 1;
        }
      }
    }

    // Compare shipsPlaced with the total number of ship cells required to be placed
    const totalShipCellsRequired = 15;
    return shipsPlaced === totalShipCellsRequired;
  },
);

const gameStateSelector = (state: RootState) => state.game;
const selectShipStateSelector = (state: RootState) => state.selectShip;

export const shipsSelector = createSelector(
  (state: RootState) => state.selectShip.ships,
  (ships) => ships,
);

export const activePlayerSelector = createSelector(
  [gameStateSelector],
  (game): Player => game.activePlayer,
);

export const player1BoardSelector = createSelector(
  [gameStateSelector],
  (game): Board => game.player1Board,
);

export const player2BoardSelector = createSelector(
  [gameStateSelector],
  (game): Board => game.player2Board,
);

export const selectedShipNameSelector = createSelector(
  [selectShipStateSelector],
  (selectShip) => selectShip.selectedShip,
);

export const gameStatusSelector = createSelector(
  [gameStateSelector],
  (game): GameStatus => game.gameStatus,
);
