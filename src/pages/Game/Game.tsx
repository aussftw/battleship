import { Board, ShipSelection } from '../../components';

import { useSelector, useDispatch } from 'react-redux';

import { selectShip } from '../../features/selectShipReudcer';
import { Ship } from '../../features/selectShipReudcer';

import { RootState } from '../../store/store';

export const Game = () => {
  const ships = useSelector((state: RootState) => state.selectShip.ships);
  const selectedShipName = useSelector(
    (state: RootState) => state.selectShip.selectedShip,
  );
  const dispatch = useDispatch();

  const handleSelectShip = (ship: Ship) => {
    dispatch(selectShip(ship.name));
  };
  return (
    <>
      <ShipSelection
        ships={ships}
        selectedShipName={selectedShipName}
        onSelectShip={handleSelectShip}
      />

      <Board />
    </>
  );
};
