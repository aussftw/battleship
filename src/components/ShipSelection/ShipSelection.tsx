import { useCallback, useMemo } from 'react';

import Cell from '../Cell/Cell';
import { CellStatus, ShipName } from '../../types';

export interface Ship {
  name: ShipName | null;
  size: number;
  isPlaced: boolean;
}

interface ShipSelectionProps {
  ships: Ship[];
  selectedShipName: ShipName | null;
  onSelectShip: (ship: Ship) => void;
}

const ShipSelection: React.FC<ShipSelectionProps> = ({
  ships,
  selectedShipName,
  onSelectShip,
}) => {
  const handleSelectShip = useCallback(
    (ship: Ship) => {
      onSelectShip(ship);
    },
    [onSelectShip],
  );

  const renderShip = (ship: Ship) => {
    const className = useMemo(() => {
      return `ship flex items-center justify-start cursor-pointer ${
        selectedShipName === ship.name ? 'bg-blue-500 text-white' : 'bg-white'
      } p-1`;
    }, [selectedShipName, ship.name]);

    return !ship.isPlaced ? (
      <div
        key={ship.name}
        className={className}
        onClick={() => handleSelectShip(ship)}
      >
        <div className="flex space-x-1">
          {[...Array(ship.size)].map((_, idx) => (
            <Cell key={idx} status={CellStatus.SHIP} className="w-6 h-6" />
          ))}
        </div>
        <span className="ml-2">
          {ship.name} ({ship.size} cells)
        </span>
      </div>
    ) : null;
  };

  return (
    <div className="flex flex-col items-center space-y-1 max-w-xs mx-auto mt-12">
      {ships.map((ship) => renderShip(ship))}
    </div>
  );
};

export default ShipSelection;
