import { configureStore } from '@reduxjs/toolkit';

import selectShipReudcer from '../features/selectShipReudcer';
import gameReducer from '../features/gameReducer';

const store = configureStore({
  reducer: {
    selectShip: selectShipReudcer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
