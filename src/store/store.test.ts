import { setActivePlayer, setGameStatus } from '../features/gameReducer';
import { selectShip } from '../features/selectShipReudcer';
import { GameStatus, Player, ShipName } from '../types';
import store from './store';

describe('Store', () => {
  test('should handle game actions', () => {
    store.dispatch(setActivePlayer(Player.Player2));
    store.dispatch(setGameStatus(GameStatus.InPlay));
    const state = store.getState();
    expect(state.game.activePlayer).toEqual(Player.Player2);
    expect(state.game.gameStatus).toEqual(GameStatus.InPlay);
  });

  test('should handle selectShip actions', () => {
    store.dispatch(selectShip(ShipName.Destroyer));
    const state = store.getState();
    expect(state.selectShip.selectedShip).toEqual(ShipName.Destroyer);
  });
});
