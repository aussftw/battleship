import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Board, CellStatus, GameStatus, Player } from '../types';
import { allShipsSunk } from '../helpers';

export type Winner = Player | null;

type GameState = {
  activePlayer: Player;
  gameStatus: GameStatus;
  player1Board: Board;
  player2Board: Board;
  winner: Player | null;
};

const initialState: GameState = {
  activePlayer: Player.Player1,
  gameStatus: GameStatus.SettingUp,
  player1Board: [],
  player2Board: [],
  winner: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setActivePlayer: (state, action: PayloadAction<Player>) => {
      state.activePlayer = action.payload;
    },
    setGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload;
    },
    setPlayerBoard: (state, action: PayloadAction<Board>) => {
      if (state.activePlayer === Player.Player1) {
        state.player1Board = action.payload;
      } else {
        state.player2Board = action.payload;
      }
    },
    playerShoot: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload;
      const targetBoard =
        state.activePlayer === Player.Player1
          ? state.player2Board
          : state.player1Board;

      // Check if the shot is a HIT or MISS and update the targetBoard accordingly.
      if (targetBoard[x][y] === CellStatus.SHIP) {
        targetBoard[x][y] = CellStatus.HIT;
      } else if (targetBoard[x][y] === CellStatus.EMPTY) {
        targetBoard[x][y] = CellStatus.MISS;
      }

      if (allShipsSunk(targetBoard)) {
        state.winner = state.activePlayer;
        state.gameStatus = GameStatus.Ended;
      }
    },

    setWinner: (state, action: PayloadAction<Winner>) => {
      state.winner = action.payload;
    },
    resetGameState: () => {
      return initialState;
    },
  },
});

export const {
  setActivePlayer,
  setGameStatus,
  setPlayerBoard,
  playerShoot,
  resetGameState,
  setWinner,
} = gameSlice.actions;
export default gameSlice.reducer;
