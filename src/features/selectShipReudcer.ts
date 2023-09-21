import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Ship {
  name: string;
  size: number;
  isPlaced: boolean;
}

interface selectShipState {
  ships: Ship[];
  selectedShip: string | null;
}

export const selectShipInitialState: selectShipState = {
  ships: [
    { name: 'Destroyer', size: 1, isPlaced: false },
    { name: 'Submarine', size: 2, isPlaced: false },
    { name: 'Cruiser', size: 3, isPlaced: false },
    { name: 'Battleship', size: 4, isPlaced: false },
    { name: 'Carrier', size: 5, isPlaced: false },
  ],
  selectedShip: null,
};

const selectShipSlice = createSlice({
  name: 'game',
  initialState: selectShipInitialState, // Updated this line
  reducers: {
    selectShip: (state, action: PayloadAction<string>) => {
      state.selectedShip = action.payload;
    },
    placeShip: (state, action: PayloadAction<string>) => {
      const ship = state.ships.find((s) => s.name === action.payload);
      if (ship) {
        ship.isPlaced = true;
      }
      state.selectedShip = null; // Deselect the ship after placing
    },
  },
});

export const { selectShip, placeShip } = selectShipSlice.actions;

export default selectShipSlice.reducer;
