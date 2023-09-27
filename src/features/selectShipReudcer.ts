import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ShipName } from '../types';

export type Ship = {
  name: ShipName | null;
  size: number;
  isPlaced: boolean;
};

type selectShipState = {
  ships: Ship[];
  selectedShip: ShipName | null;
};

export const selectShipInitialState: selectShipState = {
  ships: [
    { name: ShipName.Destroyer, size: 1, isPlaced: false },
    { name: ShipName.Submarine, size: 2, isPlaced: false },
    { name: ShipName.Cruiser, size: 3, isPlaced: false },
    { name: ShipName.Battleship, size: 4, isPlaced: false },
    { name: ShipName.Carrier, size: 5, isPlaced: false },
  ],
  selectedShip: null,
};

const selectShipSlice = createSlice({
  name: 'selectShip',
  initialState: selectShipInitialState,
  reducers: {
    selectShip: (state, action: PayloadAction<ShipName | null>) => {
      state.selectedShip = action.payload;
    },
    placeShip: (state, action: PayloadAction<string>) => {
      const ship = state.ships.find((s) => s.name === action.payload);
      if (ship) {
        ship.isPlaced = true;
      }
      state.selectedShip = null; // Deselect the ship after placing
    },
    resetShips: (state) => {
      state.ships.forEach((ship) => {
        ship.isPlaced = false;
      });
    },
    resetSelectShipState: () => {
      return selectShipInitialState;
    },
  },
});

export const { selectShip, placeShip, resetShips, resetSelectShipState } =
  selectShipSlice.actions;

export default selectShipSlice.reducer;
