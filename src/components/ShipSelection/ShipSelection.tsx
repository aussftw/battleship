import Cell from '../Cell/Cell';
import { CellStatus } from '../../types';

import { ShipName } from '../../types';
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
  return (
    <div className="flex flex-col items-center space-y-1 max-w-xs mx-auto">
      {ships.map(
        (ship) =>
          !ship.isPlaced && (
            <div
              key={ship.name}
              className={`ship flex items-center justify-start cursor-pointer ${
                selectedShipName === ship.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-white'
              } p-1`}
              onClick={() => onSelectShip(ship)}
            >
              <div className="flex space-x-1">
                {[...Array(ship.size)].map((_, idx) => (
                  <Cell
                    key={idx}
                    status={CellStatus.SHIP}
                    className="w-6 h-6"
                  />
                ))}
              </div>
              <span className="ml-2">
                {ship.name} ({ship.size} cells)
              </span>
            </div>
          ),
      )}
    </div>
  );
};

export default ShipSelection;
