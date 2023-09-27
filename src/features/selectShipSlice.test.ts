import selectShipSlice, {
  selectShipInitialState,
  selectShip,
  placeShip,
  resetShips,
  resetSelectShipState,
} from './selectShipReudcer'; // adjust the import as per your file structure
import { ShipName } from '../types'; // adjust the import as per your file structure

describe('selectShipSlice', () => {
  test('should handle initial state', () => {
    expect(selectShipSlice(undefined, { type: 'unknown' })).toEqual(
      selectShipInitialState,
    );
  });

  test('should handle selectShip', () => {
    const actual = selectShipSlice(
      selectShipInitialState,
      selectShip(ShipName.Destroyer),
    );
    expect(actual.selectedShip).toEqual(ShipName.Destroyer);
  });

  test('should handle placeShip', () => {
    const actual = selectShipSlice(
      selectShipInitialState,
      placeShip(ShipName.Destroyer),
    );
    expect(
      actual.ships.find((ship) => ship.name === ShipName.Destroyer)?.isPlaced,
    ).toEqual(true);
    expect(actual.selectedShip).toBeNull();
  });

  test('should handle resetShips', () => {
    const initialState = {
      ...selectShipInitialState,
      ships: selectShipInitialState.ships.map((ship) => ({
        ...ship,
        isPlaced: true,
      })),
    };
    const actual = selectShipSlice(initialState, resetShips());
    expect(actual.ships.every((ship) => ship.isPlaced === false)).toEqual(true);
  });

  test('should handle resetSelectShipState', () => {
    const initialState = {
      ...selectShipInitialState,
      selectedShip: ShipName.Destroyer,
      ships: selectShipInitialState.ships.map((ship) => ({
        ...ship,
        isPlaced: true,
      })),
    };
    const actual = selectShipSlice(initialState, resetSelectShipState());
    expect(actual).toEqual(selectShipInitialState);
  });
});
