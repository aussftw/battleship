import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Cell } from '../';
import {
  initializeBoard,
  placeShip as placeShipHelper,
  shipsData,
} from '../../helpers';

import { Board as BoardType, Ship as ShipType } from '../../types';
import { RootState } from '../../store/store';
import { placeShip } from '../../features/selectShipReudcer';

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const [hoveredCells, setHoveredCells] = useState<Set<string>>(new Set());
  const [board, setBoard] = useState<BoardType>(initializeBoard());
  const [invalidHoveredCells, setInvalidHoveredCells] = useState<Set<string>>(
    new Set(),
  );
  const selectedShipName = useSelector(
    (state: RootState) => state.selectShip.selectedShip,
  );

  const [currentShip, setCurrentShip] = useState<ShipType | null>({
    x: 0,
    y: 0,
    length: 3,
    direction: 'HORIZONTAL',
  });

  const handleCellClick = (x: number, y: number) => {
    if (currentShip && selectedShipName) {
      // Ensure we have a current ship and its name is available
      const newBoard = placeShipHelper(board, x, y, currentShip);
      if (newBoard !== board) {
        // I'm assuming the `placeShipHelper` will return a new board state only if the ship was successfully placed. Adjust this check accordingly.
        setBoard(newBoard);
        handlePlaceShip(selectedShipName); // Update the ship's `isPlaced` status in the Redux store
      }
    }
  };

  useEffect(() => {
    if (selectedShipName) {
      const size = shipsData[selectedShipName].size;
      setCurrentShip({
        x: 0,
        y: 0,
        length: size,
        direction: 'HORIZONTAL',
      });
    } else {
      setCurrentShip(null);
    }
  }, [selectedShipName]);

  const handleRightClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();

    if (currentShip) {
      setCurrentShip((prevShip) => ({
        ...prevShip,
        direction:
          prevShip.direction === 'HORIZONTAL' ? 'VERTICAL' : 'HORIZONTAL',
      }));
    }

    handleMouseOver(x, y);
  };

  const handleMouseOver = (x: number, y: number) => {
    if (!currentShip) return; // Early exit if currentShip is null
    const shipCells = computePotentialShipCells(x, y);
    const isInvalidPlacement =
      shipCells.some((cell) => board[cell.x][cell.y] === 'SHIP') ||
      shipCells.length !== currentShip.length;

    if (!isInvalidPlacement) {
      setHoveredCells(new Set(shipCells.map((cell) => `${cell.x},${cell.y}`)));
      setInvalidHoveredCells(new Set()); // Clear invalid hovered cells
    } else {
      setInvalidHoveredCells(
        new Set(shipCells.map((cell) => `${cell.x},${cell.y}`)),
      );
      setHoveredCells(new Set()); // Clear the normal hover
    }
  };

  const handleMouseOut = () => {
    setHoveredCells(new Set());
  };

  const computePotentialShipCells = (
    x: number,
    y: number,
  ): { x: number; y: number }[] => {
    const shipCells: { x: number; y: number }[] = [];

    if (!currentShip) {
      return shipCells; // If currentShip is null, return an empty array.
    }

    const { length, direction } = currentShip;

    if (direction === 'HORIZONTAL') {
      for (let i = 0; i < length; i++) {
        if (
          y + i < board[x].length &&
          (board[x][y + i] === 'EMPTY' || board[x][y + i] === 'SHIP')
        ) {
          shipCells.push({ x, y: y + i });
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (
          x + i < board.length &&
          (board[x + i][y] === 'EMPTY' || board[x + i][y] === 'SHIP')
        ) {
          shipCells.push({ x: x + i, y });
        }
      }
    }

    return shipCells;
  };

  const handlePlaceShip = () => {
    dispatch(placeShip(selectedShipName!));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100  rounded shadow-lg">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, cellIndex) => (
              <Cell
                key={cellIndex}
                status={cell}
                isHovered={hoveredCells.has(`${rowIndex},${cellIndex}`)}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
                onContextMenu={(e) => handleRightClick(e, rowIndex, cellIndex)} // pass the coordinates into the right-click handler
                onMouseOver={() => handleMouseOver(rowIndex, cellIndex)}
                isInvalidHover={invalidHoveredCells.has(
                  `${rowIndex},${cellIndex}`,
                )}
                onMouseOut={handleMouseOut}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
