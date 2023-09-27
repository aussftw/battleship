import gameSlice, {
  setActivePlayer,
  setGameStatus,
  setPlayerBoard,
  playerShoot,
  resetGameState,
  setWinner,
} from './gameReducer'; // adjust the import as per your file structure
import { Player, GameStatus, CellStatus } from '../types'; // adjust the import as per your file structure

describe('gameSlice', () => {
  const initialState = gameSlice(undefined, { type: 'unknown' });

  test('should handle initial state', () => {
    expect(initialState).toEqual({
      activePlayer: Player.Player1,
      gameStatus: GameStatus.SettingUp,
      player1Board: [],
      player2Board: [],
      winner: null,
    });
  });

  test('should handle setActivePlayer', () => {
    const actual = gameSlice(initialState, setActivePlayer(Player.Player2));
    expect(actual.activePlayer).toEqual(Player.Player2);
  });

  test('should handle setGameStatus', () => {
    const actual = gameSlice(initialState, setGameStatus(GameStatus.InPlay));
    expect(actual.gameStatus).toEqual(GameStatus.InPlay);
  });

  test('should handle setPlayerBoard', () => {
    const board = [[CellStatus.EMPTY]];
    const actual = gameSlice(initialState, setPlayerBoard(board));
    expect(actual.player1Board).toEqual(board);
  });

  test('should handle playerShoot', () => {
    const board = [[CellStatus.SHIP]];
    const state = { ...initialState, player2Board: board };
    const actual = gameSlice(state, playerShoot({ x: 0, y: 0 }));
    expect(actual.player2Board[0][0]).toEqual(CellStatus.HIT);
  });

  test('should handle setWinner', () => {
    const actual = gameSlice(initialState, setWinner(Player.Player1));
    expect(actual.winner).toEqual(Player.Player1);
  });

  test('should handle resetGameState', () => {
    const actual = gameSlice(initialState, resetGameState());
    expect(actual).toEqual(initialState);
  });
});
