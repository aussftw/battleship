import { configureStore } from '@reduxjs/toolkit';

import selectShipReudcer from '../features/selectShipReudcer';

const store = configureStore({
  reducer: {
    selectShip: selectShipReudcer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
